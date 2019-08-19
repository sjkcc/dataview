set names utf8;
drop database  if exists dataview;
create database dataview charset=utf8;
use dataview;
create table temp(
    t_id int primary key auto_increment,
    t_times varchar(32),
    t_temperature varchar(10)
);
insert into temp values
(null,"1565941497306","40℃"),
(null,"1565942498306","48℃"),
(null,"1565941491306","50℃"),
(null,"1565941497306","60℃"),
(null,"1565941417306","68℃"),
(null,"1565941497386","88℃"),
(null,"1565941597306","25℃"),
(null,"1565941597806","33℃");