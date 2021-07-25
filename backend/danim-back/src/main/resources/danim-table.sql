use danim;

# 확인하고 지울 것
-- DROP TABLE IF EXISTS `danimid`;
-- DROP TABLE IF EXISTS `oauthid`;
-- DROP TABLE IF EXISTS `user`;


CREATE TABLE `User` (
  `user_no` bigint(20) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(15) NOT NULL,
  `role_id` int(3) DEFAULT NULL,
  `gender` varchar(1) default null,
  `age` int,  
  `role` varchar(20) default 'member', 
  `created_date` datetime,
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
    `password` varchar(30) not null,
     PRIMARY KEY (`id`),
	 FOREIGN KEY (`user_no`) REFERENCES `user`(`user_no`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



