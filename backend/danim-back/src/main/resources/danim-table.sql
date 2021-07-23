use danim;

# 확인하고 지울 것
-- DROP TABLE IF EXISTS `token`;
-- DROP TABLE IF EXISTS `danimid`;
-- DROP TABLE IF EXISTS `oauthid`;
-- DROP TABLE IF EXISTS `user`;
-- DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(3) not null default '100',
  `name` varchar(10) not null,
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

create table `Token`(
	`token_no` bigint(20) not null AUTO_INCREMENT,
    `refresh_token` varchar(200),
    `create_date` DATETIME not null,
    PRIMARY KEY(`token_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `User` (
  `user_no` bigint(20) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(15) NOT NULL,
  `role_id` int(3) DEFAULT NULL,
  `gender` varchar(1) default null,
  `age` int,  
  token_no bigint(20) not null,
  PRIMARY KEY (`user_no`),
  FOREIGN KEY (`role_id`) REFERENCES `role`(`id`),
  FOREIGN KEY(`token_no`) REFERENCES `Token`(`token_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


create TABLE `oauthid` (
	`id` varchar(30) not null,
    `user_no` bigint(20) not null,
    `type` varchar(15) not null,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_no`) REFERENCES `user`(`user_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


create table `danimid`(
	`id` varchar(30) not null,
    `user_no` bigint(20) not null,
    `password` varchar(30) not null,
     PRIMARY KEY (`id`),
	 FOREIGN KEY (`user_no`) REFERENCES `user`(`user_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



