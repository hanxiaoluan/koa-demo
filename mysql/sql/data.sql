CREATE TABLE IF NOT EXISTS `data` (
    `id` int(11) NOT NULL AUTO_INCREMENT ,
    `data_info` JSON DEFAULT NULL ,
    `create_time` VARCHAR(20) DEFAULT NULL ,
    `modified_time` VARCHAR(20) DEFAULT NULL ,
    `level` INT(11) DEFAULT NULL ,
    PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8