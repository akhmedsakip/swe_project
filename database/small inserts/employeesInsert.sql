# INSERT MANAGER OF HOTEL ID 1
UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'admin_1@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Admin', '+70000000000');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000000'), CURDATE(), 1, 'admin_1@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'admin_1@amita.kz'), 'Manager');
# ---------------------------------

# INSERT DESK CLERK OF HOTEL ID 1
UPDATE user
SET Role = 'ROLE_MODERATOR'
WHERE Email = 'moderator_1@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Moderator', '+70000000001');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000001'), CURDATE(), 1, 'moderator_1@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'moderator_1@amita.kz'), 'Desk Clerk');
# ---------------------------------

# INSERT MANAGER OF HOTEL ID 2
UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'admin_2@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Admin', '+70000000002');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000002'), CURDATE(), 2, 'admin_2@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'admin_2@amita.kz'), 'Manager');
# ---------------------------------

# INSERT DESK CLERK OF HOTEL ID 2
UPDATE user
SET Role = 'ROLE_MODERATOR'
WHERE Email = 'moderator_2@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Moderator', '+70000000003');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000003'), CURDATE(), 2, 'moderator_2@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'moderator_2@amita.kz'), 'Desk Clerk');
# ---------------------------------

# INSERT MANAGER OF HOTEL ID 3
UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'admin_3@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Admin', '+70000000004');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000004'), CURDATE(), 3, 'admin_3@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'admin_3@amita.kz'), 'Manager');
# ---------------------------------

# INSERT DESK CLERK OF HOTEL ID 3
UPDATE user
SET Role = 'ROLE_MODERATOR'
WHERE Email = 'moderator_3@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Moderator', '+70000000005');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000005'), CURDATE(), 3, 'moderator_3@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'moderator_3@amita.kz'), 'Desk Clerk');
# ---------------------------------

# INSERT MANAGER OF HOTEL ID 4
UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'admin_4@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Admin', '+70000000006');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000006'), CURDATE(), 4, 'admin_4@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'admin_4@amita.kz'), 'Manager');
# ---------------------------------

# INSERT DESK CLERK OF HOTEL ID 4
UPDATE user
SET Role = 'ROLE_MODERATOR'
WHERE Email = 'moderator_4@amita.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Test', 'Moderator', '+70000000007');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000007'), CURDATE(), 4, 'moderator_4@amita.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'moderator_4@amita.kz'), 'Desk Clerk');
# ---------------------------------



# INSERT HOTEL 1 EMPLOYEES

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Clyve', 'Edmundson', '+77760000000');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000000'), CURDATE(), 1);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Tad', 'Pinches', '+77760000001');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000001'), CURDATE(), 1);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Desk Clerk');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Sapphira', 'Davidova', '+77760000002');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000002'), CURDATE(), 1);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Housekeeping Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Betta', 'Tobin', '+77760000003');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000003'), CURDATE(), 1);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Cleaner');

# ------------------------

# INSERT HOTEL 2 EMPLOYEES

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Clyve', 'Edmundson', '+77760000004');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000004'), CURDATE(), 2);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Tad', 'Pinches', '+77760000005');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000005'), CURDATE(), 2);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Desk Clerk');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Sapphira', 'Davidova', '+77760000006');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000006'), CURDATE(), 2);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Housekeeping Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Betta', 'Tobin', '+77760000007');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000007'), CURDATE(), 2);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Cleaner');

# ------------------------

# INSERT HOTEL 3 EMPLOYEES

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Clyve', 'Edmundson', '+77760000008');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000008'), CURDATE(), 3);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Tad', 'Pinches', '+77760000009');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000009'), CURDATE(), 3);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Desk Clerk');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Sapphira', 'Davidova', '+77760000010');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000010'), CURDATE(), 3);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Housekeeping Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Betta', 'Tobin', '+77760000011');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000011'), CURDATE(), 3);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Cleaner');

# ------------------------

# INSERT HOTEL 4 EMPLOYEES

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Clyve', 'Edmundson', '+77760000012');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000012'), CURDATE(), 4);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Tad', 'Pinches', '+77760000013');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000013'), CURDATE(), 4);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES (LAST_INSERT_ID(), 'Desk Clerk');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Sapphira', 'Davidova', '+77760000014');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000014'), CURDATE(), 4);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Housekeeping Manager');


INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Betta', 'Tobin', '+77760000015');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77760000015'), CURDATE(), 4);

INSERT INTO cleaning_staff (CleaningStaffID, CleaningPosition)
VALUES (LAST_INSERT_ID(), 'Cleaner');

# ------------------------