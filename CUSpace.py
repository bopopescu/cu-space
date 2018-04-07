import datetime
from random import randrange

from flask import Flask, render_template, request, redirect, url_for
import math
#NOTE!!
#install flask-mysql first by writing in terminal "pip install flask-mysql" in order to use
from flaskext.mysql import MySQL
app = Flask(__name__)
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'cuspace'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

@app.route('/')
def index():
    conn = mysql.connect()
    cursor = conn.cursor()
    categoryList = getCat()
    facultyList = [faculty for faculty in categoryList if faculty[4] == 1]
    otherList = [faculty for faculty in categoryList if faculty[4] == 0]
    print(facultyList)
    print(otherList)
    return render_template('index4.html', faclist=facultyList, othList=otherList)

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
             as tutor_subjects_name, user.Firstname, user.Lastname, user.Ban_status, sub_grp.subject_description, t.tutor_create_time
             FROM `tutor` t
             INNER JOIN `profile_picture` prof ON t.User_id = prof.user_id
             INNER JOIN `subject_group` sub_grp ON t.user_id = sub_grp.user_id
             INNER JOIN `subject` sub ON sub.subject_id = sub_grp.subject_id
             INNER JOIN `user` ON user.User_id = t.user_id GROUP BY sub_grp.user_id  ORDER BY t.tutor_create_time DESC LIMIT %s OFFSET %s"""
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
    try:
        tutorSQL = """SELECT t.user_id, t.information, prof.picture, user.Firstname, user.Lastname, user.Ban_status,
                      t.video, t.line, t.facebook, t.phone
                      FROM `tutor` t
                      INNER JOIN `profile_picture` prof ON t.User_id = prof.user_id
                      INNER JOIN `user` ON user.User_id = t.user_id
                      WHERE t.user_id = %s """
        cursor.execute(tutorSQL, tutor_id)
        tutor_info = cursor.fetchone()
        try:
            subjectSQL = """SELECT sub.Subject_name, grp.price, grp.subject_description
                              FROM `subject_group` grp
                              INNER JOIN subject sub ON sub.Subject_id = grp.Subject_id
                              WHERE grp.User_id = %s """
            cursor.execute(subjectSQL, tutor_id)
            subject_info = cursor.fetchall()
            print(tutor_info)
            return render_template('profile3.html', subList = subject_info, tutor = tutor_info)
        except:
            print("Cannot retrieve subject info")
            return render_template('error.html')
    except:
        print("Cannot retrieve tutor info")
        return render_template('error.html')

@app.route('/newtutor')
def registernewtutor():
    return render_template('newtutor.html', sub = getSub())

@app.route('/newtutor/create_new_tutor', methods = ['POST'])
def create_tutor():
    #trong me input pen user id duay
    user_id = str(randrange(1,10000000))
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
    tutorSQL = """INSERT INTO `tutor`(`User_id`, `Information`, `Video`, `Facebook`, `Line`, `Phone`, `tutor_create_time`)
                          VALUES (%s,%s,%s,%s,%s,%s,%s)"""
    try:
        create_time = datetime.datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        cursor.execute(tutorSQL, (user_id, info, link, facebook, line, phone, create_time))
        conn.commit()
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
    return redirect(url_for("profile", tutor_id=user_id))

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

@app.route('/discussion/<category>/<dis_id>/' , defaults={'page': 1})
@app.route('/discussion/<category>/<dis_id>/page/<page>')
def discussion_post(category,dis_id, page):
    conn = mysql.connect()
    cursor = conn.cursor()
    topicSQL = """SELECT topic,content,
                  Create_Time, 
                  email,
                  firstname,
                  lastname,
                  `user`.user_id,
                  picture
                  FROM `discussion` dis 
                  INNER JOIN `user` ON `user`.User_id = dis.user_id 
                  INNER JOIN profile_picture pic ON `user`.`User_id` = pic.User_id
                  WHERE dis.dis_id = %s"""
    try:
        cursor.execute(topicSQL, dis_id)
        topicInfo = cursor.fetchone()
    except:
        print("cannot query discussion")
    commentSQL = """SELECT content,Create_time,email,firstname,lastname,ban_status,picture 
                    FROM `comment` com INNER JOIN user ON user.User_id = com.user_id 
                    INNER JOIN profile_picture pic ON pic.User_id = com.user_id 
                    WHERE com.dis_id = %s ORDER BY Create_time DESC"""
    try:
        cursor.execute(commentSQL, dis_id)
        commentList = cursor.fetchall()
        print(commentList)
    except:
        print("Fail to query comment")
    return render_template('post.html', topic = topicInfo, comList =commentList)

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
@app.route('/discussion/<category>/page/<page>')
def discussion(category, page):
    numDataStart = ((int(page)-1)*15)
    #numDataEnd = int(page)*15
    conn = mysql.connect()
    categoryList = getCat()
    categoryName = [i[1] for i in categoryList]
    categoryDetail = [i for i in categoryList if i[1] == category][0]
    if(category in categoryName):
        cursor = conn.cursor()
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
                ,`user`.firstname
                ,`user`.lastname
                FROM `dis_category_group` catgrp
                INNER JOIN `dis_category` cat ON catgrp.dis_cat_id = cat.Dis_cat_id
                INNER JOIN `discussion` dis ON dis.Dis_id = catgrp.dis_id
                INNER JOIN `user` ON `user`.user_id = dis.user_id 
                WHERE cat.Dis_cat_name = %s ORDER BY dis.create_time DESC LIMIT %s OFFSET %s """
        try:
            cursor.execute(sqlWanted, (category,15,numDataStart))
            dataWanted = cursor.fetchall()
            numPage = int(math.ceil(float(numOfData[0])/float(15)))
            print(numPage)
        except:
            print("Cannot query the data in Category: "+category)
        dis_id = [dataList[1] for dataList in dataWanted]
        print(dis_id)
        numOfCommentinDiscussion = [getComment(comment).__len__() for comment in dis_id]
        print(numOfCommentinDiscussion)
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

def getComment(dis_id):
    conn = mysql.connect()
    cursor = conn.cursor()
    sqlComment = """SELECT * FROM `comment` WHERE `comment`.dis_id = %s"""
    try:
        cursor.execute(sqlComment, dis_id)
        comment = cursor.fetchall()
        return comment
    except:
        print("Cannot query category name")
    conn.close()

if __name__ == '__main__':
    app.run()
