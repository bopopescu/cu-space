from datetime import date
from datetime import datetime
from random import randrange
import hashlib, uuid
import os
from flask import Flask, render_template, request, redirect, url_for, flash
import math
import shutil
#NOTE!!
#install flask-mysql first by writing in terminal "pip install flask-mysql" in order to use
from flaskext.mysql import MySQL
from werkzeug.utils import secure_filename

path = os.path.dirname(__file__)
relpath = os.path.relpath(path)
# uploadPictureFolder = "C:/Users/natta/Desktop/Senior Project/static/img"
uploadPictureFolder = os.path.join(relpath,"static/img/user")
PictureFolder = os.path.join(relpath,"static/img")
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app = Flask(__name__)
app.config['uploadPictureFolder'] = uploadPictureFolder
app.config['PictureFolder'] = PictureFolder
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'cuspace'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

@app.route('/' , defaults={'fail_id': None})
@app.route('/fail/<fail_id>')
def index(fail_id):
    conn = mysql.connect()
    cursor = conn.cursor()
    sql = """SELECT * FROM `dis_category`"""
    cursor.execute(sql)
    data = cursor.fetchall()
    categoryList = [ i[1] for i in data]
    if not fail_id:
        return render_template('index4.html', catlist = categoryList)
    else:
        return render_template('index4.html', catlist = categoryList, fail = 1)

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('login_username')
    password = request.form.get('login_password').encode('utf-8')
    user_key = hashlib.md5()
    user_key.update(password)
    user_key = user_key.hexdigest()
    conn = mysql.connect()
    cursor = conn.cursor()
    category = getCat()
    categoryList = [cat[1] for cat in category ]
    checkSQL =  """SELECT * FROM `user` WHERE `Username` = %s and `User_key`= %s"""
    try:
        cursor.execute(checkSQL, (username, user_key))
        dataexist = cursor.fetchone()
        if not dataexist:
            print("hello")
            return redirect(url_for('index', fail_id = 1))
        else:
            return render_template('index4.html', user = dataexist, catlist = categoryList )
    except:
        print("Cannot query user")
    return render_template('index4.html', catlist = categoryList)

