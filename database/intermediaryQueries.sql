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