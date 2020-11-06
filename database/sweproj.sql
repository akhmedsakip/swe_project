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
-- Table `sweproj`.`IDENTIFICATIONTYPE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`IDENTIFICATIONTYPE` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`IDENTIFICATIONTYPE` (
  `IdentificationTypeID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `CountryCode` VARCHAR(2) NULL,
  PRIMARY KEY (`IdentificationTypeID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`PERSON`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`PERSON` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`PERSON` (
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
    REFERENCES `sweproj`.`IDENTIFICATIONTYPE` (`IdentificationTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`EMPLOYEE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`EMPLOYEE` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`EMPLOYEE` (
  `EmployeeID` INT NOT NULL,
  `MonthlySalary` INT NULL,
  PRIMARY KEY (`EmployeeID`),
  CONSTRAINT `fk_EMPLOYEE_PERSON1`
    FOREIGN KEY (`EmployeeID`)
    REFERENCES `sweproj`.`PERSON` (`PersonID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`DAYOFWEEK`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`DAYOFWEEK` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`DAYOFWEEK` (
  `Day` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`Day`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`HOTEL`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`HOTEL` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`HOTEL` (
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
-- Table `sweproj`.`HOTEL_PhoneNumber`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`HOTEL_PhoneNumber` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`HOTEL_PhoneNumber` (
  `HotelID` INT NOT NULL,
  `PhoneNumber` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`HotelID`, `PhoneNumber`),
  CONSTRAINT `fk_HOTEL_PhoneNumber_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`HOTEL` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`SEASON`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`SEASON` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`SEASON` (
  `SeasonID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `StartDate` DATE NOT NULL,
  `EndDate` DATE NOT NULL,
  PRIMARY KEY (`SeasonID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`SEASON_has_DAYOFWEEK`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`SEASON_has_DAYOFWEEK` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`SEASON_has_DAYOFWEEK` (
  `SeasonID` INT NOT NULL,
  `DayOfWeek` VARCHAR(15) NOT NULL,
  `Coefficient` INT NOT NULL,
  PRIMARY KEY (`SeasonID`, `DayOfWeek`),
  INDEX `fk_SEASON_has_DAYOFWEEK_DAYOFWEEK1_idx` (`DayOfWeek` ASC) VISIBLE,
  INDEX `fk_SEASON_has_DAYOFWEEK_SEASON1_idx` (`SeasonID` ASC) VISIBLE,
  CONSTRAINT `fk_SEASON_has_DAYOFWEEK_SEASON1`
    FOREIGN KEY (`SeasonID`)
    REFERENCES `sweproj`.`SEASON` (`SeasonID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SEASON_has_DAYOFWEEK_DAYOFWEEK1`
    FOREIGN KEY (`DayOfWeek`)
    REFERENCES `sweproj`.`DAYOFWEEK` (`Day`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`HOLIDAY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`HOLIDAY` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`HOLIDAY` (
  `HolidayID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `CountryCode` VARCHAR(2) NULL,
  `Year` YEAR NULL,
  `StartDate` DATE NOT NULL,
  `EndDate` DATE NOT NULL,
  PRIMARY KEY (`HolidayID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`HOTELFEATURE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`HOTELFEATURE` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`HOTELFEATURE` (
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`HOTEL_has_HOTELFEATURE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`HOTEL_has_HOTELFEATURE` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`HOTEL_has_HOTELFEATURE` (
  `HotelID` INT NOT NULL,
  `HotelFeatureName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`HotelID`, `HotelFeatureName`),
  INDEX `fk_HOTEL_has_HOTELFEATURE_HOTELFEATURE1_idx` (`HotelFeatureName` ASC) VISIBLE,
  INDEX `fk_HOTEL_has_HOTELFEATURE_HOTEL1_idx` (`HotelID` ASC) VISIBLE,
  CONSTRAINT `fk_HOTEL_has_HOTELFEATURE_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`HOTEL` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HOTEL_has_HOTELFEATURE_HOTELFEATURE1`
    FOREIGN KEY (`HotelFeatureName`)
    REFERENCES `sweproj`.`HOTELFEATURE` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`ROOMTYPE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`ROOMTYPE` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`ROOMTYPE` (
  `HotelID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Size` INT NULL,
  `BasePricePerDay` INT NULL,
  `ActualPricePerDay` INT NULL,
  `Capacity` INT NULL,
  `Description` TEXT NULL,
  `MainPhoto` TEXT NULL,
  PRIMARY KEY (`HotelID`, `Name`),
  CONSTRAINT `fk_ROOMTYPE_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`HOTEL` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`ROOM`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`ROOM` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`ROOM` (
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
    REFERENCES `sweproj`.`HOTEL` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ROOM_ROOMTYPE1`
    FOREIGN KEY (`RoomTypeHotelID` , `RoomTypeName`)
    REFERENCES `sweproj`.`ROOMTYPE` (`HotelID` , `Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`SPECIALCATEGORY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`SPECIALCATEGORY` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`SPECIALCATEGORY` (
  `HotelID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `DiscountCoefficient` INT NOT NULL,
  `EditableByManager` TINYINT NOT NULL,
  PRIMARY KEY (`HotelID`, `Name`),
  CONSTRAINT `fk_SPECIALCATEGORY_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`HOTEL` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`GUEST`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`GUEST` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`GUEST` (
  `GuestID` INT NOT NULL,
  `SpecialCategoryHotelID` INT NULL,
  INDEX `fk_GUEST_SPECIALCATEGORY1_idx` (`SpecialCategoryHotelID` ASC) VISIBLE,
  PRIMARY KEY (`GuestID`),
  INDEX `fk_GUEST_PERSON1_idx` (`GuestID` ASC) VISIBLE,
  CONSTRAINT `fk_GUEST_SPECIALCATEGORY1`
    FOREIGN KEY (`SpecialCategoryHotelID`)
    REFERENCES `sweproj`.`SPECIALCATEGORY` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_GUEST_PERSON1`
    FOREIGN KEY (`GuestID`)
    REFERENCES `sweproj`.`PERSON` (`PersonID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`ORDERSTATUS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`ORDERSTATUS` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`ORDERSTATUS` (
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`PAYMENTMETHOD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`PAYMENTMETHOD` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`PAYMENTMETHOD` (
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`ORDER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`ORDER` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`ORDER` (
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
  PRIMARY KEY (`OrderID`, `HotelID`),
  INDEX `fk_ORDER_ORDERSTATUS1_idx` (`OrderStatus` ASC) VISIBLE,
  INDEX `fk_ORDER_PAYMENTMETHOD1_idx` (`PaymentMethod` ASC) VISIBLE,
  CONSTRAINT `fk_ORDER_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`HOTEL` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDER_ORDERSTATUS1`
    FOREIGN KEY (`OrderStatus`)
    REFERENCES `sweproj`.`ORDERSTATUS` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDER_PAYMENTMETHOD1`
    FOREIGN KEY (`PaymentMethod`)
    REFERENCES `sweproj`.`PAYMENTMETHOD` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`ROOMFEATURE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`ROOMFEATURE` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`ROOMFEATURE` (
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`ROOMTYPE_has_ROOMFEATURE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`ROOMTYPE_has_ROOMFEATURE` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`ROOMTYPE_has_ROOMFEATURE` (
  `HotelID` INT NOT NULL,
  `RoomType` VARCHAR(45) NOT NULL,
  `RoomFeature` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`HotelID`, `RoomType`, `RoomFeature`),
  INDEX `fk_ROOMTYPE_has_ROOMFEATURE_ROOMFEATURE1_idx` (`RoomFeature` ASC) VISIBLE,
  INDEX `fk_ROOMTYPE_has_ROOMFEATURE_ROOMTYPE1_idx` (`HotelID` ASC, `RoomType` ASC) VISIBLE,
  CONSTRAINT `fk_ROOMTYPE_has_ROOMFEATURE_ROOMTYPE1`
    FOREIGN KEY (`HotelID` , `RoomType`)
    REFERENCES `sweproj`.`ROOMTYPE` (`HotelID` , `Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ROOMTYPE_has_ROOMFEATURE_ROOMFEATURE1`
    FOREIGN KEY (`RoomFeature`)
    REFERENCES `sweproj`.`ROOMFEATURE` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`EMPLOYEE_works on_DAYOFWEEK`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`EMPLOYEE_works on_DAYOFWEEK` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`EMPLOYEE_works on_DAYOFWEEK` (
  `EmployeeID` INT NOT NULL,
  `DayOfWeek` VARCHAR(15) NOT NULL,
  `StartTime` TIME NOT NULL,
  `EndTime` TIME NOT NULL,
  PRIMARY KEY (`EmployeeID`, `DayOfWeek`),
  INDEX `fk_EMPLOYEE_has_DAYOFWEEK_DAYOFWEEK1_idx` (`DayOfWeek` ASC) VISIBLE,
  INDEX `fk_EMPLOYEE_has_DAYOFWEEK_EMPLOYEE1_idx` (`EmployeeID` ASC) VISIBLE,
  CONSTRAINT `fk_EMPLOYEE_has_DAYOFWEEK_EMPLOYEE1`
    FOREIGN KEY (`EmployeeID`)
    REFERENCES `sweproj`.`EMPLOYEE` (`EmployeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EMPLOYEE_has_DAYOFWEEK_DAYOFWEEK1`
    FOREIGN KEY (`DayOfWeek`)
    REFERENCES `sweproj`.`DAYOFWEEK` (`Day`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`EMPLOYEE_works at_HOTEL`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`EMPLOYEE_works at_HOTEL` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`EMPLOYEE_works at_HOTEL` (
  `EmployeeID` INT NOT NULL,
  `HotelID` INT NOT NULL,
  `EmploymentDate` DATE NOT NULL,
  `DismissalDate` DATE NULL,
  PRIMARY KEY (`EmployeeID`, `HotelID`),
  INDEX `fk_EMPLOYEE_has_HOTEL_HOTEL1_idx` (`HotelID` ASC) VISIBLE,
  INDEX `fk_EMPLOYEE_has_HOTEL_EMPLOYEE1_idx` (`EmployeeID` ASC) VISIBLE,
  CONSTRAINT `fk_EMPLOYEE_has_HOTEL_EMPLOYEE1`
    FOREIGN KEY (`EmployeeID`)
    REFERENCES `sweproj`.`EMPLOYEE` (`EmployeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EMPLOYEE_has_HOTEL_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`HOTEL` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`ADMINISTRATIVEPOSITION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`ADMINISTRATIVEPOSITION` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`ADMINISTRATIVEPOSITION` (
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`ADMINISTRATIVESTAFF`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`ADMINISTRATIVESTAFF` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`ADMINISTRATIVESTAFF` (
  `AdministrativeStaffID` INT NOT NULL,
  `AdministrativePosition` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`AdministrativeStaffID`),
  INDEX `fk_ADMINISTRATIVESTAFF_ADMINISTRATIVEPOSITION1_idx` (`AdministrativePosition` ASC) VISIBLE,
  CONSTRAINT `fk_ADMINISTRATIVESTAFF_EMPLOYEE1`
    FOREIGN KEY (`AdministrativeStaffID`)
    REFERENCES `sweproj`.`EMPLOYEE` (`EmployeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ADMINISTRATIVESTAFF_ADMINISTRATIVEPOSITION1`
    FOREIGN KEY (`AdministrativePosition`)
    REFERENCES `sweproj`.`ADMINISTRATIVEPOSITION` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`CLEANINGPOSITION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`CLEANINGPOSITION` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`CLEANINGPOSITION` (
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`CLEANINGSTAFF`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`CLEANINGSTAFF` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`CLEANINGSTAFF` (
  `CleaningStaffID` INT NOT NULL,
  `CleaningPosition` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`CleaningStaffID`),
  INDEX `fk_CLEANINGSTAFF_CLEANINGPOSITION1_idx` (`CleaningPosition` ASC) VISIBLE,
  CONSTRAINT `fk_CLEANINGSTAFF_EMPLOYEE1`
    FOREIGN KEY (`CleaningStaffID`)
    REFERENCES `sweproj`.`EMPLOYEE` (`EmployeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CLEANINGSTAFF_CLEANINGPOSITION1`
    FOREIGN KEY (`CleaningPosition`)
    REFERENCES `sweproj`.`CLEANINGPOSITION` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`CLEANINGSTAFF_cleans_ROOM`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`CLEANINGSTAFF_cleans_ROOM` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`CLEANINGSTAFF_cleans_ROOM` (
  `CleaningStaffID` INT NOT NULL,
  `HotelID` INT NOT NULL,
  `RoomNumber` VARCHAR(10) NOT NULL,
  `Date` DATE NOT NULL,
  PRIMARY KEY (`CleaningStaffID`, `HotelID`, `RoomNumber`),
  INDEX `fk_CLEANINGSTAFF_has_ROOM_ROOM1_idx` (`HotelID` ASC, `RoomNumber` ASC) VISIBLE,
  INDEX `fk_CLEANINGSTAFF_has_ROOM_CLEANINGSTAFF1_idx` (`CleaningStaffID` ASC) VISIBLE,
  CONSTRAINT `fk_CLEANINGSTAFF_has_ROOM_CLEANINGSTAFF1`
    FOREIGN KEY (`CleaningStaffID`)
    REFERENCES `sweproj`.`CLEANINGSTAFF` (`CleaningStaffID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CLEANINGSTAFF_has_ROOM_ROOM1`
    FOREIGN KEY (`HotelID` , `RoomNumber`)
    REFERENCES `sweproj`.`ROOM` (`HotelID` , `RoomNumber`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`ORDERDETAILS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`ORDERDETAILS` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`ORDERDETAILS` (
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
    REFERENCES `sweproj`.`ORDER` (`OrderID` , `HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDERDETAILS_ROOMTYPE1`
    FOREIGN KEY (`RoomTypeHotelID` , `RoomType`)
    REFERENCES `sweproj`.`ROOMTYPE` (`HotelID` , `Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDERDETAILS_ROOM1`
    FOREIGN KEY (`RoomHotelID` , `RoomNumber`)
    REFERENCES `sweproj`.`ROOM` (`HotelID` , `RoomNumber`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDERDETAILS_GUEST1`
    FOREIGN KEY (`GuestID`)
    REFERENCES `sweproj`.`GUEST` (`GuestID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`SERVICETYPE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`SERVICETYPE` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`SERVICETYPE` (
  `HotelID` INT NOT NULL,
  `ServiceName` VARCHAR(45) NOT NULL,
  `Price` INT NULL,
  `IsPersonal` TINYINT NOT NULL,
  PRIMARY KEY (`HotelID`, `ServiceName`),
  CONSTRAINT `fk_SERVICETYPE_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`HOTEL` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`SERVICE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`SERVICE` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`SERVICE` (
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
    REFERENCES `sweproj`.`ORDER` (`HotelID` , `OrderID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SERVICE_SERVICETYPE1`
    FOREIGN KEY (`ServiceTypeHotelID` , `ServiceType`)
    REFERENCES `sweproj`.`SERVICETYPE` (`HotelID` , `ServiceName`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`SERVICE_made for_GUEST`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`SERVICE_made for_GUEST` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`SERVICE_made for_GUEST` (
  `HotelID` INT NOT NULL,
  `OrderID` INT NOT NULL,
  `ServiceID` INT NOT NULL,
  `GuestID` INT NOT NULL,
  PRIMARY KEY (`HotelID`, `OrderID`, `ServiceID`, `GuestID`),
  INDEX `fk_SERVICE_has_GUEST_SERVICE1_idx` (`HotelID` ASC, `OrderID` ASC, `ServiceID` ASC) VISIBLE,
  INDEX `fk_SERVICE_made for_GUEST_GUEST1_idx` (`GuestID` ASC) VISIBLE,
  CONSTRAINT `fk_SERVICE_has_GUEST_SERVICE1`
    FOREIGN KEY (`HotelID` , `OrderID` , `ServiceID`)
    REFERENCES `sweproj`.`SERVICE` (`HotelID` , `OrderID` , `ServiceID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SERVICE_made for_GUEST_GUEST1`
    FOREIGN KEY (`GuestID`)
    REFERENCES `sweproj`.`GUEST` (`GuestID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`SERVICE_made for_ROOM`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`SERVICE_made for_ROOM` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`SERVICE_made for_ROOM` (
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
    REFERENCES `sweproj`.`SERVICE` (`ServiceID` , `HotelID` , `OrderID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SERVICE_made for_ROOM_ROOM1`
    FOREIGN KEY (`RoomHotelID` , `RoomNumber`)
    REFERENCES `sweproj`.`ROOM` (`HotelID` , `RoomNumber`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`HOTEL_works during_SEASON`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`HOTEL_works during_SEASON` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`HOTEL_works during_SEASON` (
  `HotelID` INT NOT NULL,
  `SeasonID` INT NOT NULL,
  PRIMARY KEY (`HotelID`, `SeasonID`),
  INDEX `fk_HOTEL_has_SEASON_SEASON1_idx` (`SeasonID` ASC) VISIBLE,
  INDEX `fk_HOTEL_has_SEASON_HOTEL1_idx` (`HotelID` ASC) VISIBLE,
  CONSTRAINT `fk_HOTEL_has_SEASON_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`HOTEL` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HOTEL_has_SEASON_SEASON1`
    FOREIGN KEY (`SeasonID`)
    REFERENCES `sweproj`.`SEASON` (`SeasonID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`EMPLOYEE_supervises_EMPLOYEE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`EMPLOYEE_supervises_EMPLOYEE` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`EMPLOYEE_supervises_EMPLOYEE` (
  `SupervisorID` INT NOT NULL,
  `SupervisedID` INT NOT NULL,
  PRIMARY KEY (`SupervisorID`, `SupervisedID`),
  INDEX `fk_EMPLOYEE_has_EMPLOYEE_EMPLOYEE2_idx` (`SupervisedID` ASC) VISIBLE,
  INDEX `fk_EMPLOYEE_has_EMPLOYEE_EMPLOYEE1_idx` (`SupervisorID` ASC) VISIBLE,
  CONSTRAINT `fk_EMPLOYEE_has_EMPLOYEE_EMPLOYEE1`
    FOREIGN KEY (`SupervisorID`)
    REFERENCES `sweproj`.`EMPLOYEE` (`EmployeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EMPLOYEE_has_EMPLOYEE_EMPLOYEE2`
    FOREIGN KEY (`SupervisedID`)
    REFERENCES `sweproj`.`EMPLOYEE` (`EmployeeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`SEASON_has_HOLIDAY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`SEASON_has_HOLIDAY` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`SEASON_has_HOLIDAY` (
  `SeasonID` INT NOT NULL,
  `HolidayID` INT NOT NULL,
  `Coefficient` INT NOT NULL,
  PRIMARY KEY (`SeasonID`, `HolidayID`),
  INDEX `fk_SEASON_has_HOLIDAY_HOLIDAY1_idx` (`HolidayID` ASC) VISIBLE,
  INDEX `fk_SEASON_has_HOLIDAY_SEASON1_idx` (`SeasonID` ASC) VISIBLE,
  CONSTRAINT `fk_SEASON_has_HOLIDAY_SEASON1`
    FOREIGN KEY (`SeasonID`)
    REFERENCES `sweproj`.`SEASON` (`SeasonID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SEASON_has_HOLIDAY_HOLIDAY1`
    FOREIGN KEY (`HolidayID`)
    REFERENCES `sweproj`.`HOLIDAY` (`HolidayID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`USERS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`USERS` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`USERS` (
  `Email` VARCHAR(45) NOT NULL,
  `FirstName` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  `Password` MEDIUMTEXT NOT NULL,
  `DateOfBirth` DATE NOT NULL,
  `Gender` VARCHAR(10) NOT NULL,
  `RegistrationDate` DATETIME NOT NULL,
  PRIMARY KEY (`Email`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
