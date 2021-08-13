

use danim;

# 확인하고 지울 것
DROP TABLE IF EXISTS `follow`;
DROP TABLE IF EXISTS `love`;
DROP TABLE IF EXISTS `comment`;
DROP TABLE IF EXISTS `photo`;
DROP TABLE IF EXISTS `substory`;
DROP TABLE IF EXISTS `story`;
DROP TABLE IF EXISTS `interest`;
DROP TABLE IF EXISTS `danimid`;
DROP TABLE IF EXISTS `oauthid`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_no` bigint(20) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(15) NOT NULL,
  `introduce` varchar(150), 
  `gender` varchar(1) default null,
  `age` int,  
  `role` ENUM('BANNED', 'MEMBER', 'ADMIN', 'DELETED') default 'member', 
  `created_date` datetime,
  `profile` varchar(200),
  PRIMARY KEY (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


create TABLE `oauthid` (
	`id` varchar(30) not null,
    `user_no` bigint(20) not null,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_no`) REFERENCES `user`(`user_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


create table `danimid`(
	`id` varchar(30) not null,
    `user_no` bigint(20) not null,
    `password` varchar(60) not null,
     PRIMARY KEY (`id`),
	 FOREIGN KEY (`user_no`) REFERENCES `user`(`user_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


create table `interest`(
	`id` bigint(20) not null auto_increment,
    `area` varchar(20) not null,
    `user_no` bigint(20) not null,
    PRIMARY KEY (`id`),
	FOREIGN KEY (`user_no`) REFERENCES `user`(`user_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table `story`(
	`story_no` bigint(20) not null auto_increment,    
    `user_no` bigint(20) not null,
    `title` varchar(50) not null,
    `created_date` DATETIME not null,
    `start_date` DATE not null,
    `duration` int(2) not null,
    `thumbnail` varchar(100),
    `story_deleted` boolean default false,
    `status` ENUM('PUBLISHED', 'PRIVATED', 'TEMP', 'DELETED') default 'TEMP' ,
    `love_count` int default 0,
    PRIMARY KEY (`story_no`),
	FOREIGN KEY (`user_no`) REFERENCES `user`(`user_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table `substory`(
	`substory_no` bigint(20) not null auto_increment,    
    `story_no` bigint(20) not null,
    `user_no` bigint(20) not null,
    `seq_no` int(2),
    `substory_deleted` boolean default false,
    PRIMARY KEY (`substory_no`),
    FOREIGN KEY (`story_no`) REFERENCES `story`(`story_no`),
	FOREIGN KEY (`user_no`) REFERENCES `user`(`user_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table `photo`(
	`photo_no` bigint(20) not null auto_increment,    
    `story_no` bigint(20),
    `substory_no` bigint(20),
    `user_no` bigint(20) not null,
    `latitude` varchar(25) not null,
    `longtitude` varchar(25) not null,
    `photo_content` varchar(300),
    `photo_filename` varchar(100) not null,
    `photo_date` DATETIME not null,    
    `photo_deleted` boolean default false,
    `address` varchar(100),
    `place_name` varchar(100),
    `tag`  ENUM('NONE', 'FOOD', 'SCENERY', 'PERSON') default 'NONE', 
    PRIMARY KEY (`photo_no`),
    FOREIGN KEY (`story_no`) REFERENCES `story`(`story_no`),
	FOREIGN KEY (`substory_no`) REFERENCES `substory`(`substory_no`),
	FOREIGN KEY (`user_no`) REFERENCES `user`(`user_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table `love`(
	`love_no` bigint(20) not null auto_increment,    
    `story_no` bigint(20) not null,
    `user_no` bigint(20) not null,
    PRIMARY KEY (`love_no`),
    FOREIGN KEY (`story_no`) REFERENCES `story`(`story_no`),
	FOREIGN KEY (`user_no`) REFERENCES `user`(`user_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table `comment`(
	`comment_no` bigint(20) not null auto_increment,    
    `story_no` bigint(20) not null,
    `user_no` bigint(20) not null,
    `comment_content` varchar(100),
    `comment_deleted` boolean not null default false,
    PRIMARY KEY (`comment_no`),
    FOREIGN KEY (`story_no`) REFERENCES `story`(`story_no`),
	FOREIGN KEY (`user_no`) REFERENCES `user`(`user_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table `follow`(
    `follow_no` bigint(20) not null auto_increment,
    `follow_user_no` varchar(20) not null,
    `user_no` bigint(20) not null,
    PRIMARY KEY (follow_no),
    FOREIGN KEY (user_no) REFERENCES user(user_no)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table `place`(
	`place_type` varchar(200) not null,
	`place_name` varchar(200) not null,
	`place_address` varchar(200),
	`place_road_address` varchar(200),
	`place_latitude` varchar(200),
	`place_longtitude` varchar(200)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

delete from place where place_latitude = '';
delete from place where place_latitude = '0';
delete from place where place_address = '';
alter table place add place_no bigint(20) primary key auto_increment;
alter table place add place_photo varchar(200);
alter table story add love_count int default 0;

create table `plan`(
	`plan_no` bigint(20) not null auto_increment,
	`user_no` bigint(20) not null,
    `start_date` date,
    `duration` int not null default 1,
    PRIMARY KEY (plan_no),
	FOREIGN KEY (user_no) REFERENCES user(user_no)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table `subplan`(
	`subplan_no` bigint(20) not null auto_increment,
	`plan_no` bigint(20) not null,
	`seq_no` int not null,
    PRIMARY KEY (subplan_no),
	FOREIGN KEY (plan_no) REFERENCES plan(plan_no)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table `planplace`(
	`planplace_no` bigint(20) not null auto_increment, 
	`subplan_no` bigint(20) not null,
	`latitude` varchar(25) not null,
    `longtitude` varchar(25) not null,
    `address` varchar(200),
    `place_name` varchar(200),
    `seq_no` int,
    PRIMARY KEY (planplace_no),
	FOREIGN KEY (subplan_no) REFERENCES subplan(subplan_no)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;




