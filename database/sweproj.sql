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
-- Table `sweproj`.`Hotels`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`Hotels` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`Hotels` (
  `HotelID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `NumberOfFloors` INT NULL,
  `NumberOfRooms` INT NULL,
  `NumberOfFreeRooms` INT NULL,
  `Country` VARCHAR(45) NULL,
  `City` VARCHAR(45) NULL,
  `Street` VARCHAR(45) NULL,
  `ZIPCode` VARCHAR(45) NULL,
  `MainHotelPicture` TEXT NULL,
  `Description` TEXT NULL,
  `StarsCount` INT NULL,
  PRIMARY KEY (`HotelID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`Hotels_PhoneNumbers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`Hotels_PhoneNumbers` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`Hotels_PhoneNumbers` (
  `PhoneNumber` VARCHAR(45) NOT NULL,
  `HOTEL_HotelID` INT NOT NULL,
  PRIMARY KEY (`PhoneNumber`, `HOTEL_HotelID`),
  INDEX `fk_HOTEL_PhoneNumber_HOTEL1_idx` (`HOTEL_HotelID` ASC) VISIBLE,
  CONSTRAINT `fk_HOTEL_PhoneNumber_HOTEL1`
    FOREIGN KEY (`HOTEL_HotelID`)
    REFERENCES `sweproj`.`Hotels` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`HotelFeatures`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`HotelFeatures` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`HotelFeatures` (
  `HotelFeatureID` INT NOT NULL AUTO_INCREMENT,
  `HotelFeatureName` VARCHAR(45) NULL,
  PRIMARY KEY (`HotelFeatureID`),
  UNIQUE INDEX `HotelFeatureName_UNIQUE` (`HotelFeatureName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`Hotels_has_HotelFeatures`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`Hotels_has_HotelFeatures` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`Hotels_has_HotelFeatures` (
  `HotelID` INT NOT NULL,
  `HotelFeatureID` INT NOT NULL,
  PRIMARY KEY (`HotelID`, `HotelFeatureID`),
  INDEX `fk_HOTEL_has_HOTELFEATURE_HOTELFEATURE1_idx` (`HotelFeatureID` ASC) VISIBLE,
  INDEX `fk_HOTEL_has_HOTELFEATURE_HOTEL1_idx` (`HotelID` ASC) VISIBLE,
  CONSTRAINT `fk_HOTEL_has_HOTELFEATURE_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`Hotels` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HOTEL_has_HOTELFEATURE_HOTELFEATURE1`
    FOREIGN KEY (`HotelFeatureID`)
    REFERENCES `sweproj`.`HotelFeatures` (`HotelFeatureID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`RoomTypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`RoomTypes` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`RoomTypes` (
  `HotelID` INT NOT NULL,
  `RoomTypeID` INT NOT NULL,
  `RoomTypeName` VARCHAR(45) NULL,
  `RoomCapacity` INT NULL,
  `Photo` TEXT NULL,
  `Description` TEXT NULL,
  PRIMARY KEY (`HotelID`, `RoomTypeID`),
  UNIQUE INDEX `RoomTypeName_UNIQUE` (`RoomTypeName` ASC) VISIBLE,
  CONSTRAINT `fk_ROOMTYPE_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`Hotels` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`Rooms`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`Rooms` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`Rooms` (
  `HotelID` INT NOT NULL,
  `RoomNumber` INT NOT NULL,
  `FloorNumber` INT NULL,
  `NumberOfStayingGuests` VARCHAR(45) NULL,
  `ROOMTYPE_HOTEL_HotelID` INT NOT NULL,
  PRIMARY KEY (`HotelID`, `RoomNumber`),
  INDEX `fk_ROOM_ROOMTYPE1_idx` (`ROOMTYPE_HOTEL_HotelID` ASC) VISIBLE,
  CONSTRAINT `fk_ROOM_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `sweproj`.`Hotels` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ROOM_ROOMTYPE1`
    FOREIGN KEY (`ROOMTYPE_HOTEL_HotelID`)
    REFERENCES `sweproj`.`RoomTypes` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`RoomFeatures`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`RoomFeatures` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`RoomFeatures` (
  `RoomFeatureID` INT NOT NULL AUTO_INCREMENT,
  `RoomFeatureName` VARCHAR(45) NULL,
  PRIMARY KEY (`RoomFeatureID`),
  UNIQUE INDEX `RoomFeatureName_UNIQUE` (`RoomFeatureName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`RoomType_has_RoomFeatures`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`RoomType_has_RoomFeatures` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`RoomType_has_RoomFeatures` (
  `HotelID` INT NOT NULL,
  `RoomTypeID` INT NOT NULL,
  `RoomFeatureID` INT NOT NULL,
  PRIMARY KEY (`HotelID`, `RoomTypeID`, `RoomFeatureID`),
  INDEX `fk_ROOMTYPE_has_ROOMFEATURE_ROOMFEATURE1_idx` (`RoomFeatureID` ASC) VISIBLE,
  INDEX `fk_ROOMTYPE_has_ROOMFEATURE_ROOMTYPE1_idx` (`HotelID` ASC, `RoomTypeID` ASC) VISIBLE,
  CONSTRAINT `fk_ROOMTYPE_has_ROOMFEATURE_ROOMTYPE1`
    FOREIGN KEY (`HotelID` , `RoomTypeID`)
    REFERENCES `sweproj`.`RoomTypes` (`HotelID` , `RoomTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ROOMTYPE_has_ROOMFEATURE_ROOMFEATURE1`
    FOREIGN KEY (`RoomFeatureID`)
    REFERENCES `sweproj`.`RoomFeatures` (`RoomFeatureID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sweproj`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sweproj`.`Users` ;

CREATE TABLE IF NOT EXISTS `sweproj`.`Users` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(45) NULL,
  `LastName` VARCHAR(45) NULL,
  `Email` VARCHAR(45) NULL,
  `Password` VARCHAR(100) NULL,
  `RegistrationDate` DATETIME NULL,
  `DateOfBirth` DATE NULL,
  `Age` INT NULL,
  `Gender` VARCHAR(10) BINARY NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
