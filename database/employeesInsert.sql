UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'watson@gmail.com';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Madi', 'Karsybekov', '+77776666642');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+77776666642'), CURDATE(), 1, 'watson@gmail.com');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'watson@gmail.com'), 'Manager');

SELECT RHP.Privilege
FROM user
INNER JOIN role ON role.Role = user.Role
INNER JOIN role_has_privilege RHP ON RHP.Role = role.Role
WHERE user.Email = 'watson@gmail.com';

SELECT * FROM `user` WHERE Email = 'watson@gmail.com';

UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'a.a@nu.edu.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'a', 'a', '+70000000000');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID, UserEmail)
VALUES ((SELECT PersonID FROM person WHERE PhoneNumber = '+70000000000'), CURDATE(), 1, 'a@a.a');

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'a@a.a'), 'Desk Clerk');