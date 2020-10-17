
(**It is strongly adviced to follow suggested credentials for username and database**) <br>
Firstly, install mysql server on your computer.

After that on your computer, 
create a new user using the following command: <br/>

**CREATE USER university IDENTIFIED BY 'password';** <br>

After this command you will create user wil following credentials: <br/>
user: university <br/>
password: password <br/>
Then create a database using the following command: <br>

**CREATE DATABASE sweproj;** <br/>

This way database named "sweproj" will be created. <br/>
Do not forget to grant user you just created privileges to manipulate with this database.
You can do it using following command: <br/>

**GRANT ALL PRIVILEGES ON sweproj.\* TO 'university' with grant option;**


After you created a user, created a database and granted user all needed privileges, you need to connect 
to this database as this user; It can be done from MySQL Workbranch, however I would recommend DataGrip.
<br>

After successful connection, run .sql scrip from the database folder in order to create all necessary tables.

Congratulations, you have just deployed the database for our project.

