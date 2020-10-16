-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Conference`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Conference` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Conference` (
  `Date` DATE NOT NULL,
  PRIMARY KEY (`Date`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Paper`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Paper` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Paper` (
  `PaperID` INT NOT NULL,
  `Title` VARCHAR(45) NOT NULL,
  `Abstract` LONGTEXT NULL,
  `Filename` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`PaperID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Topic`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Topic` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Topic` (
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ConferenceMember`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ConferenceMember` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ConferenceMember` (
  `Email` VARCHAR(45) NOT NULL,
  `FirstName` VARCHAR(45) NULL,
  `LastName` VARCHAR(45) NULL,
  `PhoneNumber` VARCHAR(45) NULL,
  PRIMARY KEY (`Email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Author`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Author` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Author` (
  `Email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Email`),
  CONSTRAINT `fk_Author_ConferenceMember1`
    FOREIGN KEY (`Email`)
    REFERENCES `mydb`.`ConferenceMember` (`Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Reviewer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Reviewer` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Reviewer` (
  `Email` VARCHAR(45) NOT NULL,
  `TotalReviewed` INT NOT NULL,
  PRIMARY KEY (`Email`),
  CONSTRAINT `fk_Reviewer_ConferenceMember1`
    FOREIGN KEY (`Email`)
    REFERENCES `mydb`.`ConferenceMember` (`Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Review`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Review` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Review` (
  `ReviewID` INT NOT NULL,
  `CreatedDate` DATE NOT NULL,
  `UpdatedDate` DATE NULL,
  `StateUpdateDate` DATE NULL,
  `Paper_PaperID` INT NOT NULL,
  PRIMARY KEY (`ReviewID`),
  INDEX `fk_Review_Paper1_idx` (`Paper_PaperID` ASC) VISIBLE,
  CONSTRAINT `fk_Review_Paper1`
    FOREIGN KEY (`Paper_PaperID`)
    REFERENCES `mydb`.`Paper` (`PaperID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`OfferState`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`OfferState` ;

CREATE TABLE IF NOT EXISTS `mydb`.`OfferState` (
  `ReviewID` INT NOT NULL,
  `isRejected` TINYINT NULL,
  PRIMARY KEY (`ReviewID`),
  CONSTRAINT `fk_OfferState_Review1`
    FOREIGN KEY (`ReviewID`)
    REFERENCES `mydb`.`Review` (`ReviewID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ReviewState`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ReviewState` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ReviewState` (
  `ReviewID` INT NOT NULL,
  `RelevanceScore` INT NULL,
  `OriginalityScore` INT NULL,
  `ReadabilityScore` INT NULL,
  `ReviewStatecol` INT NULL,
  `TechnicalMeritScore` INT NULL,
  `isRecommended` TINYINT NULL,
  PRIMARY KEY (`ReviewID`),
  CONSTRAINT `fk_ReviewState_Review1`
    FOREIGN KEY (`ReviewID`)
    REFERENCES `mydb`.`Review` (`ReviewID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`AffiliationType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`AffiliationType` ;

CREATE TABLE IF NOT EXISTS `mydb`.`AffiliationType` (
  `Name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`Name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Affiliation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Affiliation` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Affiliation` (
  `AffiliationID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `CountryCode` VARCHAR(2) NOT NULL,
  `WebsiteAddress` VARCHAR(45) NULL,
  `AffiliationType_Name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`AffiliationID`),
  INDEX `fk_Affiliation_AffiliationType1_idx` (`AffiliationType_Name` ASC) VISIBLE,
  CONSTRAINT `fk_Affiliation_AffiliationType1`
    FOREIGN KEY (`AffiliationType_Name`)
    REFERENCES `mydb`.`AffiliationType` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Conference_is about_Topic`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Conference_is about_Topic` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Conference_is about_Topic` (
  `ConferenceDate` DATE NOT NULL,
  `TopicName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ConferenceDate`, `TopicName`),
  INDEX `fk_Conference_has_Topic_Topic1_idx` (`TopicName` ASC) VISIBLE,
  INDEX `fk_Conference_has_Topic_Conference_idx` (`ConferenceDate` ASC) VISIBLE,
  CONSTRAINT `fk_Conference_has_Topic_Conference`
    FOREIGN KEY (`ConferenceDate`)
    REFERENCES `mydb`.`Conference` (`Date`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Conference_has_Topic_Topic1`
    FOREIGN KEY (`TopicName`)
    REFERENCES `mydb`.`Topic` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Conference_accepts_Paper`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Conference_accepts_Paper` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Conference_accepts_Paper` (
  `ConferenceDate` DATE NOT NULL,
  `PaperID` INT NOT NULL,
  PRIMARY KEY (`ConferenceDate`, `PaperID`),
  INDEX `fk_Conference_has_Paper_Paper1_idx` (`PaperID` ASC) VISIBLE,
  INDEX `fk_Conference_has_Paper_Conference1_idx` (`ConferenceDate` ASC) VISIBLE,
  CONSTRAINT `fk_Conference_has_Paper_Conference1`
    FOREIGN KEY (`ConferenceDate`)
    REFERENCES `mydb`.`Conference` (`Date`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Conference_has_Paper_Paper1`
    FOREIGN KEY (`PaperID`)
    REFERENCES `mydb`.`Paper` (`PaperID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Conference_considers_Paper`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Conference_considers_Paper` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Conference_considers_Paper` (
  `ConferenceDate` DATE NOT NULL,
  `PaperID` INT NOT NULL,
  PRIMARY KEY (`ConferenceDate`, `PaperID`),
  INDEX `fk_Conference_has_Paper_Paper2_idx` (`PaperID` ASC) VISIBLE,
  INDEX `fk_Conference_has_Paper_Conference2_idx` (`ConferenceDate` ASC) VISIBLE,
  CONSTRAINT `fk_Conference_has_Paper_Conference2`
    FOREIGN KEY (`ConferenceDate`)
    REFERENCES `mydb`.`Conference` (`Date`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Conference_has_Paper_Paper2`
    FOREIGN KEY (`PaperID`)
    REFERENCES `mydb`.`Paper` (`PaperID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = armscii8;


-- -----------------------------------------------------
-- Table `mydb`.`Conference_has_ConferenceMember`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Conference_has_ConferenceMember` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Conference_has_ConferenceMember` (
  `ConferenceDate` DATE NOT NULL,
  `ConferenceMemberEmail` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ConferenceDate`, `ConferenceMemberEmail`),
  INDEX `fk_Conference_has_ConferenceMember_ConferenceMember1_idx` (`ConferenceMemberEmail` ASC) VISIBLE,
  INDEX `fk_Conference_has_ConferenceMember_Conference1_idx` (`ConferenceDate` ASC) VISIBLE,
  CONSTRAINT `fk_Conference_has_ConferenceMember_Conference1`
    FOREIGN KEY (`ConferenceDate`)
    REFERENCES `mydb`.`Conference` (`Date`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Conference_has_ConferenceMember_ConferenceMember1`
    FOREIGN KEY (`ConferenceMemberEmail`)
    REFERENCES `mydb`.`ConferenceMember` (`Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Paper_is on_Topic`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Paper_is on_Topic` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Paper_is on_Topic` (
  `PaperID` INT NOT NULL,
  `TopicName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`PaperID`, `TopicName`),
  INDEX `fk_Paper_has_Topic_Topic1_idx` (`TopicName` ASC) VISIBLE,
  INDEX `fk_Paper_has_Topic_Paper1_idx` (`PaperID` ASC) VISIBLE,
  CONSTRAINT `fk_Paper_has_Topic_Paper1`
    FOREIGN KEY (`PaperID`)
    REFERENCES `mydb`.`Paper` (`PaperID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Paper_has_Topic_Topic1`
    FOREIGN KEY (`TopicName`)
    REFERENCES `mydb`.`Topic` (`Name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ConferenceMember_has_Affiliation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ConferenceMember_has_Affiliation` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ConferenceMember_has_Affiliation` (
  `ConferenceMemberEmail` VARCHAR(45) NOT NULL,
  `AffiliationID` INT NOT NULL,
  `isCurrent` TINYINT NULL,
  `Position` VARCHAR(45) NULL,
  `FromDate` DATE NULL,
  `ToDate` DATE NULL,
  `isSubmitted` TINYINT NULL,
  PRIMARY KEY (`ConferenceMemberEmail`, `AffiliationID`),
  INDEX `fk_ConferenceMember_has_Affiliation_Affiliation1_idx` (`AffiliationID` ASC) VISIBLE,
  INDEX `fk_ConferenceMember_has_Affiliation_ConferenceMember1_idx` (`ConferenceMemberEmail` ASC) VISIBLE,
  CONSTRAINT `fk_ConferenceMember_has_Affiliation_ConferenceMember1`
    FOREIGN KEY (`ConferenceMemberEmail`)
    REFERENCES `mydb`.`ConferenceMember` (`Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ConferenceMember_has_Affiliation_Affiliation1`
    FOREIGN KEY (`AffiliationID`)
    REFERENCES `mydb`.`Affiliation` (`AffiliationID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Review_CommentToAuthor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Review_CommentToAuthor` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Review_CommentToAuthor` (
  `ReviewID` INT NOT NULL,
  `Comment` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ReviewID`, `Comment`),
  CONSTRAINT `fk_Review_CommentsToAuthor_ReviewState1`
    FOREIGN KEY (`ReviewID`)
    REFERENCES `mydb`.`ReviewState` (`ReviewID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Review_PrivateComment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Review_PrivateComment` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Review_PrivateComment` (
  `ReviewID` INT NOT NULL,
  `PrivateComment` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ReviewID`, `PrivateComment`),
  CONSTRAINT `fk_Review_PrivateComment_ReviewState1`
    FOREIGN KEY (`ReviewID`)
    REFERENCES `mydb`.`ReviewState` (`ReviewID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`HOTEL`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`HOTEL` ;

CREATE TABLE IF NOT EXISTS `mydb`.`HOTEL` (
  `HotelID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `NumberOfFloors` INT NULL,
  `NumberOfRooms` INT NULL,
  `NumberOfFreeRooms` INT NULL,
  `Country` VARCHAR(45) NULL,
  `City` VARCHAR(45) NULL,
  `Street` VARCHAR(45) NULL,
  `ZIPCode` VARCHAR(45) NULL,
  PRIMARY KEY (`HotelID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`HOTEL_PhoneNumber`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`HOTEL_PhoneNumber` ;

CREATE TABLE IF NOT EXISTS `mydb`.`HOTEL_PhoneNumber` (
  `PhoneNumber` VARCHAR(45) NOT NULL,
  `HOTEL_HotelID` INT NOT NULL,
  PRIMARY KEY (`PhoneNumber`, `HOTEL_HotelID`),
  INDEX `fk_HOTEL_PhoneNumber_HOTEL1_idx` (`HOTEL_HotelID` ASC) VISIBLE,
  CONSTRAINT `fk_HOTEL_PhoneNumber_HOTEL1`
    FOREIGN KEY (`HOTEL_HotelID`)
    REFERENCES `mydb`.`HOTEL` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`HOTELFEATURE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`HOTELFEATURE` ;

CREATE TABLE IF NOT EXISTS `mydb`.`HOTELFEATURE` (
  `HotelFeatureID` INT NOT NULL,
  `HotelFeatureName` VARCHAR(45) NULL,
  PRIMARY KEY (`HotelFeatureID`),
  UNIQUE INDEX `HotelFeatureName_UNIQUE` (`HotelFeatureName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`HOTEL_has_HOTELFEATURE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`HOTEL_has_HOTELFEATURE` ;

CREATE TABLE IF NOT EXISTS `mydb`.`HOTEL_has_HOTELFEATURE` (
  `HotelID` INT NOT NULL,
  `HotelFeatureID` INT NOT NULL,
  PRIMARY KEY (`HotelID`, `HotelFeatureID`),
  INDEX `fk_HOTEL_has_HOTELFEATURE_HOTELFEATURE1_idx` (`HotelFeatureID` ASC) VISIBLE,
  INDEX `fk_HOTEL_has_HOTELFEATURE_HOTEL1_idx` (`HotelID` ASC) VISIBLE,
  CONSTRAINT `fk_HOTEL_has_HOTELFEATURE_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `mydb`.`HOTEL` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HOTEL_has_HOTELFEATURE_HOTELFEATURE1`
    FOREIGN KEY (`HotelFeatureID`)
    REFERENCES `mydb`.`HOTELFEATURE` (`HotelFeatureID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ROOMTYPE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ROOMTYPE` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ROOMTYPE` (
  `HotelID` INT NOT NULL,
  `RoomTypeID` INT NOT NULL,
  `RoomTypeName` VARCHAR(45) NULL,
  `RoomCapacity` INT NULL,
  PRIMARY KEY (`HotelID`, `RoomTypeID`),
  UNIQUE INDEX `RoomTypeName_UNIQUE` (`RoomTypeName` ASC) VISIBLE,
  CONSTRAINT `fk_ROOMTYPE_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `mydb`.`HOTEL` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ROOM`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ROOM` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ROOM` (
  `HotelID` INT NOT NULL,
  `RoomNumber` INT NOT NULL,
  `FloorNumber` INT NULL,
  `NumberOfStayingGuests` VARCHAR(45) NULL,
  `ROOMTYPE_HOTEL_HotelID` INT NOT NULL,
  PRIMARY KEY (`HotelID`, `RoomNumber`),
  INDEX `fk_ROOM_ROOMTYPE1_idx` (`ROOMTYPE_HOTEL_HotelID` ASC) VISIBLE,
  CONSTRAINT `fk_ROOM_HOTEL1`
    FOREIGN KEY (`HotelID`)
    REFERENCES `mydb`.`HOTEL` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ROOM_ROOMTYPE1`
    FOREIGN KEY (`ROOMTYPE_HOTEL_HotelID`)
    REFERENCES `mydb`.`ROOMTYPE` (`HotelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ROOMFEATURE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ROOMFEATURE` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ROOMFEATURE` (
  `RoomFeatureID` INT NOT NULL,
  `RoomFeatureName` VARCHAR(45) NULL,
  PRIMARY KEY (`RoomFeatureID`),
  UNIQUE INDEX `RoomFeatureName_UNIQUE` (`RoomFeatureName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ROOMTYPE_has_ROOMFEATURE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ROOMTYPE_has_ROOMFEATURE` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ROOMTYPE_has_ROOMFEATURE` (
  `HotelID` INT NOT NULL,
  `RoomTypeID` INT NOT NULL,
  `RoomFeatureID` INT NOT NULL,
  PRIMARY KEY (`HotelID`, `RoomTypeID`, `RoomFeatureID`),
  INDEX `fk_ROOMTYPE_has_ROOMFEATURE_ROOMFEATURE1_idx` (`RoomFeatureID` ASC) VISIBLE,
  INDEX `fk_ROOMTYPE_has_ROOMFEATURE_ROOMTYPE1_idx` (`HotelID` ASC, `RoomTypeID` ASC) VISIBLE,
  CONSTRAINT `fk_ROOMTYPE_has_ROOMFEATURE_ROOMTYPE1`
    FOREIGN KEY (`HotelID` , `RoomTypeID`)
    REFERENCES `mydb`.`ROOMTYPE` (`HotelID` , `RoomTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ROOMTYPE_has_ROOMFEATURE_ROOMFEATURE1`
    FOREIGN KEY (`RoomFeatureID`)
    REFERENCES `mydb`.`ROOMFEATURE` (`RoomFeatureID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`USER` ;

CREATE TABLE IF NOT EXISTS `mydb`.`USER` (
  `UserID` INT NOT NULL,
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
