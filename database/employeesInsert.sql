UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'akhmed.sakip@nu.edu.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber, UserEmail)
VALUES ('Male', 'Akhmed', 'Sakip', '+77776666642', 'akhmed.sakip@nu.edu.kz');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE UserEmail = 'akhmed.sakip@nu.edu.kz'), CURDATE(), 1);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT PersonID FROM person WHERE UserEmail = 'akhmed.sakip@nu.edu.kz'), 'Manager');

SELECT RHP.Privilege
FROM user
INNER JOIN role ON role.Role = user.Role
INNER JOIN role_has_privilege RHP ON RHP.Role = role.Role
WHERE user.Email = 'akhmed.sakip@nu.edu.kz';

SELECT * FROM `user` WHERE Email = 'akhmed.sakip@nu.edu.kz';

