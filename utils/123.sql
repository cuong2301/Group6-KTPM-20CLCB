use sus;
drop table if exists users;
create table sus.users
(
    id int auto_increment primary key,
    username   varchar(50)  not null,
    password   varchar(255) not null,
    email      varchar(50)  not null,
    permission int          not null
) engine = MyISAM;
INSERT INTO `users` VALUES (1,'admin','admin','a@g.com',0);
INSERT INTO `users` VALUES (2,'teacher','teacher','t@g.com',1);
INSERT INTO `users` VALUES (3,'user','uesr','u@g.com',2);
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
                              `CatID` int(11) unsigned NOT NULL AUTO_INCREMENT,
                              `CatName` varchar(50) COLLATE utf8_general_ci NOT NULL,
							  `CatParent` varchar(50) COLLATE utf8_general_ci,
                              primary key(`CatID`)
) ENGINE=MyISAM ;

BEGIN;
INSERT INTO `categories` VALUES (1, 'Lập trình web','');
INSERT INTO `categories` VALUES (2, 'Lập trình thiết bị di động','');
COMMIT;

DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (
                           `CourID` int(11) unsigned NOT NULL AUTO_INCREMENT,
                           `CourName` varchar(50) COLLATE utf8_general_ci NOT NULL,
                           `dob` date not null,
                           `update` date not null,
                           `TinyDes` varchar(100) COLLATE utf8_general_ci NOT NULL,
                           `FullDes` text COLLATE utf8_general_ci NOT NULL,
                           `Price` int(11) NOT NULL,
                           `CatID` int(11) NOT NULL,
                           `TeacherID` int(11),
                           `Views` int(11),
                           PRIMARY KEY (`CourID`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

BEGIN;
INSERT INTO `courses` VALUES (1,
                              'Freshwater Cultured Pearl','2022-08-03','2022-08-03', 'Freshwater Cultured Pearl, Citrine, Peridot & Amethyst Bracelet, 7.5\"', '<UL>\r\n    <LI>Metal stamp: 14k </LI>\r\n    <LI>Metal: yellow-ld</LI>\r\n    <LI>Material Type: amethyst, citrine, ld, pearl, peridot</LI>\r\n    <LI>Gem Type: citrine, peridot, amethyst</LI>\r\n    <LI>Length: 7.5 inches</LI>\r\n    <LI>Clasp Type: filigree-box</LI>\r\n    <LI>Total metal weight: 0.6 Grams</LI>\r\n</UL>\r\n<STRONG>Pearl Information</STRONG><BR>\r\n<UL>\r\n    <LI>Pearl type: freshwater-cultured</LI>\r\n</UL>\r\n<STRONG>Packaging Information</STRONG><BR>\r\n<UL>\r\n    <LI>Package: Regal Blue Sueded-Cloth Pouch</LI>\r\n</UL>',
                              1500000, 1, 2,1);
INSERT INTO `courses` VALUES (2, 'CK005','2022-08-02', '2022-08-03','Tinh xảo - sang trọng', '<UL>\r\n    <LI>Kim cương luôn là đồ trang sức thể hiện đẳng cấp của người sử dụng.</LI>\r\n    <LI>Không phải nói nhiều về những kiểu nhẫn dưới đây, chỉ có thể gói gọn trong cụm từ: tinh xảo và sang trọng</LI>\r\n    <LI>Thông tin nhà sản xuất: Torrini</LI>\r\n    <LI>Thông tin chi tiết: Cái này rất phù hợp cho bạn khi tặng nàng</LI>\r\n</UL>\r\n', 1800000000, 1, 29,1);
INSERT INTO `courses` VALUES (3, 'NV01TT','2021-03-02','2022-08-03', 'Tinh tế đến không ngờ', '<UL>\r\n    <LI>Tinh xảo và sang trọng</LI>\r\n    <LI>Thông tin nhà sản xuất: Torrini</LI>\r\n    <LI>Không chỉ có kiểu dáng truyền thống chỉ có một hạt kim cương ở giữa, các nhà thiết kế đã tạo những những chiếc nhẫn vô cùng độc đáo và tinh tế.</LI>\r\n    <LI>Tuy nhiên, giá của đồ trang sức này thì chỉ có dân chơi mới có thể kham được</LI>\r\n</UL>\r\n', 500000000, 1, 49,1);
INSERT INTO `courses` VALUES (4, 'Lập trình python','2022-07-25','2022-08-03', 'Nữ tính - trẻ trung', '<UL>\r\n    <LI>General: 2G Network, GSM 900 / 1800 / 1900</LI>\r\n    <LI>Size:&nbsp; 99 x 45 x 18.6 mm, 73 cc</LI>\r\n    <LI>Weight: 95 g</LI>\r\n    <LI>Display: type TFT, 65K colors</LI>\r\n    <LI>Size: 128 x 160 pixels, 28 x 35 mm</LI>\r\n</UL>\r\n', 2400000, 1, 0,1);
INSERT INTO `courses` VALUES (5, 'Lập trình web','2022-09-27', '2022-08-03','Nữ tính - trẻ trung', '<UL>\r\n    <LI>General: 2G Network, GSM 900 / 1800 / 1900</LI>\r\n    <LI>Size:&nbsp; 99 x 45 x 18.6 mm, 73 cc</LI>\r\n    <LI>Weight: 95 g</LI>\r\n    <LI>Display: type TFT, 65K colors</LI>\r\n    <LI>Size: 128 x 160 pixels, 28 x 35 mm</LI>\r\n</UL>\r\n', 2400000, 2, 0,1);
INSERT INTO `courses` VALUES (6, 'Cấu trúc dữ liệu giải thuật','2022-08-03','2022-02-12', 'Nữ tính - trẻ trung', '<UL>\r\n    <LI>General: 2G Network, GSM 900 / 1800 / 1900</LI>\r\n    <LI>Size:&nbsp; 99 x 45 x 18.6 mm, 73 cc</LI>\r\n    <LI>Weight: 95 g</LI>\r\n    <LI>Display: type TFT, 65K colors</LI>\r\n    <LI>Size: 128 x 160 pixels, 28 x 35 mm</LI>\r\n</UL>\r\n', 2400000, 2, 0,123);
INSERT INTO `courses` VALUES (7, 'Reponsivve','2022-12-14','2022-08-03', 'Nữ tính - trẻ trung', '<UL>\r\n    <LI>General: 2G Network, GSM 900 / 1800 / 1900</LI>\r\n    <LI>Size:&nbsp; 99 x 45 x 18.6 mm, 73 cc</LI>\r\n    <LI>Weight: 95 g</LI>\r\n    <LI>Display: type TFT, 65K colors</LI>\r\n    <LI>Size: 128 x 160 pixels, 28 x 35 mm</LI>\r\n</UL>\r\n', 2400000, 2, 0,123);
INSERT INTO `courses` VALUES (8, 'HTML, CSS, Javascript','2022-10-14','2022-08-03', 'Nữ tính - trẻ trung', '<UL>\r\n    <LI>General: 2G Network, GSM 900 / 1800 / 1900</LI>\r\n    <LI>Size:&nbsp; 99 x 45 x 18.6 mm, 73 cc</LI>\r\n    <LI>Weight: 95 g</LI>\r\n    <LI>Display: type TFT, 65K colors</LI>\r\n    <LI>Size: 128 x 160 pixels, 28 x 35 mm</LI>\r\n</UL>\r\n', 2400000, 2, 0,123);
INSERT INTO `courses` VALUES (9, 'Lập trình ứng dụng java','2022-01-19','2022-08-03', 'Nữ tính - trẻ trung', '<UL>\r\n    <LI>General: 2G Network, GSM 900 / 1800 / 1900</LI>\r\n    <LI>Size:&nbsp; 99 x 45 x 18.6 mm, 73 cc</LI>\r\n    <LI>Weight: 95 g</LI>\r\n    <LI>Display: type TFT, 65K colors</LI>\r\n    <LI>Size: 128 x 160 pixels, 28 x 35 mm</LI>\r\n</UL>\r\n', 2400000, 2, 0,123);
INSERT INTO `courses` VALUES (10, 'Mạng máy tính','2022-11-14','2022-08-03', 'Nữ tính - trẻ trung', '<UL>\r\n    <LI>General: 2G Network, GSM 900 / 1800 / 1900</LI>\r\n    <LI>Size:&nbsp; 99 x 45 x 18.6 mm, 73 cc</LI>\r\n    <LI>Weight: 95 g</LI>\r\n    <LI>Display: type TFT, 65K colors</LI>\r\n    <LI>Size: 128 x 160 pixels, 28 x 35 mm</LI>\r\n</UL>\r\n', 2400000, 2, 0,123);
commit;
drop table IF EXISTS `ENROLL`;
CREATE TABLE `ENROLL`(
                         `CourID` int(11),
                         `StudentID` int(11),
                         PRIMARY KEY (`CourID`,`StudentID`)
);

BEGIN;
insert into `ENROLL` values(1,21);
insert into `ENROLL` values(2,31);
insert into `ENROLL` values(1,41);
insert into `ENROLL` values(1,51);
insert into `ENROLL` values(1,52);
insert into `ENROLL` values(3,34);
insert into `ENROLL` values(1,61);
insert into `ENROLL` values(1,71);
insert into `ENROLL` values(1,81);
insert into `ENROLL` values(5,11);
insert into `ENROLL` values(1,13);
insert into `ENROLL` values(1,18);
insert into `ENROLL` values(5,88);
insert into `ENROLL` values(1,49);
insert into `ENROLL` values(1,75);
insert into `ENROLL` values(4,30);
insert into `ENROLL` values(1,66);
commit;


drop table if exists `CoursesRating`;
create table `CoursesRating`(
                                `RatingID` int(11),
                                `CourID` int(11),
                                `StudentID` int(11),
                                `Rating` int,
                                `FeedBack` nvarchar(255),
                                `dob` date,
                                primary key(`RatingID`)
);

drop table if exists `WishCourses`;
create table `WishCourses`(
                              `StudentID` int(11),
                              `CourID` int(11),
                              primary key (`StudentID`,`CourID`)
)