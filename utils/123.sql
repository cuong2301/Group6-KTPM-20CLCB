use sus;
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `CatID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CatName` varchar(50) COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`CatID`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

BEGIN;
INSERT INTO `categories` VALUES (1, 'Lập trình web');
INSERT INTO `categories` VALUES (2, 'Lập trình thiết bị di động');
COMMIT;

DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (
	`CourID` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `CourName` varchar(50) COLLATE utf8_general_ci NOT NULL,
    `TinyDes` varchar(100) COLLATE utf8_general_ci NOT NULL,
	`FullDes` text COLLATE utf8_general_ci NOT NULL,
    `Price` int(11) NOT NULL,
    `CatID` int(11) NOT NULL,
    `teacher` varchar(50) COLLATE utf8_general_ci NOT NULL,
    PRIMARY KEY (`CourID`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
    