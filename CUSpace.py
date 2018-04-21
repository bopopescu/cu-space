from datetime import date,datetime
from random import randrange
import hashlib, uuid
import os
from flask import Flask, render_template, request, redirect, url_for, flash, session, g
import math
import shutil
import re
#NOTE!!
#install flask-mysql first by writing in terminal "pip install flask-mysql" in order to use
from flaskext.mysql import MySQL
from werkzeug.utils import secure_filename

path = os.path.dirname(__file__)
relpath = os.path.relpath(path)
# uploadPictureFolder = "C:/Users/natta/Desktop/Senior Project/static/img"
uploadPictureFolder = os.path.join(relpath,"static/img/user")
PictureFolder = os.path.join(relpath,"static/img")
jobFolder = os.path.join(relpath,"static/job")
resumeFolder = os.path.join(relpath,"static/resume")
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.secret_key = os.urandom(24)
app.config['uploadPictureFolder'] = uploadPictureFolder
app.config['PictureFolder'] = PictureFolder
app.config['JobFolder'] = jobFolder
app.config['ResumeFolder'] = resumeFolder
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'cuspace'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

TAG_RE = re.compile(r'<[^>]+>')
@app.route('/' , defaults={'fail_id': None})
@app.route('/fail/<fail_id>')
def index(fail_id):
    categoryList = getCat()
    facultyList = [faculty for faculty in categoryList if faculty[4] == 1]
    otherList = [faculty for faculty in categoryList if faculty[4] == 0]
    print(facultyList)
    print(otherList)
    if not fail_id:
        if g.user:
            return render_template('index4.html', faclist=facultyList, othList=otherList, login = g.user, user_id = g.user_id)
        else:
            return render_template('index4.html', faclist=facultyList, othList=otherList)
    else:
        return render_template('index4.html', faclist=facultyList, othList=otherList, fail = 1)

@app.before_request
def before_request():
    g.user = None
    g.user_id = None
    if 'user' in session:
        g.user = session['user']
        g.user_id = session['user_id']

@app.route('/logout')
def logout():
    session.pop('user', None)
    session.pop('user_id', None)
    return redirect(redirect_url())

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
    checkSQL =  """SELECT Firstname,Lastname, User_id FROM `user` WHERE `Username` = %s and `User_key`= %s"""
    try:
        cursor.execute(checkSQL, (username, user_key))
        dataexist = cursor.fetchone()
        if not dataexist:
            print("hello")
            return redirect(url_for('index', fail_id = 1))
        else:
            session['user'] = dataexist[0] + ' ' + dataexist[1]
            session['user_id'] = dataexist[2]
            return redirect(redirect_url())
    except:
        print("Cannot query user")
    return render_template('index4.html', catlist = categoryList)

