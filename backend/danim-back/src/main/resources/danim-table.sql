

use danim;

# 확인하고 지울 것
-- DROP TABLE IF EXISTS `follow`;
-- DROP TABLE IF EXISTS `love`;
-- DROP TABLE IF EXISTS `comment`;
-- DROP TABLE IF EXISTS `photo`;
-- DROP TABLE IF EXISTS `substory`;
-- DROP TABLE IF EXISTS `story`;
-- DROP TABLE IF EXISTS `interest`;
-- DROP TABLE IF EXISTS `danimid`;
-- DROP TABLE IF EXISTS `oauthid`;
-- DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_no` bigint(20) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(15) NOT NULL,
  `gender` varchar(1) default null,
  `introduce` varchar(100), 
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
    `story_no` bigint(20) not null,
    `substory_no` bigint(20) not null,
    `user_no` bigint(20) not null,
    `latitude` varchar(25) not null,
    `longtitude` varchar(25) not null,
    `photo_content` varchar(300),
    `photo_filename` varchar(100) not null,
    `photo_date` DATETIME not null,    
    `photo_deleted` boolean default false,
    `address` varchar(100) ,
    `space_name` varchar(100),
    `tag`  ENUM('NONE', 'FOOD', 'SCENERY', 'PERSON') default 'NONE', 
    PRIMARY KEY (`photo_no`),
    FOREIGN KEY (`story_no`) REFERENCES `story`(`story_no`),
	FOREIGN KEY (`substory_no`) REFERENCES `substory`(`substory_no`),
	FOREIGN KEY (`user_no`) REFERENCES `user`(`user_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table `love`(
	`love_no` bigint(20) not null auto_increment,    
    `story_no` bigint(20) not null,
    `substory_no` bigint(20) not null,
    `user_no` bigint(20) not null,
	`photo_no` bigint(20) not null,
    PRIMARY KEY (`love_no`),
    FOREIGN KEY (`story_no`) REFERENCES `story`(`story_no`),
	FOREIGN KEY (`substory_no`) REFERENCES `substory`(`substory_no`),
    FOREIGN KEY (`photo_no`) REFERENCES `photo`(`photo_no`),
	FOREIGN KEY (`user_no`) REFERENCES `user`(`user_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table `comment`(
	`comment_no` bigint(20) not null auto_increment,    
    `story_no` bigint(20) not null,
    `substory_no` bigint(20) not null,
    `user_no` bigint(20) not null,
	`photo_no` bigint(20) not null,
    `comment_content` varchar(100),
    `comment_deleted` boolean not null default false,
    PRIMARY KEY (`comment_no`),
    FOREIGN KEY (`story_no`) REFERENCES `story`(`story_no`),
	FOREIGN KEY (`substory_no`) REFERENCES `substory`(`substory_no`),
    FOREIGN KEY (`photo_no`) REFERENCES `photo`(`photo_no`),
	FOREIGN KEY (`user_no`) REFERENCES `user`(`user_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table follow(
    follow_no bigint(20) not null auto_increment,
    follow_user_no varchar(20) not null,
    user_no bigint(20) not null,
    PRIMARY KEY (follow_no),
    FOREIGN KEY (user_no) REFERENCES user(user_no)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



use danim;
select * from user;
select * from danimid;
select * from interest;
select * from story;
select * from substory;
select * from photo;


