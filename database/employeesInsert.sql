UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'admin@test.com';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'admin', 'admin', '+12345678910');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+12345678910'), CURDATE(), 1, 'admin@test.com');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'admin@test.com'), 'Manager');

SELECT RHP.Privilege
FROM user
INNER JOIN role ON role.Role = user.Role
INNER JOIN role_has_privilege RHP ON RHP.Role = role.Role
WHERE user.Email = 'admin@test.com';

SELECT * FROM `user` WHERE Email = 'admin@test.com';

UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'a.a@nu.edu.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'a', 'a', '+70000000000');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000000'), CURDATE(), 1, 'a@a.a');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'a@a.a'), 'Desk Clerk');