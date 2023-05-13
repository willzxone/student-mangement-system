CREATE OR REPLACE PROCEDURE GET_CREDENTIALS(username VARCHAR2, userpass VARCHAR2, table_name VARCHAR, l_result OUT SYS_REFCURSOR)
AS
BEGIN
    OPEN l_result FOR
        'SELECT cred.username AS username, cred.password AS password
        FROM users usr, '|| table_name ||'Credentials cred
        WHERE 
            usr.role = :role AND
            usr.user_id = cred.user_id AND
            cred.username = :username AND
            cred.password = :password'
        USING table_name, username, userpass;
END;

CREATE OR REPLACE PROCEDURE GET_CLASSES_SPECFIC_STD(username VARCHAR2, l_result OUT SYS_REFCURSOR)
AS
BEGIN
    OPEN l_result FOR
        'SELECT c.class_id AS "CLASS ID",c.class_name "CLASS NAME",c.class_location AS LOCATION
        FROM CLASS c, CLASSDETAILS cdetail
        WHERE c.class_id = cdetail.class_id AND cdetail.std_id = :username'
        USING username;
END;

CREATE OR REPLACE PROCEDURE GET_SCHEDULED_CLASSES_SPECFIC_STD(username VARCHAR2, l_result OUT SYS_REFCURSOR)
AS
BEGIN
    OPEN l_result FOR
        'SELECT DISTINCT c.class_id AS "CLASS ID", c.class_name AS "CLASS NAME", c.class_location AS LOCATION, 
        cschedule.schedule_day AS DAY,
        TO_CHAR(cschedule.starting_time, ''HH24:MI:SS AM'') AS "START TIME",
        TO_CHAR(cschedule.ending_time, ''HH24:MI:SS AM'') AS "END TIME"
        FROM class c
        JOIN classSchedule cschedule ON c.class_id = cschedule.class_id
        JOIN classDetails cdetail ON cschedule.class_id = cdetail.class_id
        WHERE cdetail.std_id LIKE :username'
        USING username;
END;

CREATE OR REPLACE PROCEDURE GET_ATTENDACNE_CLASSES_SPECFIC_STD(username VARCHAR2,classid VARCHAR2, l_result OUT SYS_REFCURSOR)
AS
BEGIN
    OPEN l_result FOR
        'SELECT TO_CHAR(a.attendance_date, ''DD-MON-YYYY'') AS "ATTENDANCE DATE", a.status
        FROM attendance a
        INNER JOIN attendanceStudent ast ON a.attendance_id = ast.attendance_id
        INNER JOIN attendanceClass ac ON a.attendance_id = ac.attendance_id
        INNER JOIN classDetails cd ON ast.std_id = cd.std_id AND ac.class_id = cd.class_id
        WHERE ast.std_id = :username AND ac.class_id = :classid'
        USING username,classid;
END;






-------------------------------------------GET CLASSES DETAILS FOR SPECIFC STUDENT-------------------------------------------------------------
SELECT c.class_id AS "CLASS ID",c.class_name "CLASS NAME",c.class_location AS LOCATION
FROM class c, classDetails cdetail
where c.class_id = cdetail.class_id AND cdetail.std_id = 'std-001';

-------------------------------------------GET SCHEDULED CLASSES FOR SPECIFC STUDENT-------------------------------------------------------------
SELECT DISTINCT c.class_id AS "CLASS ID", c.class_name AS "CLASS NAME", c.class_location AS LOCATION, cschedule.schedule_day AS DAY,TO_CHAR(cschedule.starting_time, 'HH24:MI:SS AM') AS "START TIME",TO_CHAR(cschedule.ending_time, 'HH24:MI:SS AM') AS "END TIME"
FROM class c
JOIN classSchedule cschedule ON c.class_id = cschedule.class_id
JOIN classDetails cdetail ON cschedule.class_id = cdetail.class_id
WHERE cdetail.std_id LIKE 'std-002';


--------------------------------------------GET ATTENDANCE OF A STUDENT---------------------------------------------------------------------------

SELECT a.attendance_date, a.status,ast.std_id,ac.class_id
FROM attendance a
INNER JOIN attendanceStudent ast ON a.attendance_id = ast.attendance_id
INNER JOIN attendanceClass ac ON a.attendance_id = ac.attendance_id
WHERE ast.std_id = 'std-002' AND ac.class_id = 'cls-002';

select * from class;


SELECT TO_CHAR(a.attendance_date, 'DD-MON-YYYY') AS "ATTENDANCE DATE", a.status
FROM attendance a
INNER JOIN attendanceStudent ast ON a.attendance_id = ast.attendance_id
INNER JOIN attendanceClass ac ON a.attendance_id = ac.attendance_id
INNER JOIN classDetails cd ON ast.std_id = cd.std_id AND ac.class_id = cd.class_id
WHERE ast.std_id = 'std-002' AND ac.class_id = 'cls-002';


select * from users;

