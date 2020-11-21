UPDATE user
SET Role = 'ROLE_ADMIN'
WHERE Email = 'akhmed.sakip@nu.edu.kz';

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber, UserEmail)
VALUES ('Male', 'Akhmed', 'Sakip', '+77776666642', 'akhmed.sakip@nu.edu.kz');

INSERT INTO employee (EmployeeID, EmploymentDate, HotelID)
VALUES ((SELECT PersonID FROM person WHERE UserEmail = 'akhmed.sakip@nu.edu.kz'), CURDATE(), 1);

INSERT INTO administrative_staff (AdministrativeStaffID, AdministrativePosition)
VALUES ((SELECT EmployeeID FROM employee WHERE UserEmail = 'akhmed.sakip@nu.edu.kz'), 'Manager');

SELECT RHP.Privilege
FROM user
INNER JOIN role ON role.Role = user.Role
INNER JOIN role_has_privilege RHP ON RHP.Role = role.Role
WHERE user.Email = 'akhmed.sakip@nu.edu.kz';

SELECT * FROM `user` WHERE Email = 'akhmed.sakip@nu.edu.kz';

SELECT *
FROM `order`
INNER JOIN order_details od on `order`.OrderID = od.OrderID
WHERE IsPayer IS TRUE AND `order`.HotelID = 1;

SELECT O.OrderID, OD.OrderHotelID, H.Name Hotel, RT.Name RoomType, O.CheckInDate, O.CheckOutDate, O.OrderDateTime, O.OrderPrice, OS.Name Status, P.FirstName, P.LastName, P.Gender, P.PhoneNumber FROM order_details OD
                INNER JOIN `order` O on OD.OrderID = o.OrderID and OD.OrderHotelID = o.HotelID
                INNER JOIN room_type RT on OD.RoomTypeHotelID = rt.HotelID and OD.RoomType = rt.Name
                INNER JOIN hotel H on o.HotelID = h.HotelID
                INNER JOIN order_status OS on O.OrderStatus = os.Name
                INNER JOIN person P ON P.PersonID = OD.GuestID
                INNER JOIN employee e ON e.UserEmail = 'akhmed.sakip@nu.edu.kz'
                WHERE O.HotelID = e.HotelID AND OD.IsPayer=TRUE;

UPDATE person P
    INNER JOIN order_details OD ON OD.GuestID = P.PersonID AND OD.IsPayer IS TRUE
    INNER JOIN employee E ON E.HotelID = OD.OrderHotelID
SET FirstName = ?,
    LastName = ?,
    PhoneNumber = ?,
    Gender = ?
WHERE OD.OrderID = ?
  AND E.UserEmail = ?;

SELECT e.EmployeeID, person.FirstName, person.LastName, person.PhoneNumber, e.UserEmail, person.Gender, IT.Name IdentificationTypeName,
       person.IdentificationID, person.DateOfBirth, e.EmploymentDate, e.DismissalDate, IFNULL(AdministrativePosition, CleaningPosition) Position, e.BaseSalaryPerHour
FROM person
INNER JOIN employee e ON person.PersonID = e.EmployeeID
INNER JOIN employee em ON em.UserEmail = 'akhmed.sakip@nu.edu.kz'
LEFT OUTER JOIN identification_type IT ON person.IdentificationTypeID = IT.IdentificationTypeID
LEFT OUTER JOIN administrative_staff `as` ON e.EmployeeID = `as`.AdministrativeStaffID
LEFT OUTER JOIN cleaning_staff cs on e.EmployeeID = cs.CleaningStaffID
WHERE e.HotelID = em.HotelID;

SELECT MAX(ewodow.StartTime) StartTime, MAX(ewodow.EndTime) EndTime
FROM employee e
INNER JOIN employee em ON em.UserEmail = 'akhmed.sakip@nu.edu.kz'
LEFT OUTER JOIN employee_works_on_day_of_week ewodow on e.EmployeeID = ewodow.EmployeeID
WHERE e.HotelID = em.HotelID AND e.EmployeeID = 1 AND ewodow.DayOfWeek = 'Monday' LIMIT 1;

# Checking if ID belongs to a manager
SELECT E.EmployeeID FROM employee E
INNER JOIN employee EM ON EM.UserEmail = 'akhmed.sakip@nu.edu.kz' AND EM.HotelID = E.HotelID
WHERE E.EmployeeID = 1;
# ------
