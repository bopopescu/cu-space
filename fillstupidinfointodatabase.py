import datetime

from flask import Flask, render_template
from random import choice, randrange
import hashlib, uuid
#NOTE!!
#install flask-mysql first by writing in terminal "pip install flask-mysql"
from flaskext.mysql import MySQL
app = Flask('__CUSpace__')
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'cuspace'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
conn = mysql.connect()
# --------------------------------------------------INSERTING CATEGORY NAME AND ID INTO DATABASE  ---------------------------------------
#ALTER_INCREMENT ALL THE TABLE FIRST!
# cursor = conn.cursor()
# sql = """ALTER TABLE `dis_category` AUTO_INCREMENT = 1"""
# sql2 = """INSERT INTO `dis_category`(`Dis_cat_name`, `Logo`, `Color`, `Faculty`) VALUES ("Architecture", "fas fa-paint-brush" ,"#c46c5f", 1),
# ("Arts","fas fa-book" , "#647a90", 1),("Business", "fas fa-briefcase" , "#40adcf", 1),
# ("Communication Arts" ,"fas fa-comments" , "#347aa9", 1),("Economic", "fas fa-donate" ,"#e97734", 1),
# ("Engineering", "fas fa-cogs" ,"#df535b", 1),("Psychology" ,"far fa-smile", "#c28ed2", 1),
# ("Science" , "fas fa-dna", "#e3992b", 1 ),("General Education" , "fab fa-leanpub" , "#5fb764", 0),("Activities" , "fas fa-futbol" , "#27898b", 0)"""
# try:
#     cursor.execute(sql)
#     cursor.execute(sql2)
#     conn.commit()
# except:
#     print("Fail to insert category list")
# cursor.close()

#---------------------------------------------------INSERTING RANDOM DATA INTO CATEGORY DATA USING EXISTING USER-------------------------------------------
#
content = "Why are we still here? Just to suffer? Every night, I can feel my leg… and my arm… even my fingers. The body I’ve lost… the comrades I’ve lost… won’t stop hurting… It’s like they’re all still there. You feel it, too, don’t you? "
topic = "What is the answer of life and death"
password = "he11o".encode('utf-8')
user_key = hashlib.md5()
user_key.update(password)
user_key= user_key.hexdigest()
print(user_key)
firstname = "John"
lastname = "Cena"
dateOfbirth = datetime.datetime.today().strftime('%Y-%m-%d')
print(dateOfbirth)
role ="Wrestler"
ban_status ="0"
for i in range(500):
    while True:
        try:
            dis_id = 0
            dis_cat_id = 0
            email = "hello" + str(randrange(1, 1000000)) + "@world.com"
            username = "hello" + str(randrange(1, 1000000)) + "world"
            cursor = conn.cursor()
            usercursor = conn.cursor()
            select_user__SQL = """SELECT * FROM `user` ORDER BY RAND()"""
            try:
                usercursor.execute(select_user__SQL)
                user_id = usercursor.fetchone()[0]
                usercursor.close()
            except:
                print("fail to insert user, probably same user id, retry loop")
                continue
            sql2 = "INSERT INTO `discussion`(`User_id`, `Topic`, `Content`) VALUES (%s,%s,%s)"
            try:
                cursor.execute(sql2, (user_id, topic, content))
                conn.commit()
            except:
                print("SHIT")
            sqlFordis_id = """SELECT `dis_id` FROM `discussion`"""
            sqlFordis_cat_id = """SELECT `dis_cat_id` FROM `dis_category`"""
            try:
                cursor.execute(sqlFordis_id)
                dis_idList = cursor.fetchall()
                if(dis_idList.__len__() >1):
                    dis_idList = [i[0] for i in dis_idList]
                    dis_id = choice(dis_idList)
                else:
                    dis_id = [i[0] for i in dis_idList][0]
            except:
                print("Cannot query dis_id")
            try:
                cursor.execute(sqlFordis_cat_id)
                dis_cat_idList = cursor.fetchall()
                if (dis_cat_idList.__len__() > 1):
                    dis_cat_idList = [i[0] for i in dis_cat_idList]
                    dis_cat_id = choice(dis_cat_idList)
                else:
                    dis_cat_id = [i[0] for i in dis_cat_idList][0]
            except:
                print("cannot query dis_cat_id")
            sql3 = "INSERT INTO `dis_category_group`(`Dis_id`, `Dis_cat_id`) VALUES ({},{})".format(dis_id,dis_cat_id)
            try:
                cursor.execute(sql3)
                conn.commit()
            except:
                print("Cannot insert dis_cat_group")
            print(i)
        except:
            print("Something bad is happening!!")
            continue
        break
