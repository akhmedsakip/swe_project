ALTER TABLE user
ADD isAdmin boolean NOT NULL;

insert into user values ('akhmed@amita.kz', 'Akhmed', 'Sakip',
 '12345678', '1999-01-01', 'Male', '2020-11-09 00:00:00', '1');
insert into user values ('timur@amita.kz', 'Timur', 'Rakhimzhan',
 '12345678', '1999-02-02', 'Male', '2020-11-09 00:00:00', '1');
insert into user values ('islam@amita.kz', 'Islam', 'Orazbek',
 '12345678', '1999-03-03', 'Male', '2020-11-09 00:00:00', '1');
insert into user values ('madi@amita.kz', 'Madi', 'Karsybekov',
 '12345678', '1999-04-04', 'Male', '2020-11-09 00:00:00', '1');
insert into user values ('ayazhan@amita.kz', 'Ayazhan', 'Yerikkyzy',
 '12345678', '1999-05-05', 'Female', '2020-11-09 00:00:00', '1');
