UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'akhmed.sakip@nu.edu.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Akhmed', 'Sakip', '+77776666642');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77776666642'), CURDATE(), 1, 'akhmed.sakip@nu.edu.kz');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'akhmed.sakip@nu.edu.kz'), 'Manager');

SELECT RHP.Privilege
FROM user
INNER JOIN role ON role.Role = user.Role
INNER JOIN role_has_privilege RHP ON RHP.Role = role.Role
WHERE user.Email = 'akhmed.sakip@nu.edu.kz';

SELECT * FROM `user` WHERE Email = 'akhmed.sakip@nu.edu.kz';

UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'a.a@nu.edu.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'a', 'a', '+70000000000');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000000'), CURDATE(), 1, 'a@a.a');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'a@a.a'), 'Desk Clerk');