INSERT INTO USERS VALUES(nextval('USER_S'),'Santosh Kumar Kotakonda', 'sanskith', 'splender', 'santoshkotakonda@gmail.com', '8643548843',true,true);
INSERT INTO USER_QUESTIONS VALUES(nextval('USER_QUESTIONS_S'),'What is your favorite sports?', 'san',(select id from users where username='sanskith') );
INSERT INTO USER_QUESTIONS VALUES(nextval('USER_QUESTIONS_S'),'What is your school name?', 'san', (select id from users where username='sanskith'));
INSERT INTO USER_QUESTIONS VALUES(nextval('USER_QUESTIONS_S'),'What is your favorite color?', 'san', (select id from users where username='sanskith'));

insert into medicine values(nextval('MEDICINE_S'), 'Actifed', 'ActifedTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15,  (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Alka-Seltzer Plus', 'Alka-Seltzer PlusTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15,  (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Anacin', 'AnacinTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Cepacol', 'CepacolTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Hycotab', 'HycotabTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Dayquil', 'DayquilTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Lortab', 'LortabTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Excedrin', 'ExcedrinTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Feverall', 'FeverallTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Formula 44', 'Formula 44 TM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Goody’s', 'Goody’sTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Liquiprin', 'LiquiprinTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Midol', 'MidolTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Mucinex', 'MucinexTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Nyquil', 'NyquilTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Panadol', 'PanadolTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Robitussin', 'RobitussinTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Singlet', 'SingletTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Theraflu', 'TherafluTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));
insert into medicine values(nextval('MEDICINE_S'), 'Triaminic', 'TriaminicTM', '2015-03-01','2016-07-29', 100, 120,6.67, 150, 15, (select id from users where username='sanskith'));

SELECT setval('MEDICINE_S', (SELECT MAX(id) FROM medicine)+1);

commit;