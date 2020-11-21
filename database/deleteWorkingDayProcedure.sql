DROP PROCEDURE IF EXISTS deleteWorkingDay;

CREATE PROCEDURE deleteWorkingDay(IN _employeeId INT, IN _userEmail VARCHAR(45), IN _dayOfWeek VARCHAR(15))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
        BEGIN
            ROLLBACK;
            RESIGNAL;
        END;

    START TRANSACTION;
    SELECT MAX(E.EmployeeID)
    INTO _employeeId
    FROM employee E
             INNER JOIN employee EM ON EM.UserEmail = _userEmail AND EM.HotelID = E.HotelID
    WHERE E.EmployeeID = _employeeId;

    IF _employeeId IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Access error, trying to edit someone from another hotel';
    END IF;


    DELETE
    FROM employee_works_on_day_of_week
    WHERE EmployeeID = _employeeId
      AND DayOfWeek = _dayOfWeek;
    COMMIT;
END;

CALL deleteWorkingDay(5, 'akhmed.sakip@nu.edu.kz', 'Tuesday');