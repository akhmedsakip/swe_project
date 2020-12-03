INSERT INTO order_status (Name)
VALUE ('Reserved');

INSERT INTO order_status (Name)
VALUE ('Active');

INSERT INTO order_status (Name)
VALUE ('Past');

INSERT INTO payment_method (Name)
VALUE ('Card');

INSERT INTO payment_method (Name)
VALUE ('Cash');

INSERT INTO day_of_week(Day) VALUE ('Sunday');
INSERT INTO day_of_week(Day) VALUE ('Monday');
INSERT INTO day_of_week(Day) VALUE ('Tuesday');
INSERT INTO day_of_week(Day) VALUE ('Wednesday');
INSERT INTO day_of_week(Day) VALUE ('Thursday');
INSERT INTO day_of_week(Day) VALUE ('Friday');
INSERT INTO day_of_week(Day) VALUE ('Saturday');

INSERT INTO hotel (Name,
                   `Floors#`,
                   `Rooms#`,
                   `FreeRooms#`,
                   CountryCode,
                   City,
                   Street,
                   ZIPCode,
                   Description,
                   MainHotelPicture,
                   StarCount) VALUES (
                    'Hotel A',
                    null,
                    null,
                    null,
                    'KZ',
                    'City A',
                    'Street A',
                    '010000',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    '/assets/hotelMainPictures/rixosBorovoe.jpg',
                    4
                   );

INSERT INTO room_type (HotelID,
                      Name,
                      Size,
                      BasePricePerDay,
                      Capacity,
                      MainPhoto,
                      Description)
	                    VALUES (
	                            1,
	                            'Single',
	                            20,
	                            25,
	                            2,
	                            '/assets/roomTypePictures/standard.jpg',
	                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	                           );

INSERT INTO room_type (HotelID,
                      Name,
                      Size,
                      BasePricePerDay,
                      Capacity,
                      MainPhoto,
                      Description)
	                    VALUES (
	                            1,
	                            'Double',
	                            35,
	                            40,
	                            4,
	                            '/assets/roomTypePictures/standard.jpg',
	                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	                           );

INSERT INTO room(HotelID, RoomNumber, `Floor#`,
                         `StayingGuests#`, LastCleanDate, RoomTypeHotelID, RoomTypeName)
                          VALUE (1, '1.01', 1, null, null, 1, 'Single');

INSERT INTO room(HotelID, RoomNumber, `Floor#`,
                         `StayingGuests#`, LastCleanDate, RoomTypeHotelID, RoomTypeName)
                          VALUE (1, '1.02', 1, null, null, 1, 'Single');

INSERT INTO room(HotelID, RoomNumber, `Floor#`,
                         `StayingGuests#`, LastCleanDate, RoomTypeHotelID, RoomTypeName)
                          VALUE (1, '1.03', 1, null, null, 1, 'Double');

INSERT INTO room(HotelID, RoomNumber, `Floor#`,
                         `StayingGuests#`, LastCleanDate, RoomTypeHotelID, RoomTypeName)
                          VALUE (1, '1.04', 1, null, null, 1, 'Double');

INSERT INTO hotel (Name,
                   `Floors#`,
                   `Rooms#`,
                   `FreeRooms#`,
                   CountryCode,
                   City,
                   Street,
                   ZIPCode,
                   Description,
                   MainHotelPicture,
                   StarCount) VALUES (
                    'Hotel B',
                    null,
                    null,
                    null,
                    'KZ',
                    'City B',
                    'Street B',
                    '010001',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    '/assets/hotelMainPictures/rixosBorovoe.jpg',
                    4
                   );

INSERT INTO room_type (HotelID,
                      Name,
                      Size,
                      BasePricePerDay,
                      Capacity,
                      MainPhoto,
                      Description)
	                    VALUES (
	                            2,
	                            'Single',
	                            20,
	                            25,
	                            2,
	                            '/assets/roomTypePictures/standard.jpg',
	                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	                           );

INSERT INTO room_type (HotelID,
                      Name,
                      Size,
                      BasePricePerDay,
                      Capacity,
                      MainPhoto,
                      Description)
	                    VALUES (
	                            2,
	                            'Double',
	                            35,
	                            40,
	                            4,
	                            '/assets/roomTypePictures/standard.jpg',
	                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	                           );

INSERT INTO room(HotelID, RoomNumber, `Floor#`,
                         `StayingGuests#`, LastCleanDate, RoomTypeHotelID, RoomTypeName)
                          VALUE (2, '1.01', 1, null, null, 1, 'Single');

INSERT INTO room(HotelID, RoomNumber, `Floor#`,
                         `StayingGuests#`, LastCleanDate, RoomTypeHotelID, RoomTypeName)
                          VALUE (2, '1.02', 1, null, null, 1, 'Single');

INSERT INTO room(HotelID, RoomNumber, `Floor#`,
                         `StayingGuests#`, LastCleanDate, RoomTypeHotelID, RoomTypeName)
                          VALUE (2, '1.03', 1, null, null, 1, 'Double');

INSERT INTO room(HotelID, RoomNumber, `Floor#`,
                         `StayingGuests#`, LastCleanDate, RoomTypeHotelID, RoomTypeName)
                          VALUE (2, '1.04', 1, null, null, 1, 'Double');

INSERT INTO special_category (Name, DiscountCoefficient, HotelID)
VALUES ('Bronze', 0.95, null);

INSERT INTO special_category (Name, DiscountCoefficient, HotelID)
VALUES ('Silver', 0.9, null);

INSERT INTO special_category (Name, DiscountCoefficient, HotelID)
VALUES ('Gold', 0.85, null);

INSERT INTO special_category (Name, DiscountCoefficient, HotelID)
VALUES ('Special Guest of Hotel A', 0.7, 1);

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Female', 'Mona', 'Rizvi', '+77777777777');

INSERT INTO user (Email, FirstName, LastName, Password, DateOfBirth, Gender, RegistrationDate)
VALUES ('mona.rizvi@nu.edu.kz', 'Mona', 'Rizvi', '123123', '2000-01-01', 'Female', CURDATE());

INSERT INTO guest (GuestID, SpecialCategoryID)
VALUES (1, 3);

INSERT INTO season (Name, StartDate, EndDate)
VALUES (
        'Test Season',
        '2020-12-15',
        '2020-12-15'
       );

INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (1, 'Sunday', 1.01);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (1, 'Monday', 1.02);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (1, 'Tuesday', 1.03);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (1, 'Wednesday', 1.04);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (1, 'Thursday', 1.08);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (1, 'Friday', 1.1);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (1, 'Saturday', 1.11);

INSERT INTO hotel_works_during_season (HotelID, SeasonID)
VALUES (
        1,
        1
       );

INSERT INTO person (Gender, FirstName, LastName, PhoneNumber)
VALUES ('Male', 'Jon', 'Smith', '+77766666666');

INSERT INTO user (Email, FirstName, LastName, Password, DateOfBirth, Gender, RegistrationDate)
VALUES ('jon.smith@some.email', 'Jon', 'Smith', '123123', '2000-01-02', 'Male', CURDATE());

INSERT INTO guest (GuestID, SpecialCategoryID)
VALUES (2, null);