cursor.close()
conn.close()

# #-------------------------------------- INSERT TUTOR, USER , SUBJECT, PROFILE PIC,SUBJECT GROUP--------------------------------------
# #USER INFO
#
# password = "he11o".encode('utf-8')
# user_key = hashlib.md5()
# user_key.update(password)
# user_key= user_key.hexdigest()
# print(user_key)
# firstname = "John"
# lastname = "Cena"
# dateOfbirth = datetime.datetime.today().strftime('%Y-%m-%d')
# print(dateOfbirth)
# tutor_create_time = datetime.datetime.today().strftime('%Y-%m-%d %H:%M:%S')
# role ="Wrestler"
# ban_status ="0"
#
# #TUTOR INFO
# info = "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice. "
# video ="https://www.youtube.com/embed/c0sGiqOWt1w"
# phone ="0123456789"
# #PROFILE PIC INFO
# picture = "abcdegf.jpg"
#
# #SUBJECT
# #NONE
#
# #SUBJECT GROUP
# price = "500"
# subject_description = "Fighting Crime"
# try:
#     subjectCursor = conn.cursor()
#     # sql = """ALTER TABLE `subject` AUTO_INCREMENT = 1"""
#     # subjectSQL = """INSERT INTO `subject`(`Subject_name`)
#     #                 VALUES ("Language"), ("Science"), ("Math"), ("Architect"), ("Psychology"), ("Business"), ("Finanace"), ("Others")"""
#     # subjectCursor.execute(sql)
#     # subjectCursor.execute(subjectSQL)
#     # conn.commit()
#     try:
#         subject_idSQL = """SELECT * FROM `subject`"""
#         subjectCursor.execute(subject_idSQL)
#         subject_id = subjectCursor.fetchall().__len__()+1
#     except:
#         print("Cannot get last subject_id")
# except:
#     print("Cannot insert subject")
# subjectCursor.close()
# for i in range(1000):
#     while True:
#         try:
#     # tutor_and_user = uuid.uuid4().hex
#             picture_id = randrange(1, 1000000)
#             tutor_and_user = randrange(1, 100000000)
#             user_and_tutor_cursor = conn.cursor()
#             email = "hello" + str(randrange(1, 1000000)) + "@world.com"
#             username = "hello" + str(randrange(1, 1000000)) + "world"
#             random_subject_id = randrange(1, subject_id)
#             try:
#                 insert_user__SQL = """INSERT INTO `user`(`User_id`, `Email`, `Username`, `User_key`, `Firstname`, `Lastname`,`DateOfBirth`, `Role`, `Ban_status`)
#                                           VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) """
#                 user_and_tutor_cursor.execute(insert_user__SQL,
#                                               (tutor_and_user, email, username, user_key, firstname, lastname, dateOfbirth, role
#                                                , ban_status))
#                 try:
#                     insert_tutor_SQL = """INSERT INTO `tutor`(`User_id`, `Information`, `Video`,`Phone`, `tutor_create_time`)
#                                           VALUES (%s,%s,%s,%s,%s)"""
#                     user_and_tutor_cursor.execute(insert_tutor_SQL, (tutor_and_user, info, video, phone, tutor_create_time))
#                     conn.commit()
#                 except:
#                     print("Cannot insert into tutor")
#             except:
#                 print("Cannot insert into User, probably same user_id, retry loop")
#                 continue
#             try:
#                 subject_grpSQL = """INSERT INTO `subject_group`(`User_id`, `Subject_id`, `Price`, `Subject_description`)
#                                     VALUES (%s,%s,%s,%s)"""
#                 user_and_tutor_cursor.execute(subject_grpSQL, (tutor_and_user, random_subject_id, price, subject_description))
#                 conn.commit()
#             except:
#                 print("Cannot insert subject group")
#             try:
#                 profile_picSQL = """INSERT INTO `profile_picture`(`Picture`, `User_id`)
#                                     VALUES (%s,%s)"""
#                 user_and_tutor_cursor.execute(profile_picSQL, (picture, tutor_and_user))
#                 conn.commit()
#             except:
#                 print("Cannot insert profile picture data")
#             print(i)
#         except:
#             print("Something bad is happening!!")
#             break
#         break
# user_and_tutor_cursor.close()
# conn.close()
#
