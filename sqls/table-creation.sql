drop table if exists point_prepare_time;
drop table if exists meal_prepare_point;
drop table if exists meal_component;
drop table if exists ingredient_unit;
drop table if exists amount_unit;
drop table if exists ingredient_operation;
drop table if exists meal_operation;
drop table if exists ingredient;
drop table if exists meal;
drop table if exists operation_history;
drop table if exists user;
drop table if exists difficulty;
drop table if exists dictionary_translation;

create table difficulty (
	id bigint unsigned primary key not null auto_increment,
    code varchar(32) not null unique,
    
    index(code)
);

create table user (
	id bigint unsigned primary key not null auto_increment,
	login varchar(32) unique not null,
    email varchar(128) unique not null,
    password varchar(32) not null,
    salt tinyint unsigned not null,
    sys_create_date datetime not null default now(),
    last_login_date datetime,
    logins_amount mediumint unsigned not null default 0,
    status tinyint unsigned not null default 1,
    
    index(login),
    index(email),
    index(sys_create_date),
    index(last_login_date),
    index(status)
);

create table ingredient (
	id bigint unsigned primary key not null auto_increment,
    name varchar(128) not null,
    kcal float unsigned not null default 0,
    carbohydrate float not null default 0,
    protein float not null default 0,
    fat float not null default 0,
    water float not null default 0,
    roughage float not null default 0,
    sugar float not null default 0,
    alcohol float not null default 0,
    organic_acid float not null default 0,
    salt float not null default 0,
    sys_create_date datetime not null default now(),
    sys_update_date datetime,
    creator_id bigint unsigned,
    status tinyint unsigned default (1),
    description varchar(1024) default '',
    
    foreign key (creator_id) references user(id) on delete set null,
    
    index (name),
    index (sys_create_date),
    index (sys_update_date),
    index (status)
);

create table meal (
	id bigint unsigned primary key not null auto_increment,
    name varchar(128) not null,
    kcal float unsigned not null default 0,
    serves tinyint unsigned,
    total_time smallint unsigned,
    description varchar(512) not null,
	sys_create_date datetime not null default now(),
    sys_update_date datetime,
    creator_id bigint unsigned,
    difficulty_id bigint unsigned,
    status tinyint unsigned default (1),
    
    foreign key (creator_id) references user(id) on delete set null,
    foreign key (difficulty_id) references difficulty(id) on delete set null,
    
	index (name),
    index (sys_create_date),
    index (sys_update_date),
    index (status)
);

create table operation_history (
	id bigint unsigned primary key not null auto_increment,
    operation tinyint unsigned not null,
    operation_date datetime not null default now(),
    new_object_status tinyint unsigned,
    user_id bigint unsigned,
    entry_point varchar(32),
    
    foreign key (user_id) references user(id) on delete set null,
    
    index(operation),
    index(operation_date),
    index(entry_point),
    index(new_object_status)
);

create table ingredient_operation (
    ingredient_id bigint unsigned not null,
    operation_history_id bigint unsigned not null unique,
    
    foreign key (ingredient_id) references ingredient(id) on delete cascade,
    foreign key (operation_history_id) references operation_history(id) on delete cascade
);

create table meal_operation (
    meal_id bigint unsigned not null,
    operation_history_id bigint unsigned not null unique,
    
    foreign key (meal_id) references meal(id) on delete cascade,
    foreign key (operation_history_id) references operation_history(id) on delete cascade
);

create table amount_unit (
	id tinyint unsigned primary key not null auto_increment,
    code varchar(32) unique not null,
    
    index (code)
);

create table ingredient_unit (
	id int unsigned primary key not null auto_increment,
    ingredient_id bigint unsigned not null,
    amount_unit_id tinyint unsigned not null,
    amount float not null,
    
    foreign key (ingredient_id) references ingredient(id) on delete cascade,
    foreign key (amount_unit_id) references amount_unit(id) on delete cascade
);

create table meal_component (
	id bigint unsigned primary key not null auto_increment,
    ingredient_id bigint unsigned not null,
    meal_id bigint unsigned not null,
    ingredient_unit_id int unsigned not null,
    amount float not null,
    
    foreign key (ingredient_id) references ingredient(id) on delete cascade,
    foreign key (meal_id) references meal(id) on delete cascade,
    foreign key (ingredient_unit_id) references ingredient_unit(id) on delete cascade
);

create table meal_prepare_point (
	id bigint unsigned primary key not null auto_increment,
    meal_id bigint unsigned not null,
    title varchar(32) not null,
    order_unit smallint unsigned not null,
    
    foreign key (meal_id) references meal(id) on delete cascade
);

create table point_prepare_time (
	id bigint unsigned primary key not null auto_increment,
    prepare_point_id bigint unsigned not null,
    time smallint unsigned not null,
    is_about bool not null,
    
    foreign key (prepare_point_id) references meal_prepare_point(id) on delete cascade,
    
    index(time)
);

create table dictionary_translation (
	id bigint unsigned primary key not null auto_increment,
    type varchar(32) not null,
    code varchar(32) not null,
    language varchar(3) not null,
    translation varchar(256) not null,
    
    index(type, code, language),
    index(type, code),
    index(type)
);
