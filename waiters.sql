drop table if exists shifts,names,work_days;
create table names (
    id serial not null primary key,
    waiters_name text not null
);

create table work_days(
    id serial not null primary key,
    waiter_days text not null
);


insert into work_days (waiter_days) values ('Sunday');
insert into work_days (waiter_days) values ('Monday');
insert into work_days (waiter_days) values ('Tuesday');
insert into work_days (waiter_days) values ('Wednesday');
insert into work_days (waiter_days) values ('Thursday');
insert into work_days (waiter_days) values ('Friday');
Insert into work_days (waiter_days) values ('Saturday');

create table shifts(
    id serial not null,
    waiter_id int,
    day_id int,
    foreign key (waiter_id) references names(id),
    foreign key (day_id)references work_days(id)
)