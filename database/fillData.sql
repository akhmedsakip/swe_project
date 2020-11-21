INSERT INTO identification_type (Name, CountryCode)
VALUES (
        'Passport',
        'KZ'
        );

INSERT INTO identification_type (Name)
VALUES (
        'Passport'
        );

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
                   StarCount)
                   VALUES (
                    'Rixos Almaty',
                    10,
                    350,
                    0,
                    'KZ',
                    'Almaty',
                    'Seifullina',
                    '0050012',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare ipsum vitae metus fermentum, a elementum ex maximus. Nam luctus mattis mi, ut aliquet diam cursus eget. Vestibulum tincidunt erat sed sapien auctor, a finibus lectus rhoncus. Aliquam volutpat purus diam, vitae vestibulum lectus luctus ut. Praesent viverra purus id tristique condimentum. Suspendisse potenti. Ut id felis vitae sapien vehicula finibus. Donec interdum volutpat pretium. Sed semper faucibus dapibus. Nulla tortor magna, iaculis eget sapien in, rhoncus malesuada erat.',
                    'https://cf.bstatic.com/images/hotel/max1024x768/426/42696320.jpg',
                     3
                   );

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
                    'Rixos President Astana',
                    9,
                    270,
                    0,
                    'KZ',
                    'Nur-Sultan',
                    'Kunayeva',
                    '010000',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    'https://cf.bstatic.com/images/hotel/max1024x768/553/55308233.jpg',
                    5
                   );

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
                    'Rixos Water World Aktau',
                    7,
                    175,
                    0,
                    'KZ',
                    'Aktau',
                    'Aktau',
                    '130000',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    'https://i2.wp.com/casp-geo.ru/wp-content/uploads/2020/09/Rixos-Water-World-Aktau.jpg?fit=1280%2C768',
                    4
                   );

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
                    'Rixos Borovoe',
                    7,
                    175,
                    0,
                    'KZ',
                    'Borovoe',
                    'Borovoe',
                    '020000',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    'https://pix10.agoda.net/hotelImages/401/401257/401257_15072611530033033820.jpg?s=1024x768',
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
	                            'Standard',
	                            20,
	                            25,
	                            2,
	                            'https://cf.bstatic.com/images/hotel/max1024x768/426/42696338.jpg',
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
                                'Luxe',
                                40,
                                100,
                                3,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696356.jpg',
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
                                'Standard',
                                20,
                                25,
                                2,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696338.jpg',
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
                                'Luxe',
                                40,
                                100,
                                3,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696356.jpg',
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
                                3,
                                'Standard',
                                20,
                                25,
                                2,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696338.jpg',
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
                                3,
                                'Luxe',
                                40,
                                100,
                                3,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696356.jpg',
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
                                4,
                                'Standard',
                                20,
                                25,
                                2,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696338.jpg',
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
                                4,
                                'Luxe',
                                40,
                                100,
                                3,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696356.jpg',
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                               );


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

INSERT INTO season (Name, StartDate, EndDate)
VALUES (
        'New Year',
        '2021-01-01',
        '2021-01-07'
       );

INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (1, 'Sunday', 1.1);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (1, 'Monday', 1.12);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (1, 'Tuesday', 1.13);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (1, 'Wednesday', 1.14);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (1, 'Thursday', 1.08);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (1, 'Friday', 1.15);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (1, 'Saturday', 1.16);

INSERT INTO season (Name, StartDate, EndDate)
VALUES (
        'Summer',
        '2021-06-01',
        '2021-08-31'
       );

INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (2, 'Sunday', 1.01);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (2, 'Monday', 1.02);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (2, 'Tuesday', 1.03);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (2, 'Wednesday', 1.04);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (2, 'Thursday', 1.08);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (2, 'Friday', 1.1);
INSERT INTO season_has_day_of_week (SeasonID, DayOfWeek, Coefficient) VALUES (2, 'Saturday', 1.11);

INSERT INTO hotel_works_during_season (HotelID, SeasonID)
VALUES (
        1,
        1
       );

INSERT INTO hotel_works_during_season (HotelID, SeasonID)
VALUES (
        1,
        2
       );

INSERT INTO hotel_works_during_season (HotelID, SeasonID)
VALUES (
        2,
        1
       );

INSERT INTO hotel_works_during_season (HotelID, SeasonID)
VALUES (
        2,
        2
       );

INSERT INTO hotel_works_during_season (HotelID, SeasonID)
VALUES (
        3,
        1
       );

INSERT INTO hotel_works_during_season (HotelID, SeasonID)
VALUES (
        3,
        2
       );

INSERT INTO hotel_works_during_season (HotelID, SeasonID)
VALUES (
        4,
        1
       );

INSERT INTO hotel_works_during_season (HotelID, SeasonID)
VALUES (
        4,
        2
       );

INSERT INTO holiday (Name, CountryCode, StartDate, EndDate, IsEveryYear)
VALUES (
        'New Year',
        'KZ',
        '2021-01-01',
        '2021-01-03',
        1
       );

INSERT INTO hotel_works_during_holiday (HotelID, HolidayID, Coefficient)
VALUES (
        1,
        1,
        1.3
       );

INSERT INTO hotel_works_during_holiday (HotelID, HolidayID, Coefficient)
VALUES (
        2,
        1,
        1.2
       );

INSERT INTO hotel_works_during_holiday (HotelID, HolidayID, Coefficient)
VALUES (
        3,
        1,
        1.25
       );

INSERT INTO hotel_works_during_holiday (HotelID, HolidayID, Coefficient)
VALUES (
        4,
        1,
        1.15
       );

INSERT INTO role
VALUES ('ROLE_ADMIN');

INSERT INTO role
VALUES ('ROLE_MODERATOR');

INSERT INTO privilege
VALUES ('READ_ALL_ORDERS');

INSERT INTO privilege
VALUES ('WRITE_ALL_ORDERS');

INSERT INTO privilege
VALUES ('WRITE_ALL_USERS');

INSERT INTO privilege
VALUES ('READ_ALL_EMPLOYEES');

INSERT INTO privilege
VALUES ('READ_ALL_SCHEDULES');

INSERT INTO privilege
VALUES ('WRITE_ALL_SCHEDULES');

INSERT INTO role_has_privilege
VALUES ('ROLE_ADMIN', 'READ_ALL_ORDERS');

INSERT INTO role_has_privilege
VALUES ('ROLE_ADMIN', 'WRITE_ALL_ORDERS');

INSERT INTO role_has_privilege
VALUES ('ROLE_ADMIN', 'WRITE_ALL_USERS');

INSERT INTO role_has_privilege
VALUES ('ROLE_ADMIN', 'READ_ALL_EMPLOYEES');

INSERT INTO role_has_privilege
VALUES ('ROLE_ADMIN', 'READ_ALL_SCHEDULES');

INSERT INTO role_has_privilege
VALUES ('ROLE_ADMIN', 'WRITE_ALL_SCHEDULES');

INSERT INTO administrative_position
VALUES ('Manager');

INSERT INTO administrative_position
VALUES ('Desk Clerk');

INSERT INTO cleaning_position
VALUES ('Cleaner');