@app.route('/sign_in', methods=['POST'])
def sign_in():
    password = request.form.get('regis_pass').encode('utf-8')
    username = request.form.get('regis_username')
    user_key = hashlib.md5()
    user_key.update(password)
    user_key = user_key.hexdigest()
    user_id = uuid.uuid4().hex
    first_name = request.form.get('regis_first_name')
    last_name = request.form.get('regis_last_name')
    birthday = request.form.get('birthday')
    birthday_date = datetime.strptime(birthday,"%d-%m-%Y")
    birthday_date = birthday_date.strftime('%Y-%m-%d')
    email = request.form.get('regis_email')
    role = 0 #0 for user, 1 for tutor
    ban_status = 0 #0 for not ban, 1 for ban
    conn = mysql.connect()
    cursor = conn.cursor()
    create_userSQL = """INSERT INTO `user`(`User_id`, `Email`, `Username`, `User_key`, `Firstname`, `Lastname`, `Role`, `Ban_status`, `DateOfBirth`) 
                        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
    try:
        cursor.execute(create_userSQL,(user_id, email, username, user_key, first_name, last_name, role, ban_status, birthday_date))
        os.makedirs(os.path.join(app.config['uploadPictureFolder'], user_id))
        filelist = os.listdir(app.config['PictureFolder'])
        for files in filelist:
            if files.startswith('dummy'):
                shutil.copy2(os.path.join(os.path.dirname(__file__),'static/img',files), os.path.join(os.path.dirname(__file__),'static/img/user',user_id))
        profilePictureSQL = """INSERT INTO `profile_picture`(Picture`, `User_id`) VALUES (%s,%s)"""
        picture = "dummy.jpeg"
        try:
            cursor.execute(profilePictureSQL,(picture, user_id))
            conn.commit()
        except:
            print("Cannot insert profile picture")
    except:
        print("Cannot create user")
    return redirect(url_for('index'))

@app.route('/user/<user_id>')
def userprofile(user_id):
    conn = mysql.connect()
    cursor = conn.cursor()
    userSQL = """ SELECT * FROM `user` WHERE User_id = %s"""
    try:
        cursor.execute(userSQL,user_id)
        userdata = cursor.fetchone()
        profilepicSQL = """SELECT * FROM profile_picture WHERE User_id = %s"""
        try:
            cursor.execute(profilepicSQL, user_id)
            picturedata = cursor.fetchone()
        except:
            print("Cannot query picture data")
    except:
        print("Cannot query user data")
    return render_template('userprofile.html', user = userdata, picture = picturedata)

@app.route('/user/<user_id>/edit_user', methods=['POST'])
def edit_user(user_id):
    username = request.form.get('userUsername')
    password = request.form.get('userpasswordvalue').encode('utf-8')
    user_key = hashlib.md5()
    user_key.update(password)
    user_key = user_key.hexdigest()
    firstname = request.form.get('firstname')
    lastname = request.form.get('lastname')
    dateofbirth = request.form.get('edituserdateofbirth')
    birthday_date = datetime.strptime(dateofbirth, "%d-%m-%Y")
    birthday_date = birthday_date.strftime('%Y-%m-%d')
    email = request.form.get('useremail')
    conn = mysql.connect()
    cursor = conn.cursor()
    edituserSQL = """UPDATE `user` SET `Email`=%s,`Username`=%s,`User_key`=%s,`Firstname`= %s,`Lastname`=%s,`DateOfBirth`=%s WHERE `user_id` = %s"""
    try:
        cursor.execute(edituserSQL, (email,username,user_key, firstname, lastname, birthday_date, user_id))
        conn.commit()
    except:
        print("Cannot update user")
    return redirect(url_for('userprofile', user_id = user_id))

@app.route('/user/<user_id>/edit_profile_picture_user', methods=['POST','GET'])
def edit_user_profile_picture(user_id):
    if request.method == 'POST':
        if 'input-image' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['input-image']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            if not os.path.exists(os.path.join(app.config['uploadPictureFolder'], user_id)):
                os.makedirs(os.path.join(app.config['uploadPictureFolder'], user_id))
            file.save(os.path.join(app.config['uploadPictureFolder'], user_id, filename))
            conn = mysql.connect()
            cursor = conn.cursor()
            updatepictureSQL = """UPDATE `profile_picture` SET `Picture`= %s WHERE `User_id` = %s"""
            try:
                cursor.execute(updatepictureSQL, (filename, user_id))
                conn.commit()
            except:
                print("Cannot update picture to database")
            return redirect(url_for('userprofile', user_id=user_id))
@app.route('/tutor/' , defaults={'page':1})
@app.route('/tutor/page/<page>')
def tutor(page):
    numDataStart = ((int(page) - 1) * 18)
    #numDataEnd = int(page) * 18
    conn = mysql.connect()
    cursor = conn.cursor()
    subjectList = getSub()
    numOfDataSQL = """SELECT COUNT(*)
                              FROM `tutor`"""
    try:
        cursor.execute(numOfDataSQL)
        numOfData = cursor.fetchone()
        print(numOfData)
    except:
        print("Cannot get number of data in tutor")

    sql = """SELECT t.user_id, t.information, prof.picture, sub_grp.subject_id,sub_grp.price, GROUP_CONCAT(sub.subject_name)
             as tutor_subjects_name, user.Firstname, user.Lastname, user.Ban_status, sub_grp.subject_description
             FROM `tutor` t
             INNER JOIN `profile_picture` prof ON t.User_id = prof.user_id
             INNER JOIN `subject_group` sub_grp ON t.user_id = sub_grp.user_id
             INNER JOIN `subject` sub ON sub.subject_id = sub_grp.subject_id
             INNER JOIN `user` ON user.User_id = t.user_id GROUP BY sub_grp.user_id LIMIT %s OFFSET %s"""
    try:
        cursor.execute(sql, (18, numDataStart))
        numPage = int(math.ceil(float(numOfData[0]) / float(18)))
        tutorData = cursor.fetchall()
        print(tutorData)
    except:
        print("Cannot query tutor data")
    return render_template('tutor2.html', tutorList = tutorData, numofPage = numPage, subList = subjectList)


@app.route('/tutor/<tutor_id>')
def profile(tutor_id):
    conn = mysql.connect()
    cursor = conn.cursor()
    subject = getSub()
    try:
        tutorSQL = """SELECT t.user_id, t.information, prof.picture, user.Firstname, user.Lastname, user.Ban_status,
                      t.video, t.line, t.facebook, t.phone, user.dateofbirth, user.Email
                      FROM `tutor` t
                      INNER JOIN `profile_picture` prof ON t.User_id = prof.user_id
                      INNER JOIN `user` ON user.User_id = t.user_id
                      WHERE t.user_id = %s """
        cursor.execute(tutorSQL, tutor_id)
        tutor_info = cursor.fetchone()
        try:
            subjectSQL = """SELECT sub.Subject_name, grp.price, grp.subject_description, grp.Subject_group_id
                              FROM `subject_group` grp
                              INNER JOIN subject sub ON sub.Subject_id = grp.Subject_id
                              WHERE grp.User_id = %s """
            cursor.execute(subjectSQL, tutor_id)
            subject_info = cursor.fetchall()
            print(tutor_info)
            age = calculate_age(datetime.combine(tutor_info[10], datetime.min.time()))
            print(age)
            print(subject_info)
            return render_template('profile3.html', subInfo = subject_info, tutor = tutor_info, birthday = age, sub = subject, birthdate = tutor_info[10])
        except:
            print("Cannot retrieve subject info")
            return render_template('error.html')
    except:
        print("Cannot retrieve tutor info")
        return render_template('error.html')

@app.route('/tutor/<tutor_id>/update_subject/<subject_group_id>' ,methods=["POST"])
def update_subject(tutor_id, subject_group_id):
    conn = mysql.connect()
    cursor = conn.cursor()
    update_info = request.form.getlist(subject_group_id)
    print(update_info)
    updateSQL =  """UPDATE `subject_group` SET `Subject_id`=%s,
                    `Price`=%s, `Subject_description`=%s 
                    WHERE `Subject_group_id`= %s"""
    try:
        cursor.execute(updateSQL, (update_info[1], update_info[2],update_info[0],subject_group_id))
        conn.commit()
    except:
        print("Cannot update subject_group table")
    return redirect(url_for('profile', tutor_id=tutor_id))

@app.route('/tutor/<tutor_id>/add_new_subject' ,methods=["POST"])
def add_subject(tutor_id):
    coursename = request.form.get('newcoursename')
    coursesubject = request.form.get('addsubjectcategory')
    price = request.form.get('addprice')
    conn = mysql.connect()
    cursor = conn.cursor()
    addSQL =  """INSERT INTO `subject_group`(`User_id`, `Subject_id`, `Price`, `Subject_description`) 
                 VALUES (%s,%s,%s,%s)"""
    try:
        cursor.execute(addSQL,(tutor_id, coursesubject, price, coursename))
        conn.commit()
    except:
        print("Cannot insert new course into database")
    return redirect(url_for('profile',tutor_id=tutor_id))

@app.route('/tutor/<tutor_id>/edit_tutor_profile' ,methods=["POST"])
def edit_tutor_profile(tutor_id):
    firstname = request.form.get("firstname")
    lastname = request.form.get("lastname")
    birthday = request.form.get("dateofbirth")
    email = request.form.get("email")
    line = request.form.get("line")
    facebook = request.form.get("facebook")
    phone = request.form.get("phone")
    info = request.form.get("info")
    video_link = request.form.get("video_link")
    conn= mysql.connect()
    cursor = conn.cursor()
    birthday = datetime.strptime(birthday,'%d-%m-%Y')
    birthday = birthday.strftime('%Y-%m-%d')
    print(birthday)
    edit_tutorSQL = """UPDATE `tutor` 
                       SET `information`= %s,`Video`= %s,`Facebook`= %s,`Line`= %s,`Phone`= %s
                       WHERE `User_id` = %s"""
    edit_userSQL = """UPDATE `user` 
                      SET `Email`=%s,`Firstname`=%s,`Lastname`=%s , `DateOfBirth`=%s
                      WHERE `User_id` = %s"""
    try:
        cursor.execute(edit_tutorSQL, (info, video_link, facebook, line,phone, tutor_id))
        try:
            cursor.execute(edit_userSQL, (email, firstname, lastname,birthday, tutor_id))
            conn.commit()
        except:
            print("Cannot update user table")
    except:
        print("Cannot update tutor table")
    return redirect(url_for("profile", tutor_id = tutor_id))

@app.route('/tutor/<tutor_id>/edit_tutor_picture' , methods=['GET', 'POST'])
def edit_tutor_picture(tutor_id):
    print("success")
    if request.method == 'POST':
        if 'input-image' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['input-image']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            if not os.path.exists(os.path.join(app.config['uploadPictureFolder'],tutor_id)):
                os.makedirs(os.path.join(app.config['uploadPictureFolder'],tutor_id))
            file.save(os.path.join(app.config['uploadPictureFolder'],tutor_id, filename))
            conn = mysql.connect()
            cursor = conn.cursor()
            pictureSQL = """UPDATE `profile_picture` SET `Picture`= %s WHERE `User_id` = %s"""
            try:
                cursor.execute(pictureSQL, (filename, tutor_id))
                conn.commit()
            except:
                print("Cannot insert picture to database")
            return redirect(url_for('profile', tutor_id = tutor_id))


@app.route('/tutor/<tutor_id>/delete_subject/<subject_group_id>')
def delete_subject_course(tutor_id, subject_group_id):
    conn = mysql.connect()
    cursor = conn.cursor()
    deleteSQL = """DELETE FROM `subject_group` WHERE `subject_group_id` = %s"""
    try:
        cursor.execute(deleteSQL, subject_group_id)
        conn.commit()
    except:
        print("Cannot delete subject_group_id "+subject_group_id)
    return redirect(url_for('profile', tutor_id=tutor_id))

@app.route('/newtutor')
def registernewtutor():
    return render_template('newtutor.html', sub = getSub())

@app.route('/newjob')
def registernewjob():
    return render_template('newjob.html', sub = getSub())

@app.route('/newtutor/create_new_tutor', methods = ['POST'])
def create_tutor():
    #trong me input pen user id duay
    user_id = str(randrange(1,10000000))
    numberOfCourse = int(request.form["hiddenvalue"])
    link = request.form["link"]
    facebook = request.form["facebook"]
    bio = request.form['info']
    phone = request.form["phone"]
    line = request.form["line"]
    subject = request.form.getlist('coursecat')
    course = request.form.getlist('course')
    price = request.form.getlist("courseprice")
    conn = mysql.connect()
    cursor = conn.cursor()
    subjectList = getSub()
    for i in range(numberOfCourse):
        subjectName = subjectList[int(subject[i])-1][1]
        print(subjectName)
        tutorSQL = """INSERT INTO `tutor`(`User_id`, `Bio`, `Skill`, `Achievement`, `Experience`,
                      `Subject`, `Video`, `Facebook`, `Line`, `Phone`)
                      VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
        # try:
        #     cursor.execute(tutorSQL, (user_id, bio, skill, acheivement, experience, subjectName, link, facebook, line, phone))
        #     subjectSQL = """INSERT INTO `subject_group`(`User_id`, `Subject_id`, `Price`, `Subject_description`)
        #                     VALUES (%s,%s,%s,%s)"""
        #     try:
        #         cursor.execute(subjectSQL, (user_id,subject[i], price[i], subjectName))
        #     except:
        #         print("Cannot insert subject")
        # except:
        #     print("Cannot insert tutor")
    return redirect(url_for("registernewtutor"))

@app.route('/job')
def job():
    return render_template('job.html')

@app.route('/job-profile')
def jobProfile():
    return render_template('job-profile.html')

@app.route('/company')
def company():
    return render_template('company.html')

@app.route('/newpost')
def newpost():
    category = getCat()
    return render_template('newpost.html' , cat = category)

@app.route('/post')
def post():
    return render_template('post.html')

@app.route('/newpost/create_new_discussion', methods=['POST'])
def createnewpost():
    topic = request.form['topic_name']
    categoryList = request.form.getlist('category_name')
    discussion = request.form['content']
    user_id = "123456" #change later
    conn = mysql.connect()
    cursor = conn.cursor()
    try:
        sqlPostDis = """INSERT INTO `discussion`(`User_id`, `Topic`, `Content`)
                        VALUES (%s,%s,%s)"""
        cursor.execute(sqlPostDis, (user_id, topic, discussion))
        print(cursor.lastrowid)
        dis_id = cursor.lastrowid
        try:
            for category in categoryList:
                sqlPostDis_Cat_Grp = """INSERT INTO `dis_category_group`(`Dis_id`, `Dis_cat_id`)
                                        VALUES (%s,%s)"""
                cursor.execute(sqlPostDis_Cat_Grp, (dis_id, category))
                conn.commit()
            cursor.close()
            conn.close()
        except:
            print("Cannot Insert into dis_category_group")
    except:
        print("Cannot Insert value into discussion")
    return redirect(url_for("newpost"))

@app.route('/discussion/<category>/', defaults={'page':1})
@app.route('/discussion/<category>/<page>')
def discussion(category, page):
    numDataStart = ((int(page)-1)*15)
    numDataEnd = int(page)*15
    conn = mysql.connect()
    categoryList = getCat()
    categoryName = [i[1] for i in categoryList]
    if(category in categoryName):
        cursor = conn.cursor()
        # sqlListed = """SELECT catgrp.dis_cat_group_id
        #         ,catgrp.dis_id
        #         ,catgrp.dis_cat_id
        #         ,cat.Dis_cat_name
        #         ,dis.User_id
        #         ,dis.Topic
        #         ,dis.Content
        #         ,dis.Create_Time
        #         FROM `dis_category_group` catgrp
        #         INNER JOIN `dis_category` cat ON catgrp.dis_cat_id = cat.Dis_cat_id
        #         INNER JOIN `discussion` dis ON dis.Dis_id = catgrp.dis_id
        #         WHERE cat.Dis_cat_name = %s"""
        numOfDataSQL = """SELECT COUNT(*)
                       FROM `dis_category_group` dis
                       INNER JOIN dis_category cat ON dis.dis_cat_id = cat.Dis_cat_id
                       WHERE cat.Dis_cat_name =  %s"""
        try:
            cursor.execute(numOfDataSQL,category)
            numOfData = cursor.fetchone()
            print(numOfData)
        except:
            print("Cannot query the data in Category: " + category)

        sqlWanted = """SELECT catgrp.dis_cat_group_id
                ,catgrp.dis_id
                ,catgrp.dis_cat_id
                ,cat.Dis_cat_name
                ,dis.User_id
                ,dis.Topic
                ,dis.Content
                ,dis.Create_Time
                FROM `dis_category_group` catgrp
                INNER JOIN `dis_category` cat ON catgrp.dis_cat_id = cat.Dis_cat_id
                INNER JOIN `discussion` dis ON dis.Dis_id = catgrp.dis_id
                WHERE cat.Dis_cat_name = %s ORDER BY dis.create_time DESC LIMIT %s,%s """
        try:
            cursor.execute(sqlWanted, (category,numDataStart,numDataEnd))
            dataWanted = cursor.fetchall()
            numPage = int(math.ceil(float(numOfData[0])/float(15)))
            print(numPage)
        except:
            print("Cannot query the data in Category: "+category)
        cursor.close()
        conn.close()
        return render_template('discussion.html',cat = category, discussion = dataWanted, numofPage = numPage)


def getCat():
    conn = mysql.connect()
    cursor = conn.cursor()
    sqlCat = """SELECT * FROM `dis_category`"""
    try:
        cursor.execute(sqlCat)
        categoryList = cursor.fetchall()
        return categoryList
    except:
        print("Cannot query category name")
    conn.close()

def getSub():
    conn = mysql.connect()
    cursor = conn.cursor()
    sqlSub = """SELECT * FROM `subject`"""
    try:
        cursor.execute(sqlSub)
        subjectList = cursor.fetchall()
        return subjectList
    except:
        print("Cannot query subject name")
    conn.close()

def calculate_age(born):
    today = date.today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

if __name__ == '__main__':
    app.run()
