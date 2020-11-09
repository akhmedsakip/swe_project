-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sweproj
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `sweproj` ;

-- -----------------------------------------------------
-- Schema sweproj
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sweproj` ;
USE `sweproj` ;

-- -----------------------------------------------------
-- Table `sweproj`.`identification_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`identification_type` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`identification_type` (
  `IdentificationTypeID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `CountryCode` VARCHAR(2) NULL,
  PRIMARY KEY (`IdentificationTypeID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`person`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`person` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`person` (
  `PersonID` INT NOT NULL AUTO_INCREMENT,
  `Gender` VARCHAR(10) NOT NULL,
  `IdentificationID` VARCHAR(45) NULL,
  `DateOfBirth` DATE NULL,
  `FirstName` VARCHAR(30) NOT NULL,
  `LastName` VARCHAR(30) NOT NULL,
  `CountryCode` VARCHAR(2) NULL,
  `City` VARCHAR(30) NULL,
  `Street` VARCHAR(45) NULL,
  `ZIPCode` VARCHAR(20) NULL,
  `PhoneNumber` VARCHAR(45) NOT NULL,
  `IdentificationTypeID` INT NULL,
  PRIMARY KEY (`PersonID`),
  INDEX `fk_PERSON_IDENTIFICATIONTYPE1_idx` (`IdentificationTypeID` ASC) VISIBLE,
  UNIQUE INDEX `PhoneNumber_UNIQUE` (`PhoneNumber` ASC) VISIBLE,
  CONSTRAINT `fk_PERSON_IDENTIFICATIONTYPE1`
    FOREIGN KEY (`IdentificationTypeID`)
    REFERENCES `sweproj`.`identification_type` (`IdentificationTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`employee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`employee` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`employee` (
  `EmployeeID` INT NOT NULL,
  `MonthlySalary` INT NULL,
  PRIMARY KEY (`EmployeeID`),
  CONSTRAINT `fk_EMPLOYEE_PERSON1`
    FOREIGN KEY (`EmployeeID`)
    REFERENCES `sweproj`.`person` (`PersonID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`day_of_week`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`day_of_week` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`day_of_week` (
  `Day` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`Day`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`hotel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`hotel` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`hotel` (
  `HotelID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Floors#` INT NULL,
  `Rooms#` INT NULL,
  `FreeRooms#` INT NULL,
  `CountryCode` VARCHAR(2) NOT NULL,
  `City` VARCHAR(30) NOT NULL,
  `Street` VARCHAR(45) NOT NULL,
  `ZIPCode` VARCHAR(20) NOT NULL,
  `Description` TEXT NULL,
  `MainHotelPicture` TEXT NULL,
  `StarCount` INT NULL,
  PRIMARY KEY (`HotelID`),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`hotel_phone_number`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`hotel_phone_number` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`hotel_phone_number` (
  `HotelID` INT NOT NULL,
  `PhoneNumber` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`HotelID`, `PhoneNumber`),
  CONSTRAINT `fk_HOTEL_PhoneNumber_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`hotel` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`season`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`season` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`season` (
  `SeasonID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `StartDate` DATE NOT NULL,
  `EndDate` DATE NOT NULL,
  PRIMARY KEY (`SeasonID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`season_has_day_of_week`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`season_has_day_of_week` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`season_has_day_of_week` (
  `SeasonID` INT NOT NULL,
  `DayOfWeek` VARCHAR(15) NOT NULL,
  `Coefficient` FLOAT NULL DEFAULT 1,
  PRIMARY KEY (`SeasonID`, `DayOfWeek`),
  INDEX `fk_SEASON_has_DAYOFWEEK_DAYOFWEEK1_idx` (`DayOfWeek` ASC) VISIBLE,
  INDEX `fk_SEASON_has_DAYOFWEEK_SEASON1_idx` (`SeasonID` ASC) VISIBLE,
  CONSTRAINT `fk_SEASON_has_DAYOFWEEK_SEASON1`
    FOREIGN KEY (`SeasonID`)
    REFERENCES `sweproj`.`season` (`SeasonID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SEASON_has_DAYOFWEEK_DAYOFWEEK1`
    FOREIGN KEY (`DayOfWeek`)
    REFERENCES `sweproj`.`day_of_week` (`Day`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`holiday`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`holiday` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`holiday` (
  `HolidayID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `CountryCode` VARCHAR(2) NOT NULL,
  `StartDate` DATE NOT NULL,
  `EndDate` DATE NOT NULL,
  `IsEveryYear` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`HolidayID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`hotel_feature`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`hotel_feature` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`hotel_feature` (
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`hotel_has_hotel_feature`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`hotel_has_hotel_feature` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`hotel_has_hotel_feature` (
  `HotelID` INT NOT NULL,
  `HotelFeatureName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`HotelID`, `HotelFeatureName`),
  INDEX `fk_HOTEL_has_HOTELFEATURE_HOTELFEATURE1_idx` (`HotelFeatureName` ASC) VISIBLE,
  INDEX `fk_HOTEL_has_HOTELFEATURE_HOTEL1_idx` (`HotelID` ASC) VISIBLE,
  CONSTRAINT `fk_HOTEL_has_HOTELFEATURE_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`hotel` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HOTEL_has_HOTELFEATURE_HOTELFEATURE1`
    FOREIGN KEY (`HotelFeatureName`)
    REFERENCES `sweproj`.`hotel_feature` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`room_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`room_type` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`room_type` (
  `HotelID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Size` INT NULL,
  `BasePricePerDay` INT NULL,
  `Capacity` INT NULL,
  `Description` TEXT NULL,
  `MainPhoto` TEXT NULL,
  PRIMARY KEY (`HotelID`, `Name`),
  CONSTRAINT `fk_ROOMTYPE_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`hotel` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`room`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`room` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`room` (
  `HotelID` INT NOT NULL,
  `RoomNumber` VARCHAR(10) NOT NULL,
  `Floor#` INT NOT NULL,
  `StayingGuests#` INT NOT NULL,
  `LastCleanDate` DATE NULL,
  `RoomTypeHotelID` INT NOT NULL,
  `RoomTypeName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`HotelID`, `RoomNumber`),
  INDEX `fk_ROOM_ROOMTYPE1_idx` (`RoomTypeHotelID` ASC, `RoomTypeName` ASC) VISIBLE,
  CONSTRAINT `fk_ROOM_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`hotel` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ROOM_ROOMTYPE1`
    FOREIGN KEY (`RoomTypeHotelID` , `RoomTypeName`)
    REFERENCES `sweproj`.`room_type` (`HotelID` , `Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`special_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`special_category` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`special_category` (
  `HotelID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `DiscountCoefficient` INT NOT NULL,
  `EditableByManager` TINYINT NOT NULL,
  PRIMARY KEY (`HotelID`, `Name`),
  CONSTRAINT `fk_SPECIALCATEGORY_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`hotel` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`guest`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`guest` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`guest` (
  `GuestID` INT NOT NULL,
  `SpecialCategoryHotelID` INT NULL,
  INDEX `fk_GUEST_SPECIALCATEGORY1_idx` (`SpecialCategoryHotelID` ASC) VISIBLE,
  PRIMARY KEY (`GuestID`),
  INDEX `fk_GUEST_PERSON1_idx` (`GuestID` ASC) VISIBLE,
  CONSTRAINT `fk_GUEST_SPECIALCATEGORY1`
    FOREIGN KEY (`SpecialCategoryHotelID`)
    REFERENCES `sweproj`.`special_category` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_GUEST_PERSON1`
    FOREIGN KEY (`GuestID`)
    REFERENCES `sweproj`.`person` (`PersonID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`order_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`order_status` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`order_status` (
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`payment_method`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`payment_method` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`payment_method` (
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`user` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`user` (
  `Email` VARCHAR(45) NOT NULL,
  `FirstName` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  `Password` MEDIUMTEXT NOT NULL,
  `DateOfBirth` DATE NOT NULL,
  `Gender` VARCHAR(10) NOT NULL,
  `RegistrationDate` DATETIME NOT NULL,
  PRIMARY KEY (`Email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`order` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`order` (
  `OrderID` INT NOT NULL AUTO_INCREMENT,
  `HotelID` INT NOT NULL,
  `PaymentDateTime` DATETIME NULL,
  `OrderPrice` INT NOT NULL,
  `OrderDateTime` DATETIME NOT NULL,
  `PaidServicesTotal` INT NULL,
  `CheckInDate` DATE NULL,
  `CheckOutDate` DATE NULL,
  `OrderStatus` VARCHAR(45) NOT NULL,
  `PaymentMethod` VARCHAR(45) NOT NULL,
  `UserEmail` VARCHAR(45) NULL,
  PRIMARY KEY (`OrderID`, `HotelID`),
  INDEX `fk_ORDER_ORDERSTATUS1_idx` (`OrderStatus` ASC) VISIBLE,
  INDEX `fk_ORDER_PAYMENTMETHOD1_idx` (`PaymentMethod` ASC) VISIBLE,
  INDEX `fk_order_user1_idx` (`UserEmail` ASC) VISIBLE,
  CONSTRAINT `fk_ORDER_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`hotel` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDER_ORDERSTATUS1`
    FOREIGN KEY (`OrderStatus`)
    REFERENCES `sweproj`.`order_status` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDER_PAYMENTMETHOD1`
    FOREIGN KEY (`PaymentMethod`)
    REFERENCES `sweproj`.`payment_method` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_user1`
    FOREIGN KEY (`UserEmail`)
    REFERENCES `sweproj`.`user` (`Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`room_feature`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`room_feature` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`room_feature` (
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`roomtype_has_room_feature`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`roomtype_has_room_feature` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`roomtype_has_room_feature` (
  `HotelID` INT NOT NULL,
  `RoomType` VARCHAR(45) NOT NULL,
  `RoomFeature` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`HotelID`, `RoomType`, `RoomFeature`),
  INDEX `fk_ROOMTYPE_has_ROOMFEATURE_ROOMFEATURE1_idx` (`RoomFeature` ASC) VISIBLE,
  INDEX `fk_ROOMTYPE_has_ROOMFEATURE_ROOMTYPE1_idx` (`HotelID` ASC, `RoomType` ASC) VISIBLE,
  CONSTRAINT `fk_ROOMTYPE_has_ROOMFEATURE_ROOMTYPE1`
    FOREIGN KEY (`HotelID` , `RoomType`)
    REFERENCES `sweproj`.`room_type` (`HotelID` , `Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ROOMTYPE_has_ROOMFEATURE_ROOMFEATURE1`
    FOREIGN KEY (`RoomFeature`)
    REFERENCES `sweproj`.`room_feature` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`employee_works_on_day_of_week`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`employee_works_on_day_of_week` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`employee_works_on_day_of_week` (
  `EmployeeID` INT NOT NULL,
  `DayOfWeek` VARCHAR(15) NOT NULL,
  `StartTime` TIME NOT NULL,
  `EndTime` TIME NOT NULL,
  PRIMARY KEY (`EmployeeID`, `DayOfWeek`),
  INDEX `fk_EMPLOYEE_has_DAYOFWEEK_DAYOFWEEK1_idx` (`DayOfWeek` ASC) VISIBLE,
  INDEX `fk_EMPLOYEE_has_DAYOFWEEK_EMPLOYEE1_idx` (`EmployeeID` ASC) VISIBLE,
  CONSTRAINT `fk_EMPLOYEE_has_DAYOFWEEK_EMPLOYEE1`
    FOREIGN KEY (`EmployeeID`)
    REFERENCES `sweproj`.`employee` (`EmployeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EMPLOYEE_has_DAYOFWEEK_DAYOFWEEK1`
    FOREIGN KEY (`DayOfWeek`)
    REFERENCES `sweproj`.`day_of_week` (`Day`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`employee_works_at_hotel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`employee_works_at_hotel` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`employee_works_at_hotel` (
  `EmployeeID` INT NOT NULL,
  `HotelID` INT NOT NULL,
  `EmploymentDate` DATE NOT NULL,
  `DismissalDate` DATE NULL,
  PRIMARY KEY (`EmployeeID`, `HotelID`),
  INDEX `fk_EMPLOYEE_has_HOTEL_HOTEL1_idx` (`HotelID` ASC) VISIBLE,
  INDEX `fk_EMPLOYEE_has_HOTEL_EMPLOYEE1_idx` (`EmployeeID` ASC) VISIBLE,
  CONSTRAINT `fk_EMPLOYEE_has_HOTEL_EMPLOYEE1`
    FOREIGN KEY (`EmployeeID`)
    REFERENCES `sweproj`.`employee` (`EmployeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EMPLOYEE_has_HOTEL_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`hotel` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`administrative_position`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`administrative_position` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`administrative_position` (
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`administrative_staff`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`administrative_staff` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`administrative_staff` (
  `AdministrativeStaffID` INT NOT NULL,
  `AdministrativePosition` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`AdministrativeStaffID`),
  INDEX `fk_ADMINISTRATIVESTAFF_ADMINISTRATIVEPOSITION1_idx` (`AdministrativePosition` ASC) VISIBLE,
  CONSTRAINT `fk_ADMINISTRATIVESTAFF_EMPLOYEE1`
    FOREIGN KEY (`AdministrativeStaffID`)
    REFERENCES `sweproj`.`employee` (`EmployeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ADMINISTRATIVESTAFF_ADMINISTRATIVEPOSITION1`
    FOREIGN KEY (`AdministrativePosition`)
    REFERENCES `sweproj`.`administrative_position` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`cleaning_position`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`cleaning_position` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`cleaning_position` (
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`cleaning_staff`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`cleaning_staff` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`cleaning_staff` (
  `CleaningStaffID` INT NOT NULL,
  `CleaningPosition` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`CleaningStaffID`),
  INDEX `fk_CLEANINGSTAFF_CLEANINGPOSITION1_idx` (`CleaningPosition` ASC) VISIBLE,
  CONSTRAINT `fk_CLEANINGSTAFF_EMPLOYEE1`
    FOREIGN KEY (`CleaningStaffID`)
    REFERENCES `sweproj`.`employee` (`EmployeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CLEANINGSTAFF_CLEANINGPOSITION1`
    FOREIGN KEY (`CleaningPosition`)
    REFERENCES `sweproj`.`cleaning_position` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`cleaning_staff_cleans_room`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`cleaning_staff_cleans_room` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`cleaning_staff_cleans_room` (
  `CleaningStaffID` INT NOT NULL,
  `HotelID` INT NOT NULL,
  `RoomNumber` VARCHAR(10) NOT NULL,
  `Date` DATE NOT NULL,
  PRIMARY KEY (`CleaningStaffID`, `HotelID`, `RoomNumber`),
  INDEX `fk_CLEANINGSTAFF_has_ROOM_ROOM1_idx` (`HotelID` ASC, `RoomNumber` ASC) VISIBLE,
  INDEX `fk_CLEANINGSTAFF_has_ROOM_CLEANINGSTAFF1_idx` (`CleaningStaffID` ASC) VISIBLE,
  CONSTRAINT `fk_CLEANINGSTAFF_has_ROOM_CLEANINGSTAFF1`
    FOREIGN KEY (`CleaningStaffID`)
    REFERENCES `sweproj`.`cleaning_staff` (`CleaningStaffID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CLEANINGSTAFF_has_ROOM_ROOM1`
    FOREIGN KEY (`HotelID` , `RoomNumber`)
    REFERENCES `sweproj`.`room` (`HotelID` , `RoomNumber`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`order_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`order_details` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`order_details` (
  `IsPayer` TINYINT NOT NULL,
  `OrderID` INT NOT NULL,
  `OrderHotelID` INT NOT NULL,
  `RoomTypeHotelID` INT NOT NULL,
  `RoomType` VARCHAR(45) NOT NULL,
  `RoomHotelID` INT NOT NULL,
  `RoomNumber` VARCHAR(10) NOT NULL,
  `GuestID` INT NOT NULL,
  PRIMARY KEY (`OrderID`, `OrderHotelID`, `RoomTypeHotelID`, `RoomType`, `RoomHotelID`, `RoomNumber`, `GuestID`),
  INDEX `fk_ORDERDETAILS_ORDER1_idx` (`OrderID` ASC, `OrderHotelID` ASC) VISIBLE,
  INDEX `fk_ORDERDETAILS_ROOMTYPE1_idx` (`RoomTypeHotelID` ASC, `RoomType` ASC) VISIBLE,
  INDEX `fk_ORDERDETAILS_ROOM1_idx` (`RoomHotelID` ASC, `RoomNumber` ASC) VISIBLE,
  INDEX `fk_ORDERDETAILS_GUEST1_idx` (`GuestID` ASC) VISIBLE,
  CONSTRAINT `fk_ORDERDETAILS_ORDER1`
    FOREIGN KEY (`OrderID` , `OrderHotelID`)
    REFERENCES `sweproj`.`order` (`OrderID` , `HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDERDETAILS_ROOMTYPE1`
    FOREIGN KEY (`RoomTypeHotelID` , `RoomType`)
    REFERENCES `sweproj`.`room_type` (`HotelID` , `Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDERDETAILS_ROOM1`
    FOREIGN KEY (`RoomHotelID` , `RoomNumber`)
    REFERENCES `sweproj`.`room` (`HotelID` , `RoomNumber`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDERDETAILS_GUEST1`
    FOREIGN KEY (`GuestID`)
    REFERENCES `sweproj`.`guest` (`GuestID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`service_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`service_type` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`service_type` (
  `HotelID` INT NOT NULL,
  `ServiceName` VARCHAR(45) NOT NULL,
  `Price` INT NULL,
  `IsPersonal` TINYINT NOT NULL,
  PRIMARY KEY (`HotelID`, `ServiceName`),
  CONSTRAINT `fk_SERVICETYPE_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`hotel` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`service`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`service` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`service` (
  `ServiceID` INT NOT NULL AUTO_INCREMENT,
  `HotelID` INT NOT NULL,
  `OrderID` INT NOT NULL,
  `ServiceDate` DATE NOT NULL,
  `ServiceTypeHotelID` INT NOT NULL,
  `ServiceType` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ServiceID`, `HotelID`, `OrderID`),
  INDEX `fk_SERVICE_SERVICETYPE1_idx` (`ServiceTypeHotelID` ASC, `ServiceType` ASC) VISIBLE,
  CONSTRAINT `fk_SERVICE_ORDER1`
    FOREIGN KEY (`HotelID` , `OrderID`)
    REFERENCES `sweproj`.`order` (`HotelID` , `OrderID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SERVICE_SERVICETYPE1`
    FOREIGN KEY (`ServiceTypeHotelID` , `ServiceType`)
    REFERENCES `sweproj`.`service_type` (`HotelID` , `ServiceName`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`service_made_for_guest`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`service_made_for_guest` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`service_made_for_guest` (
  `HotelID` INT NOT NULL,
  `OrderID` INT NOT NULL,
  `ServiceID` INT NOT NULL,
  `GuestID` INT NOT NULL,
  PRIMARY KEY (`HotelID`, `OrderID`, `ServiceID`, `GuestID`),
  INDEX `fk_SERVICE_has_GUEST_SERVICE1_idx` (`HotelID` ASC, `OrderID` ASC, `ServiceID` ASC) VISIBLE,
  INDEX `fk_SERVICE_made for_GUEST_GUEST1_idx` (`GuestID` ASC) VISIBLE,
  CONSTRAINT `fk_SERVICE_has_GUEST_SERVICE1`
    FOREIGN KEY (`HotelID` , `OrderID` , `ServiceID`)
    REFERENCES `sweproj`.`service` (`HotelID` , `OrderID` , `ServiceID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SERVICE_made for_GUEST_GUEST1`
    FOREIGN KEY (`GuestID`)
    REFERENCES `sweproj`.`guest` (`GuestID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`service_made_for_room`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`service_made_for_room` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`service_made_for_room` (
  `ServiceID` INT NOT NULL,
  `ServiceHotelID` INT NOT NULL,
  `OrderID` INT NOT NULL,
  `RoomHotelID` INT NOT NULL,
  `RoomNumber` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`ServiceID`, `ServiceHotelID`, `OrderID`, `RoomHotelID`, `RoomNumber`),
  INDEX `fk_SERVICE_made for_ROOM_SERVICE1_idx` (`ServiceID` ASC, `ServiceHotelID` ASC, `OrderID` ASC) VISIBLE,
  INDEX `fk_SERVICE_made for_ROOM_ROOM1_idx` (`RoomHotelID` ASC, `RoomNumber` ASC) VISIBLE,
  CONSTRAINT `fk_SERVICE_made for_ROOM_SERVICE1`
    FOREIGN KEY (`ServiceID` , `ServiceHotelID` , `OrderID`)
    REFERENCES `sweproj`.`service` (`ServiceID` , `HotelID` , `OrderID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SERVICE_made for_ROOM_ROOM1`
    FOREIGN KEY (`RoomHotelID` , `RoomNumber`)
    REFERENCES `sweproj`.`room` (`HotelID` , `RoomNumber`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`hotel_works_during_season`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`hotel_works_during_season` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`hotel_works_during_season` (
  `HotelID` INT NOT NULL,
  `SeasonID` INT NOT NULL,
  PRIMARY KEY (`HotelID`, `SeasonID`),
  INDEX `fk_HOTEL_has_SEASON_SEASON1_idx` (`SeasonID` ASC) VISIBLE,
  INDEX `fk_HOTEL_has_SEASON_HOTEL1_idx` (`HotelID` ASC) VISIBLE,
  CONSTRAINT `fk_HOTEL_has_SEASON_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`hotel` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HOTEL_has_SEASON_SEASON1`
    FOREIGN KEY (`SeasonID`)
    REFERENCES `sweproj`.`season` (`SeasonID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`employee_supervises_employee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`employee_supervises_employee` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`employee_supervises_employee` (
  `SupervisorID` INT NOT NULL,
  `SupervisedID` INT NOT NULL,
  PRIMARY KEY (`SupervisorID`, `SupervisedID`),
  INDEX `fk_EMPLOYEE_has_EMPLOYEE_EMPLOYEE2_idx` (`SupervisedID` ASC) VISIBLE,
  INDEX `fk_EMPLOYEE_has_EMPLOYEE_EMPLOYEE1_idx` (`SupervisorID` ASC) VISIBLE,
  CONSTRAINT `fk_EMPLOYEE_has_EMPLOYEE_EMPLOYEE1`
    FOREIGN KEY (`SupervisorID`)
    REFERENCES `sweproj`.`employee` (`EmployeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EMPLOYEE_has_EMPLOYEE_EMPLOYEE2`
    FOREIGN KEY (`SupervisedID`)
    REFERENCES `sweproj`.`employee` (`EmployeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`hotel_works_during_holiday`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`hotel_works_during_holiday` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`hotel_works_during_holiday` (
  `HotelID` INT NOT NULL,
  `HolidayID` INT NOT NULL,
  `Coefficient` FLOAT NULL DEFAULT 1,
  PRIMARY KEY (`HotelID`, `HolidayID`),
  INDEX `fk_HOTEL_has_HOLIDAY_HOLIDAY1_idx` (`HolidayID` ASC) VISIBLE,
  INDEX `fk_HOTEL_has_HOLIDAY_HOTEL1_idx` (`HotelID` ASC) VISIBLE,
  CONSTRAINT `fk_HOTEL_has_HOLIDAY_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`hotel` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HOTEL_has_HOLIDAY_HOLIDAY1`
    FOREIGN KEY (`HolidayID`)
    REFERENCES `sweproj`.`holiday` (`HolidayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
