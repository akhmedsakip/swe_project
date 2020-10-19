INSERT INTO Hotels (Name, NumberOfFloors,
                    NumberOfRooms, NumberOfFreeRooms,
                    Country, City, Street, ZIPCode,
                    MainHotelPicture, Description,
                    StarsCount) VALUES (
                                        'Rixos Almaty',
                                        10,
                                        100,
                                        150,
                                        'Kazakhstan',
                                        'Almaty',
                                        'Seifullina',
                                        '0050012',
                                        'https://cf.bstatic.com/images/hotel/max1024x768/426/42696320.jpg',
                                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare ipsum vitae metus fermentum, a elementum ex maximus. Nam luctus mattis mi, ut aliquet diam cursus eget. Vestibulum tincidunt erat sed sapien auctor, a finibus lectus rhoncus. Aliquam volutpat purus diam, vitae vestibulum lectus luctus ut. Praesent viverra purus id tristique condimentum. Suspendisse potenti. Ut id felis vitae sapien vehicula finibus. Donec interdum volutpat pretium. Sed semper faucibus dapibus. Nulla tortor magna, iaculis eget sapien in, rhoncus malesuada erat.',
                                        3
                                       );

INSERT INTO Hotels (Name, NumberOfFloors,
                    NumberOfRooms, NumberOfFreeRooms,
                    Country, City, Street, ZIPCode,
                    MainHotelPicture, Description,
                    StarsCount) VALUES (
                                        'Rixos President Astana',
                                        10,
                                        1000,
                                        300,
                                        'Kazakhstan',
                                        'Nur-Sultan',
                                        'Kunayeva',
                                        '010000',
                                        'https://cf.bstatic.com/images/hotel/max1024x768/553/55308233.jpg',
                                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                                        5
                                       );

INSERT INTO Hotels (Name, NumberOfFloors,
                    NumberOfRooms, NumberOfFreeRooms,
                    Country, City, Street, ZIPCode,
                    MainHotelPicture, Description,
                    StarsCount) VALUES (
                                        'Rixos Water World Aktau',
                                        7,
                                        700,
                                        100,
                                        'Kazakhstan',
                                        'Aktau',
                                        'Aktau',
                                        '130000',
                                        'https://i2.wp.com/casp-geo.ru/wp-content/uploads/2020/09/Rixos-Water-World-Aktau.jpg?fit=1280%2C768',
                                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                                        4
                                       );

INSERT INTO Hotels (Name, NumberOfFloors,
                    NumberOfRooms, NumberOfFreeRooms,
                    Country, City, Street, ZIPCode,
                    MainHotelPicture, Description,
                    StarsCount) VALUES (
                                        'Rixos Borovoe',
                                        3,
                                        250,
                                        100,
                                        'Kazakhstan',
                                        'Borovoe',
                                        'Borovoe',
                                        '020000',
                                        'https://pix10.agoda.net/hotelImages/401/401257/401257_15072611530033033820.jpg?s=1024x768',
                                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                                        4
                                       );

INSERT INTO RoomTypes (HotelID, RoomTypeName, RoomCapacity, Photo, Description)
                        VALUES (
                                1,
                                'Standard',
                                2,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696338.jpg',
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                               );

INSERT INTO RoomTypes (HotelID, RoomTypeName, RoomCapacity, Photo, Description)
                        VALUES (
                                1,
                                'Luxe',
                                2,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696356.jpg',
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                               );


INSERT INTO RoomTypes (HotelID, RoomTypeName, RoomCapacity, Photo, Description)
                        VALUES (
                                2,
                                'Standard',
                                2,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696338.jpg',
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                               );

INSERT INTO RoomTypes (HotelID, RoomTypeName, RoomCapacity, Photo, Description)
                        VALUES (
                                2,
                                'Luxe',
                                2,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696356.jpg',
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                               );

INSERT INTO RoomTypes (HotelID, RoomTypeName, RoomCapacity, Photo, Description)
                        VALUES (
                                3,
                                'Standard',
                                2,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696338.jpg',
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                               );

INSERT INTO RoomTypes (HotelID, RoomTypeName, RoomCapacity, Photo, Description)
                        VALUES (
                                3,
                                'Luxe',
                                2,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696356.jpg',
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                               );

INSERT INTO RoomTypes (HotelID, RoomTypeName, RoomCapacity, Photo, Description)
                        VALUES (
                                4,
                                'Standard',
                                2,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696338.jpg',
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                               );

INSERT INTO RoomTypes (HotelID, RoomTypeName, RoomCapacity, Photo, Description)
                        VALUES (
                                4,
                                'Luxe',
                                2,
                                'https://cf.bstatic.com/images/hotel/max1024x768/426/42696356.jpg',
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                               );