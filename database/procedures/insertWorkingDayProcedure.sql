DROP PROCEDURE IF EXISTS insertWorkingDay;

CREATE PROCEDURE insertWorkingDay(IN _employeeId INT, IN _userEmail VARCHAR(45), IN _dayOfWeek VARCHAR(15),
                                  IN _startTime TIME,
                                  IN _endTime TIME)
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
    end if;

    IF _endTime <= _startTime THEN
        SIGNAL SQLSTATE '42000' SET MESSAGE_TEXT = 'End time should be later than start time';
    end if;


    INSERT INTO employee_works_on_day_of_week
        (EmployeeID, DayOfWeek, StartTime, EndTime)
    VALUES (_employeeId, _dayOfWeek, _startTime, _endTime)
    ON DUPLICATE KEY UPDATE EmployeeID = _employeeId,
                            DayOfWeek  = _dayOfWeek,
                            StartTime  = _startTime,
                            EndTime    = _endTime;

    COMMIT;
END;

CALL insertWorkingDay(5, 'akhmed.sakip@nu.edu.kz', 'Monday', '15:00',
    '18:00');