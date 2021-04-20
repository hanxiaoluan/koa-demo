CREATE TABLE IF NOT EXISTS `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT ,
    `email` VARCHAR(255) DEFAULT NULL ,
    `password` VARCHAR(255) DEFAULT NULL ,
    `name` VARCHAR(255) DEFAULT NULL ,
    `nick` VARCHAR(255) DEFAULT NULL ,
    `detail_info` JSON DEFAULT NULL ,
    `create_time` VARCHAR(20) DEFAULT NULL ,
    `modified_time` VARCHAR(20) DEFAULT NULL ,
    `level` INT(11) DEFAULT NULL ,
    PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8

INSERT INFO `user` SET  email='1@example.com',password='123456';


INSERT INFO `user` SET  eamil='2@example.com',password='123456';

INSERT INFO `user` set eamil='3@example.com',password='123456';

