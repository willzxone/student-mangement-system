----------------------------------------------------------PROCEDURES------------------------------------------------------------
CREATE OR REPLACE PROCEDURE GET_CREDENTIALS(username VARCHAR2, userpass VARCHAR2, table_name VARCHAR, l_result OUT SYS_REFCURSOR)
AS
BEGIN
    SAVEPOINT CURRENT_DB_STATE;
    OPEN l_result FOR
        'SELECT cred.username AS username, cred.password AS password
        FROM users usr, '||table_name||'Credentials cred
        WHERE 
            usr.role = :role AND
            usr.user_id = cred.user_id AND
            cred.username = :username AND
            cred.password = :password'
        USING table_name, username, userpass;
EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK TO CURRENT_DB_STATE;
END;

CREATE OR REPLACE PROCEDURE GET_CLASSES_SPECFIC_STD(username VARCHAR2, l_result OUT SYS_REFCURSOR)
AS
BEGIN
SAVEPOINT CURRENT_DB_STATE;
    OPEN l_result FOR
        'SELECT c.class_id AS "CLASS ID",c.class_name "CLASS NAME",c.class_location AS LOCATION
        FROM CLASS c, STDCLASSDETAILS cdetail
        WHERE c.class_id = cdetail.class_id AND cdetail.std_id = :username'
        USING username;
EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK TO CURRENT_DB_STATE;
END;

CREATE OR REPLACE PROCEDURE GET_SCHEDULED_CLASSES_SPECFIC_STD(username VARCHAR2, l_result OUT SYS_REFCURSOR)
AS
BEGIN
SAVEPOINT CURRENT_DB_STATE;
    OPEN l_result FOR
        'SELECT DISTINCT c.class_id AS "CLASS ID", c.class_name AS "CLASS NAME", c.class_location AS LOCATION, 
        cschedule.schedule_day AS DAY,
        TO_CHAR(cschedule.starting_time, ''HH24:MI:SS AM'') AS "START TIME",
        TO_CHAR(cschedule.ending_time, ''HH24:MI:SS AM'') AS "END TIME"
        FROM class c
        JOIN classSchedule cschedule ON c.class_id = cschedule.class_id
        JOIN stdclassDetails cdetail ON cschedule.class_id = cdetail.class_id
        WHERE cdetail.std_id LIKE :username'
        USING username;
EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK TO CURRENT_DB_STATE;
END;

CREATE OR REPLACE PROCEDURE GET_ATTENDACNE_CLASSES_SPECFIC_STD(username VARCHAR2,classid VARCHAR2, l_result OUT SYS_REFCURSOR)
AS
BEGIN
SAVEPOINT CURRENT_DB_STATE;
    OPEN l_result FOR
        'SELECT TO_CHAR(a.attendance_date, ''DD-MON-YYYY'') AS "ATTENDANCE DATE", a.status
        FROM attendance a
        INNER JOIN attendanceStudent ast ON a.attendance_id = ast.attendance_id
        INNER JOIN attendanceClass ac ON a.attendance_id = ac.attendance_id
        INNER JOIN stdclassDetails cd ON ast.std_id = cd.std_id AND ac.class_id = cd.class_id
        WHERE ast.std_id = :username AND ac.class_id = :classid'
        USING username,classid;
 EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK TO CURRENT_DB_STATE;       
END;

CREATE OR REPLACE PROCEDURE ADD_USER(first_name VARCHAR2, last_name VARCHAR2, contact VARCHAR2,gender VARCHAR2,email VARCHAR2,blood_group VARCHAR2, address VARCHAR2,pass VARCHAR2,table_name VARCHAR2)
AS
SELECT_USER VARCHAR2(4);
current_date DATE := SYSDATE;
BEGIN
SAVEPOINT CURRENT_DB_STATE;   
    IF TABLE_NAME = 'student' THEN 
        SELECT_USER := 'u001';
        INSERT INTO STUDENT
        VALUES('std-0',first_name,last_name,current_date,gender,contact,email,blood_group,address,0);
    ELSE 
        SELECT_USER := 'u002'; 
        INSERT INTO TEACHER
        VALUES('tch-0',first_name,last_name,current_date,gender,contact,email,blood_group,address);
    END IF;

    ADD_USER_CREDENTIALS(SELECT_USER ,pass ,TABLE_NAME);
EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK TO CURRENT_DB_STATE;       
END;

CREATE OR REPLACE PROCEDURE ADD_USER_CREDENTIALS(USER_ID VARCHAR2 ,pass VARCHAR2,table_name VARCHAR2)
AS
    SELECT_USER VARCHAR2 (4);
    sql_statement varchar2(200);
BEGIN
SAVEPOINT CURRENT_DB_STATE; 
    sql_statement:= 'INSERT INTO ' || table_name || 'Credentials VALUES ('||':USER_ID, :pass, :SELECT_USER)';
    
    IF TABLE_NAME = 'student' THEN 
        SELECT_USER := 'std-';
        EXECUTE IMMEDIATE sql_statement USING USER_ID,pass, SELECT_USER || LPAD(STD_ID_SEQ.CURRVAL-1, 3, '0');
    ELSE 
        SELECT_USER := 'tch-'; 
        EXECUTE IMMEDIATE sql_statement USING USER_ID,pass, SELECT_USER || LPAD(TCH_ID_SEQ.CURRVAL-1, 3, '0');
    END IF;
EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK TO CURRENT_DB_STATE;       
END;

CREATE OR REPLACE PROCEDURE GET_USER_DETAILS(USER_ID VARCHAR2, table_name VARCHAR2,l_result OUT SYS_REFCURSOR)
AS
SELECT_ID VARCHAR2(6);
SQL_STATEMENT VARCHAR2(200);
BEGIN
SAVEPOINT CURRENT_DB_STATE; 
    IF table_name = 'student' 
    THEN SELECT_ID := 'std_id';
    ELSE SELECT_ID := 't_id'; END IF;
    
    OPEN l_result FOR
        'SELECT first_name "First Name", last_name "Last Name", cred.Password "Password", Contact "Contact", Email "Email", blood_group "Bloodgroup",Gender "Gender",Address "Address"
                      FROM '||table_name||', '||table_name||'Credentials cred
                      WHERE 
                          '||SELECT_ID||' = cred.username AND
                          cred.username = :USER_ID'
        USING USER_ID;
EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK TO CURRENT_DB_STATE;       
END;

CREATE OR REPLACE PROCEDURE EDIT_USER(USER_ID VARCHAR2,first_name VARCHAR2, last_name VARCHAR2, contact VARCHAR2,gender VARCHAR2,email VARCHAR2, blood_group VARCHAR2, address VARCHAR2,pass VARCHAR2,table_name VARCHAR2)
AS
SQL_STATMENT VARCHAR2(200);
SELECT_USER VARCHAR2(6);
BEGIN
SAVEPOINT CURRENT_DB_STATE; 
    IF TABLE_NAME = 'student' THEN 
        SELECT_USER := 'std_id';
    ELSE 
        SELECT_USER := 't_id'; 
    END IF;
    
    SQL_STATMENT := 'UPDATE ' || TABLE_NAME || ' 
                SET first_name = :FIRST_NAME , last_name = :LAST_NAME , gender = :GENDER , contact = :CONTACT , email = :EMAIL
                 WHERE ' || SELECT_USER || ' = :USER_ID';           
                     
    EXECUTE IMMEDIATE SQL_STATMENT USING FIRST_NAME,LAST_NAME,GENDER,CONTACT,EMAIL, USER_ID;
                      
    SQL_STATMENT := 'UPDATE ' || TABLE_NAME || ' 
                SET blood_group = :blood_group , address = :address 
                WHERE ' || SELECT_USER || ' = :USER_ID'; 
    EXECUTE IMMEDIATE SQL_STATMENT USING blood_group,address,USER_ID;
                             
    SQL_STATMENT := 'UPDATE '|| TABLE_NAME||'Credentials 
                    SET password = :pass WHERE username = :USER_ID';
    EXECUTE IMMEDIATE SQL_STATMENT USING PASS,USER_ID;
    
EXCEPTION
    WHEN OTHERS THEN
      ROLLBACK TO CURRENT_DB_STATE;       
END;


--------------------------------------------------------------------TRIGGERS--------------------------------------------------------------------

CREATE OR REPLACE TRIGGER STD_ID_TRIGGER
BEFORE INSERT ON student
FOR EACH ROW
BEGIN
    :NEW.std_id := 'std-' || LPAD(STD_ID_SEQ.NEXTVAL-1, 3, '0');
END;

--

CREATE OR REPLACE TRIGGER TCH_ID_TRIGGER
BEFORE INSERT ON teacher
FOR EACH ROW
BEGIN
    :NEW.t_id := 'tch-' || LPAD(TCH_ID_SEQ.NEXTVAL-1, 3, '0');
END;

--------------------------------------------------------------------SEQUENCES--------------------------------------------------------------------
CREATE SEQUENCE STD_ID_SEQ
    START WITH 1
    INCREMENT BY 1
    MAXVALUE 9999999999
    CYCLE
    NOCACHE;
SELECT STD_ID_SEQ.NEXTVAL FROM DUAL;

DROP SEQUENCE STD_ID_SEQ;

CREATE SEQUENCE TCH_ID_SEQ
    START WITH 1
    INCREMENT BY 1
    MAXVALUE 9999999999
    CYCLE
    NOCACHE;
SELECT TCH_ID_SEQ.NEXTVAL FROM DUAL;

DROP SEQUENCE TCH_ID_SEQ;
--------------------------------------------------------------------QUERIES--------------------------------------------------------------------

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

-------------------------------------------------------------------GET ATTENDANCE OF A STUDENT---------------------------------------------------------------------------

SELECT TO_CHAR(a.attendance_date, 'DD-MON-YYYY') AS "ATTENDANCE DATE", a.status
FROM attendance a
INNER JOIN attendanceStudent ast ON a.attendance_id = ast.attendance_id
INNER JOIN attendanceClass ac ON a.attendance_id = ac.attendance_id
INNER JOIN stdclassDetails cd ON ast.std_id = cd.std_id AND ac.class_id = cd.class_id
WHERE ast.std_id = 'std-002' AND ac.class_id = 'cls-002';

-------------------------------------------------------------------ADD USER WITH CREDENTIALS---------------------------------------------------------------------------

EXECUTE ADD_USER(first_name=> 'WALEED', last_name=>'ASIF', contact=>'03057669661', blood_group=> 'b+',address=>'300 A BLOCK',email=> 'waleed@gmail.com',gender=>'male',pass=>'password12345',table_name=>'teacher');

----------------------------------------------------------------------------------------------------------------------------------------------------