@app.route('/sign_up', methods=['POST'])
def sign_up():
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
    create_userSQL = """INSERT INTO `user`(`User_id`, `Email`, `Username`, `User_key`, `Firstname`, `Lastname`, `Role`,
                        `Ban_status`, `DateOfBirth`) 
                        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
    try:
        cursor.execute(create_userSQL,(user_id, email, username, user_key, first_name, last_name, role, ban_status, birthday_date))
        os.makedirs(os.path.join(app.config['uploadPictureFolder'], user_id))
        filelist = os.listdir(app.config['PictureFolder'])
        for files in filelist:
            if files.startswith('dummy'):
                shutil.copy2(os.path.join(os.path.dirname(__file__),'static/img',files),
                             os.path.join(os.path.dirname(__file__),'static/img/user',user_id))
        profilePictureSQL = """INSERT INTO `profile_picture`(`Picture`, `User_id`) VALUES (%s,%s)"""
        picture = "dummy.jpeg"
        try:
            cursor.execute(profilePictureSQL,(picture, user_id))
            conn.commit()
            name = first_name+' '+last_name
            session['user'] = name
            session['user_id'] = user_id
            return redirect(redirect_url())
        except:
            print("Cannot insert profile picture")
    except:
        print("Cannot create user")
    return redirect(url_for('index'), fail_id=2)

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
    if g.user:
        return render_template('userprofile.html', user=userdata, picture=picturedata, login = g.user, user_id = g.user_id)
    else:
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
        session['user'] = firstname + ' ' + lastname
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
@app.route('/tutor/' , defaults={'page':1, 'subject' : None, 'keyword': None})
@app.route('/tutor/subject/<subject>', defaults={'page':1, 'keyword' :None})
@app.route('/tutor/subject/<subject>/page/<page>', defaults = {'keyword': None})
@app.route('/tutor/search-keyword/<keyword>', defaults={'page':1, 'subject' : None})
@app.route('/tutor/search-keyword/<keyword>/page/<page>', defaults={'subject':None})
@app.route('/tutor/page/<page>', defaults={'subject':None, 'keyword' :None})
def tutor(page, subject,keyword):
    numDataStart = ((int(page) - 1) * 18)
    #numDataEnd = int(page) * 18
    conn = mysql.connect()
    cursor = conn.cursor()
    subjectList = getSub()
    if not subject and not keyword:
        sql = """SELECT t.user_id, t.information, prof.picture, sub_grp.subject_id,sub_grp.price, GROUP_CONCAT(sub.subject_name)
                 as tutor_subjects_name, user.Firstname, user.Lastname, user.Ban_status, GROUP_CONCAT(sub_grp.subject_description) as subject_description, t.tutor_create_time
                 FROM `tutor` t
                 INNER JOIN `profile_picture` prof ON t.User_id = prof.user_id
                 INNER JOIN `subject_group` sub_grp ON t.user_id = sub_grp.user_id
                 INNER JOIN `subject` sub ON sub.subject_id = sub_grp.subject_id
                 INNER JOIN `user` ON user.User_id = t.user_id 
                 GROUP BY sub_grp.user_id  
                 ORDER BY t.tutor_create_time DESC"""
    elif subject:
        sql = """SELECT t.user_id, t.information, prof.picture, sub_grp.subject_id,sub_grp.price, GROUP_CONCAT(sub.subject_name)
                         as tutor_subjects_name, user.Firstname, user.Lastname, user.Ban_status, GROUP_CONCAT(sub_grp.subject_description) as subject_description, t.tutor_create_time
                         FROM `tutor` t
                         INNER JOIN `profile_picture` prof ON t.User_id = prof.user_id
                         INNER JOIN `subject_group` sub_grp ON t.user_id = sub_grp.user_id
                         INNER JOIN `subject` sub ON sub.subject_id = sub_grp.subject_id
                         INNER JOIN `user` ON user.User_id = t.user_id
                         WHERE sub.Subject_id = %s
                         GROUP BY sub_grp.user_id  
                         ORDER BY t.tutor_create_time DESC"""
    elif keyword:
        sql = """SELECT DISTINCT t.user_id, t.information, prof.picture, sub_grp.subject_id,sub_grp.price, GROUP_CONCAT(sub.subject_name)
                 as tutor_subjects_name, user.Firstname, user.Lastname, user.Ban_status, GROUP_CONCAT(sub_grp.subject_description) as subject_description, t.tutor_create_time	
                 FROM `tutor` t
                 INNER JOIN `profile_picture` prof ON t.User_id = prof.user_id
                 INNER JOIN `subject_group` sub_grp ON t.user_id = sub_grp.user_id
                 INNER JOIN `subject` sub ON sub.subject_id = sub_grp.subject_id
                 INNER JOIN `user` ON user.User_id = t.user_id 
                 WHERE firstname LIKE %s OR lastname LIKE %s OR subject_description LIKE %s
                 GROUP BY sub_grp.user_id  
                 ORDER BY t.tutor_create_time DESC"""
    try:
        subjectname = None
        if not subject and not keyword:
            cursor.execute(sql)
        elif subject:
            cursor.execute(sql, subject)
            subjectname = [sub[1] for sub in subjectList if sub[0] == int(subject)][0]
        elif keyword:
            word = "%" + keyword + "%"
            cursor.execute(sql, (word,word,word))
        tutorData = cursor.fetchall()
        numOfData = tutorData.__len__()
        tutorData = tutorData[numDataStart: numDataStart+18]
        numPage = int(math.ceil(float(numOfData) / float(18)))
        if tutorData:
            if g.user:
                isuserAtutor = [tutor for tutor in tutorData if tutor[0] == g.user_id]
                if isuserAtutor:
                    isuserAtutor = isuserAtutor[0]
            else:
                isuserAtutor = None
        else:
            isuserAtutor = None
        print(tutorData)
    except:
        print("Cannot query tutor data")
    if g.user:
        return render_template('tutor2.html', tutorList=tutorData, numofPage=numPage, subList=subjectList,
                               page=int(page), login=g.user, user_id=g.user_id, istutor = isuserAtutor, subject = subject
                               , keyword = keyword, subjectname = subjectname)
    else:
        return render_template('tutor2.html', tutorList = tutorData, numofPage = numPage, subList = subjectList,
                              page = int(page), istutor = isuserAtutor,  subject = subject, keyword = keyword , subjectname = subjectname)

@app.route('/tutor/search-tutor-by-subject/' , methods= ['POST'])
def searchtutorbySub():
    tutor_sub = request.form.get('selecttutor')
    if tutor_sub:
        return redirect(url_for('tutor', page = 1, subject = tutor_sub))
    else:
        return redirect(url_for('tutor', page=1, subject=None))

@app.route('/tutor/search-tutor-by-keyword/' , methods= ['POST'])
def searchtutorbytutorname():
    keyword = request.form.get('searchkeyword')
    if keyword:
        return redirect(url_for('tutor', page = 1, keyword = keyword))
    else:
        return redirect(url_for('tutor', page=1, keyword=None))

@app.route('/tutor/tutor-profile/<tutor_id>')
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
            if g.user:
                return render_template('profile3.html', subInfo = subject_info, tutor = tutor_info, birthday = age, sub = subject, birthdate = tutor_info[10],
                                       login = g.user, user_id = g.user_id)
            else:
                return render_template('profile3.html', subInfo=subject_info, tutor=tutor_info, birthday=age,
                                       sub=subject, birthdate=tutor_info[10])
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
            session['user'] = firstname + ' ' + lastname
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
    if g.user:
        return render_template('newtutor.html', sub=getSub(), login = g.user, user_id = g.user_id)
    else:
        return redirect(url_for('tutor',page = 1))

@app.route('/apply/<jobID>', methods = ['POST'])
def applyjob(jobID):
    conn = mysql.connect()
    cursor = conn.cursor()
    file = request.files['input-image']
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(g.user_id+str(datetime.now())+file.filename)
        if not os.path.exists(os.path.join(app.config['ResumeFolder'], str(jobID[0]))):
            os.makedirs(os.path.join(app.config['ResumeFolder'], str(jobID[0])))
        file.save(os.path.join(app.config['ResumeFolder'], str(jobID[0]), filename))
        cursor = conn.cursor()
        sql = """INSERT INTO `job_applicant` (`Job_id`, `User_id`, `Resume`) VALUES (%s,%s,%s)"""
    try:
        cursor.execute(sql, (jobID, g.user_id, filename))
        conn.commit()
    except:
        print("Cannot insert resume")
    return redirect(url_for("jobProfile", jobID=jobID))

@app.route('/cancelapplication/<jobID>')
def cancelapplication(jobID):
    conn = mysql.connect()
    cursor = conn.cursor()
    sql = """UPDATE `job_applicant` SET Status = 0 WHERE User_id = %s AND Job_id = %s"""
    try:
        cursor.execute(sql, (g.user_id, jobID))
        conn.commit()
    except:
        print("Cannot cancel application")
    return redirect(url_for("jobProfile", jobID=jobID))


@app.route('/newjob')
def registernewjob():
    conn = mysql.connect()
    cursor = conn.cursor()
    sql = """SELECT * FROM `job_category`"""
    try:
        cursor.execute(sql)
        cat = cursor.fetchall()
    except:
        print("Cannot get job category")
    if g.user:
        return render_template('newjob.html', jobCat = cat, login = g.user, user_id = g.user_id)
    else:
        return render_template('newjob.html', jobCat = cat)

@app.route('/newjob/create_new_job', methods = ['POST'])
def createnewjob():
    if g.user:
        job_name = request.form["jobname"]
        job_info = request.form["jobinfo"]
        start = datetime.today().strftime('%Y-%m-%d')
        end_date = request.form.get("applicationenddate")
        end = datetime.strptime(end_date, "%d-%m-%Y")
        end = end.strftime('%Y-%m-%d')
        company = request.form["companyname"]
        email = request.form["email"]
        phone = request.form["phonenumber"]
        catID = request.form.get("jobcategory")
        file = request.files['input-image']
        print(catID)
        user_id = g.user_id
        job_sql = """INSERT INTO `job` (`Job_name`, `Job_info`, `Start_date`, `End_date`, `Company`, `Email`, `Phone`, `User_id`, `Job_cat_id`)
                                  VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s);"""
        getJob = """SELECT Job_id FROM job WHERE User_id = %s ORDER BY Create_time DESC"""
        conn = mysql.connect()
        cursor = conn.cursor()
        try:
            job_cursor = conn.cursor()
            job_cursor.execute(job_sql, (job_name, job_info, start, end, company, email, phone, user_id, catID))
            conn.commit()
            cursor.execute(getJob, user_id)
            jobID = cursor.fetchone()
            print(jobID[0])
        except:
            print("Cannot insert job")
            return redirect(redirect_url())
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            os.makedirs(os.path.join(app.config['JobFolder'], str(jobID[0])))
            file.save(os.path.join(app.config['JobFolder'], str(jobID[0]), filename))
            cursor2 = conn.cursor()
            updatepictureSQL = """UPDATE `job` SET `Job_description`= %s WHERE `Job_id` = %s"""
            try:
                cursor2.execute(updatepictureSQL, (filename, jobID[0]))
                conn.commit()
            except:
                print("Cannot update picture to database")
    else:
        return redirect(redirect_url())
    return redirect(url_for("jobProfile", jobID=jobID[0]))

@app.route('/deletejob/<jobID>')
def deletejob(jobID):
    conn = mysql.connect()
    cursor = conn.cursor()
    sql = """UPDATE `job` SET `status`= 0 WHERE `Job_id` = %s"""
    try:
        cursor.execute(sql, jobID)
        conn.commit()
    except:
        print("Cannot get number of data in job")
    return redirect(url_for("job", page=1))


@app.route('/newtutor/create_new_tutor', methods = ['POST'])
def create_tutor():
    if g.user:
        user_id = g.user_id
        numberOfCourse = int(request.form["hiddenvalue"])
        link = request.form["link"]
        facebook = request.form["facebook"]
        info = request.form['info']
        phone = request.form["phonenumber"]
        line = request.form["line"]
        subject = request.form.getlist('coursecat')
        course = request.form.getlist('course')
        price = request.form.getlist("courseprice")
        conn = mysql.connect()
        cursor = conn.cursor()
        subjectList = getSub()
        role = 1 #tutor
        tutorSQL = """INSERT INTO `tutor`(`User_id`, `Information`, `Video`, `Facebook`, `Line`, `Phone`, `tutor_create_time`)
                              VALUES (%s,%s,%s,%s,%s,%s,%s)"""
        update_user_role_SQL = """UPDATE `user` SET `Role`=%s WHERE `User_id` = %s"""
        try:
            create_time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
            cursor.execute(tutorSQL, (user_id, info, link, facebook, line, phone, create_time))
            try:
                cursor.execute(update_user_role_SQL, (role, user_id))
                conn.commit()
            except:
                print("Cannot change role in tutor")
        except:
            print("Cannot insert tutor")
        for i in range(numberOfCourse):
            subjectName = subjectList[int(subject[i])-1][1]
            print(subjectName)
            subjectSQL = """INSERT INTO `subject_group`(`User_id`, `Subject_id`, `Price`, `Subject_description`)
                                VALUES (%s,%s,%s,%s)"""
            try:
                cursor.execute(subjectSQL, (user_id, subject[i], price[i], course[i]))
                conn.commit()
            except:
                print("Cannot insert subject")
        cursor.close()
        conn.close()
    else:
        return redirect(url_for("tutor", page=1))
    return redirect(url_for("profile", tutor_id=user_id))

@app.route('/job/' , defaults={'page':1})
@app.route('/job/page/<page>')
def job(page):
    numDataStart = ((int(page) - 1) * 18)
    # numDataEnd = int(page) * 18
    conn = mysql.connect()
    cursor = conn.cursor()
    numOfDataSQL = """SELECT COUNT(*)
                                  FROM `job` WHERE End_date >= CURRENT_DATE() AND status = 1"""
    try:
        cursor.execute(numOfDataSQL)
        numOfData = cursor.fetchone()
        print(numOfData)
    except:
        print("Cannot get number of data in job")

    sql = """SELECT *
             FROM `job` j
             INNER JOIN `job_category` jc ON j.job_cat_id = jc.job_cat_id
             WHERE j.End_date >= CURRENT_DATE() AND j.status = 1
             ORDER BY j.End_date ASC LIMIT %s OFFSET %s"""
    try:
        cursor.execute(sql, (18, numDataStart))
        numPage = int(math.ceil(float(numOfData[0]) / float(18)))
        jobData = cursor.fetchall()
        print(jobData)
    except:
        print("Cannot query job data")
    jobCatSql = """SELECT Job_cat_name FROM job_category"""
    try:
        cursor.execute(jobCatSql)
        jobCat = cursor.fetchall()
    except:
        print("Cannot query job category")
    cursor.close()
    conn.close()
    if g.user:
        return render_template('job.html', jobList = jobData, numofPage = numPage, page = int(page), jobCatList = jobCat, login = g.user , user_id = g.user_id)
    else:
        return render_template('job.html', jobList = jobData, numofPage = numPage, jobCatList = jobCat, page = int(page))

@app.route('/job/<jobID>')
def jobProfile(jobID):
    conn = mysql.connect()
    cursor = conn.cursor()
    sql = """SELECT *
                 FROM `job` j
                 INNER JOIN `job_category` jc ON j.job_cat_id = jc.job_cat_id
                 WHERE j.Job_id = %s"""
    try:
        cursor.execute(sql, jobID)
        job = cursor.fetchone()
        print(job)
    except:
        print("Cannot get job informaiton")
    sql2 = """SELECT j.Resume, u.Firstname, u.Lastname, j.User_id FROM `job_applicant` j INNER JOIN `user` u WHERE u.User_id = j.User_id AND j.Job_id = %s AND j.status = 1 ORDER BY j.Applicant_id"""
    try:
        cursor.execute(sql2, jobID)
        applicant = cursor.fetchall()
    except:
        print("Cannot get job informaiton")
    cursor.close()
    conn.close()
    apply = 0
    if g.user:
        for app in applicant:
            if app[3] == g.user_id:
                apply = 1
                break
        return render_template('job-profile.html', job = job, applicant = applicant, apply = apply, login = g.user , user_id = g.user_id)
    else:
        return render_template('job-profile.html', job = job, apply = 0, applicant = applicant)

@app.route('/<category>/newpost')
def newpost(category):
    categorySet = getCat()
    categoryDetail = [i for i in categorySet if i[1] == category][0]
    if g.user:
        return render_template('newpost.html', cat=categorySet, currentCat=category, currentCatDetail=categoryDetail, login = g.user, user_id=g.user_id)
    else:
        return render_template('newpost.html' , cat = categorySet, currentCat = category, currentCatDetail = categoryDetail)

@app.route('/discussion/<category>/discussion/<dis_id>/post_id/<post_id>/poster_id/<poster_id>/page/<page_no>/voting_up/<voting>')
def voting_up(category, dis_id, poster_id, voting, post_id, page_no):
    voter_id = g.user_id # person who vote
    conn = mysql.connect()
    cursor = conn.cursor()
    voting_score = int(voting)
    if(voting_score == 1):
        voteupSQL = """INSERT INTO `vote` (`Voter_id`,`Post_id`,`Poster_id`,`Score`, `dis_id`) VALUES (%s,%s,%s,%s,%s)
                       ON DUPLICATE KEY UPDATE   `Score` = 1"""
    else:
        voteupSQL = """INSERT INTO `vote` (`Voter_id`,`Post_id`,`Poster_id`,`Score`,`dis_id`) VALUES (%s,%s,%s,%s,%s)
                       ON DUPLICATE KEY UPDATE `Score` = 0"""
    try:
        cursor.execute(voteupSQL,(voter_id, post_id, poster_id, voting_score, dis_id))
        conn.commit()
        return redirect(url_for('discussion_post', category = category, dis_id= dis_id ,page = page_no))
    except:
        print("fail to insert vote up into db")

@app.route('/discussion/<category>/discussion/<dis_id>/post_id/<post_id>/poster_id/<poster_id>/page/<page_no>/voting_down/<voting>')
def voting_down(category, dis_id, poster_id, voting, post_id, page_no):
    voter_id = g.user_id # person who vote
    conn = mysql.connect()
    cursor = conn.cursor()
    voting_score = int(voting)
    if(voting_score == -1):
        voteupSQL = """INSERT INTO `vote` (`Voter_id`,`Post_id`,`Poster_id`,`Score`, `dis_id`) VALUES (%s,%s,%s,%s,%s)
                       ON DUPLICATE KEY UPDATE   `Score` = -1"""
    else:
        voteupSQL = """INSERT INTO `vote` (`Voter_id`,`Post_id`,`Poster_id`,`Score`,`dis_id`) VALUES (%s,%s,%s,%s,%s)
                       ON DUPLICATE KEY UPDATE `Score` = 0"""
    try:
        cursor.execute(voteupSQL,(voter_id, post_id, poster_id, voting_score, dis_id))
        conn.commit()
        return redirect(url_for('discussion_post', category = category, dis_id= dis_id, page = page_no))
    except:
        print("fail to insert vote up into db")

@app.route('/discussion/<category>/discussionID/<dis_id>/' , defaults={'page': 1})
@app.route('/discussion/<category>/discussionID/<dis_id>/page/<page>')
def discussion_post(category,dis_id, page):
    numDataStart = ((int(page) - 1) * 10)
    conn = mysql.connect()
    cursor = conn.cursor()
    categoryList = getCat()
    categoryName = [i[1] for i in categoryList]
    categoryDetail = [i for i in categoryList if i[1] == category][0]
    topicSQL = """SELECT topic,content,
                  Create_Time, 
                  email,
                  firstname,
                  lastname,
                  `user`.user_id,
                  picture,
                  dis.Dis_id,
                   sum(vote.Score) as noOfComment
                  FROM `discussion` dis 
                  INNER JOIN `user` ON `user`.User_id = dis.user_id 
                  INNER JOIN profile_picture pic ON `user`.`User_id` = pic.User_id
                  LEFT JOIN `vote` ON `vote`.Post_id = dis.Dis_id
                  WHERE dis.dis_id = %s"""
    try:
        cursor.execute(topicSQL, dis_id)
        topicInfo = cursor.fetchone()
    except:
        print("cannot query discussion")
    commentSQL = """SELECT content,Create_time,email,firstname,lastname,ban_status,picture, com.User_id, com.Comment_id
                    FROM `comment` com INNER JOIN user ON user.User_id = com.user_id 
                    INNER JOIN profile_picture pic ON pic.User_id = com.user_id
                    WHERE com.dis_id = %s ORDER BY Create_time ASC"""
    try:
        cursor.execute(commentSQL,dis_id)
        commentList = cursor.fetchall()
        commentShow = commentList[numDataStart:numDataStart + 10]
        sumofVote = getNumberofVoteFromComment([comment[8] for comment in commentShow])
        checkVote = diduserVote([comment[8] for comment in commentShow], g.user_id)
        maxList = getTopComment(dis_id)
        if maxList:
            checkuservotetopComment = diduserVote(maxList[0], g.user_id)
        else:
            checkuservotetopComment = 0
        checkuservotediscussionTopic = diduserVote(dis_id, g.user_id)
        numPage = int(math.ceil(float(commentList.__len__() / float(10))))
        totalnumofComment = int(commentList.__len__())
        print(commentList)
        print(checkVote)
    except:
        print("Fail to query comment")
    if g.user:
        getloginuserinfoSQL = """SELECT user.Email, user.Firstname, user.Lastname, user.Role, user.Ban_status, pic.picture 
                             FROM user 
                             INNER JOIN profile_picture pic ON pic.User_id = user.User_id 
                             WHERE user.user_id = %s"""
        try:
            cursor.execute(getloginuserinfoSQL, g.user_id )
            login_user_info = cursor.fetchone()
        except:
            print("cannot get login user info")
        return render_template('post2.html', topic=topicInfo, comList=commentShow, login = g.user, user_id = g.user_id
                               , page = int(page), numofPage = numPage, dis_id = dis_id, cat = category
                               , voteCount = sumofVote, check = checkVote, top = maxList, totalcomment = totalnumofComment,
                               checkTop = checkuservotetopComment, checkTopic = checkuservotediscussionTopic, login_user = login_user_info,
                               catDetail =categoryDetail, catList = categoryName)
    else:
        return render_template('post2.html', topic = topicInfo, comList =commentShow, page = int(page),
                               numofPage = numPage, dis_id = dis_id, cat = category, voteCount = sumofVote, check = checkVote,top = maxList,
                               totalcomment = totalnumofComment, checkTop = checkuservotetopComment, checkTopic = checkuservotediscussionTopic,
                               catDetail=categoryDetail, catList=categoryName)

@app.route("/discussion/<category>/discussion/<dis_id>/addcomment/user/<user_id>/page/<page_no>", methods=['POST'])
def add_comment_into_discussion(category, dis_id,user_id, page_no):
    content = request.form.get('content')
    conn = mysql.connect()
    cursor = conn.cursor()
    addcommentSQL = """INSERT INTO `comment`(`Dis_id`, `User_id`, `Content`) VALUES (%s,%s,%s)"""
    try:
        cursor.execute(addcommentSQL,(dis_id,user_id,content))
        conn.commit()
    except:
        print("Fail to insert comment into discussion")
    return redirect(url_for('discussion_post', category = category, dis_id=dis_id, page = page_no))

@app.route('/<category>/newpost/create_new_discussion', methods=['POST'])
def createnewpost(category):
    topic = request.form['topic_name']
    categoryList = request.form.getlist('category_name')
    discussion = request.form['content']
    if g.user:
        user_id = g.user_id
        conn = mysql.connect()
        cursor = conn.cursor()
        try:
            sqlPostDis = """INSERT INTO `discussion`(`User_id`, `Topic`, `Content`)
                            VALUES (%s,%s,%s)"""
            cursor.execute(sqlPostDis, (user_id, topic, discussion))
            print(cursor.lastrowid)
            dis_id = cursor.lastrowid
            try:
                for categoryValue in categoryList:
                    sqlPostDis_Cat_Grp = """INSERT INTO `dis_category_group`(`Dis_id`, `Dis_cat_id`)
                                            VALUES (%s,%s)"""
                    cursor.execute(sqlPostDis_Cat_Grp, (dis_id, categoryValue))
                    conn.commit()
                cursor.close()
                conn.close()
            except:
                print("Cannot Insert into dis_category_group")
        except:
            print("Cannot Insert value into discussion")
        return redirect(url_for("discussion_post", category = category, dis_id = dis_id, page =1))
    else:
        return redirect(url_for("newpost", category = category))

@app.route('/discussion/<category>/', defaults={'page':1, 'topic_name': None})
@app.route('/discussion/<category>/page/<page>', defaults={'topic_name': None})
@app.route('/discussion/<category>/topic/<topic_name>', defaults={'page':1})
@app.route('/discussion/<category>/topic/<topic_name>/page/<page>')
def discussion(category, page, topic_name):
    numDataStart = ((int(page)-1)*15)
    #numDataEnd = int(page)*15
    conn = mysql.connect()
    categoryList = getCat()
    categoryName = [i[1] for i in categoryList]
    categoryDetail = [i for i in categoryList if i[1] == category][0]
    if(category in categoryName):
        cursor = conn.cursor()
        if not topic_name:
            discussion_info_SQL = """SELECT catgrp.dis_cat_group_id
                    ,catgrp.dis_id
                    ,catgrp.dis_cat_id
                    ,cat.Dis_cat_name
                    ,dis.User_id
                    ,dis.Topic
                    ,dis.Content
                    ,dis.Create_Time
                    ,`user`.firstname
                    ,`user`.lastname
                    , pic.picture
                    FROM `dis_category_group` catgrp
                    INNER JOIN `dis_category` cat ON catgrp.dis_cat_id = cat.Dis_cat_id
                    INNER JOIN `discussion` dis ON dis.Dis_id = catgrp.dis_id
                    INNER JOIN `user` ON `user`.user_id = dis.user_id 
                    INNER JOIN `profile_picture`pic ON pic.user_id = dis.user_id
                    WHERE cat.Dis_cat_name = %s 
                    ORDER BY dis.create_time DESC """
        else:
            discussion_info_SQL = """SELECT catgrp.dis_cat_group_id
                            ,catgrp.dis_id
                            ,catgrp.dis_cat_id
                            ,cat.Dis_cat_name
                            ,dis.User_id
                            ,dis.Topic
                            ,dis.Content
                            ,dis.Create_Time
                            ,`user`.firstname
                            ,`user`.lastname
                            , pic.picture
                            FROM `dis_category_group` catgrp
                            INNER JOIN `dis_category` cat ON catgrp.dis_cat_id = cat.Dis_cat_id
                            INNER JOIN `discussion` dis ON dis.Dis_id = catgrp.dis_id
                            INNER JOIN `user` ON `user`.user_id = dis.user_id 
                            INNER JOIN `profile_picture`pic ON pic.user_id = dis.user_id
                            WHERE cat.Dis_cat_name = %s and dis.Topic LIKE %s 
                            ORDER BY dis.create_time DESC"""
        try:
            if not topic_name:
                cursor.execute(discussion_info_SQL, category)
            else:
                cursor.execute(discussion_info_SQL, (category, ("%" + topic_name + "%")))
            discussion = cursor.fetchall()
            numOfData = discussion.__len__()
            discussion_per_page = discussion[numDataStart:numDataStart+15]
            numPage = int(math.ceil(float(numOfData)/float(15)))
        except:
            print("Cannot query the data in Category: "+category)
        if discussion:
            dis_id = [dataList[1] for dataList in discussion_per_page]
            numOfCommentinDiscussion = [getComment(comment).__len__() for comment in dis_id]
            time = [timesince(dataList[7]) for dataList in discussion_per_page]
            content = [removeHTML(dataList[6]) for dataList in discussion_per_page]
            content = [each.replace('&nbsp;', ' ') for each in content]
        cursor.close()
        conn.close()
        if g.user:
            if discussion:
                return render_template('discussion2.html', cat=category, discussion=discussion_per_page, numofPage=numPage,
                                       catDetail=categoryDetail, catList=categoryList, content=content,
                                       comment=numOfCommentinDiscussion, time=time, page=int(page), login=g.user,
                                       user_id=g.user_id, topic_name = topic_name)
            else:
                return render_template('discussion2.html', cat=category, discussion=None,
                                       numofPage=numPage,
                                       catDetail=categoryDetail, catList=categoryList, page=int(page), login=g.user,
                                       user_id=g.user_id, topic_name = topic_name)
        else:
            if discussion:
                return render_template('discussion2.html', cat=category, discussion=discussion_per_page, numofPage=numPage,
                                   catDetail=categoryDetail, catList=categoryList, content=content,
                                   comment=numOfCommentinDiscussion, time=time, page=int(page), topic_name = topic_name)
            else:
                return render_template('discussion2.html', cat=category, discussion=None,
                                       numofPage=numPage, catDetail=categoryDetail, catList=categoryList,
                                       page=int(page), topic_name = topic_name)

@app.route('/discussion/<category>/searchtopic', methods=['POST'])
def searchtopic(category):
    topic = request.form.get('searchtopic')
    if topic:
        return redirect(url_for('discussion', category = category, topic_name= topic, page = 1))
    else:
        return redirect(url_for('discussion', category=category, topic_name= None, page=1))


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

def getComment(dis_id):
    conn = mysql.connect()
    cursor = conn.cursor()
    sqlComment = """SELECT * FROM `comment` WHERE `comment`.dis_id = %s"""
    try:
        cursor.execute(sqlComment, dis_id)
        comment = cursor.fetchall()
        return comment
    except:
        print("Cannot query subject name")
    conn.close()

def getNumberofVoteFromComment(comment_id):
    conn = mysql.connect()
    cursor = conn.cursor()
    vote = []
    if isinstance(comment_id, list) or isinstance(comment_id, tuple):
        for comment in comment_id:
            sqlvote = """SELECT sum(score) as sumofvote FROM `vote` WHERE `vote`.`Post_id` = %s and `vote`.`Post_id` != `vote`.`Dis_id`  GROUP BY `Post_id`"""
            try:
                cursor.execute(sqlvote, comment)
                com_id = cursor.fetchone()
                if not com_id:
                    com_id = [0]
                vote = vote + [int(number) for number in com_id]
            except:
                print("Cannot query number of comment")
    else:
        sqlvote = """SELECT sum(score) as sumofvote FROM `vote` WHERE `vote`.`Post_id` = %s and `vote`.`Post_id` != `vote`.`Dis_id` GROUP BY `Post_id`"""
        try:
            cursor.execute(sqlvote, comment_id)
            vote = cursor.fetchone()
        except:
            print("Cannot query number of comment")
    return vote
    conn.close()

def getTopComment(dis_id):
    conn = mysql.connect()
    cursor = conn.cursor()
    sqlvote = """SELECT vote.post_id,comment.Content, comment.Create_time, user.User_id, user.Email, 
                 user.Firstname, user.Lastname, user.Role,user.Ban_status,vote.Dis_id,pic.picture,sum(score) as sumofvote 
                 FROM `vote` 
                 INNER JOIN comment ON comment.Comment_id = vote.Post_id
                 INNER JOIN user ON user.User_id = comment.User_id
                 INNER JOIN profile_picture pic ON pic.User_id = user.User_id
                 WHERE `vote`.`dis_id` = %s and `vote`.`Post_id` != `vote`.`Dis_id` 
                 GROUP BY `Post_id` 
                 ORDER BY sumofvote desc, post_id ASC"""
    try:
        cursor.execute(sqlvote, dis_id)
        comment = cursor.fetchone()
    except:
        print("Cannot query number of comment")
    return comment
    conn.close()

def diduserVote(comment_id, user_id):
    if user_id:
        conn = mysql.connect()
        cursor = conn.cursor()
        ListofcheckVoting = []
        if isinstance(comment_id, list) or isinstance(comment_id, tuple):
            for comment in comment_id:
                sqlcheckvote = """SELECT * FROM `vote` WHERE `vote`.`Post_id` = %s and vote.Voter_id = %s"""
                try:
                    cursor.execute(sqlcheckvote, (comment, user_id))
                    check = cursor.fetchone()
                    if not check:
                        checkVote = 0

                    else:
                        checkVote = check[4]
                    ListofcheckVoting = ListofcheckVoting + [checkVote]
                except:
                    print("Cannot query checklist of voting")
        else:
            sqlcheckvote = """SELECT * FROM `vote` WHERE `vote`.`Post_id` = %s and vote.Voter_id = %s"""
            try:
                cursor.execute(sqlcheckvote, (comment_id, user_id))
                check = cursor.fetchone()
                if not check:
                    ListofcheckVoting = 0

                else:
                    ListofcheckVoting = check[4]
            except:
                print("Cannot query checklist of voting")
    else:
        ListofcheckVoting = []
        if isinstance(comment_id, list) or isinstance(comment_id, tuple):
            for i in range(len(comment_id)):
                ListofcheckVoting = ListofcheckVoting + [0]
        else:
            ListofcheckVoting = 0
    return ListofcheckVoting
    conn.close()

def calculate_age(born):
    today = date.today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))

def removeHTML(text):
    return TAG_RE.sub('', text)


@app.template_filter()
def timesince(dt, default="just now"):
    """
    Returns string representing "time since" e.g.
    3 days ago, 5 hours ago etc.
    """

    now = datetime.now()
    diff = now - dt

    periods = (
        (diff.days / 365, "year", "years"),
        (diff.days / 30, "month", "months"),
        (diff.days / 7, "week", "weeks"),
        (diff.days, "day", "days"),
        (diff.seconds / 3600, "hour", "hours"),
        (diff.seconds / 60, "minute", "minutes"),
    )

    if diff.days > 0:
        return dt.strftime('%H:%M %b %d, %Y')

    for period, singular, plural in periods:

        if period >= 1:
            return "%d %s ago" % (period, singular if period < 2 else plural)

    return default

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def getsession():
    if 'user' in session:
        return session['user']
    else:
        return False

def redirect_url(default='index'):
    return request.args.get('next') or \
           request.referrer or \
           url_for(default)

if __name__ == '__main__':
    app.run(debug=True)
