-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2023 at 07:45 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sus`
--

-- --------------------------------------------------------

--
-- Table structure for table `bigcategories`
--

CREATE TABLE `bigcategories` (
                                 `CatID` int(11) UNSIGNED NOT NULL,
                                 `CatName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bigcategories`
--

INSERT INTO `bigcategories` (`CatID`, `CatName`) VALUES
                                                     (1, 'IT'),
                                                     (2, 'Science basic');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
                              `CatID` int(11) UNSIGNED NOT NULL,
                              `CatName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
                              `CatParent` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`CatID`, `CatName`, `CatParent`) VALUES
                                                               (1, 'Web development', '1'),
                                                               (2, 'Basic programming', '1'),
                                                               (3, 'Math', '2'),
                                                               (4, 'Physics', '2'),
                                                               (5, 'Data science', '1');

-- --------------------------------------------------------

--
-- Table structure for table `chapter`
--

CREATE TABLE `chapter` (
                           `ChapID` int(11) UNSIGNED NOT NULL,
                           `ChapName` varchar(200) DEFAULT NULL,
                           `CourID` int(11) DEFAULT NULL,
                           `ChapOrder` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chapter`
--

INSERT INTO `chapter` (`ChapID`, `ChapName`, `CourID`, `ChapOrder`) VALUES
                                                                        (1, 'Nodejs Basics', 1, 1),
                                                                        (2, 'Clients - serrvers', 1, 2),
                                                                        (3, 'Request - responses', 1, 3),
                                                                        (4, 'Introduction to HMTL', 2, 1),
                                                                        (5, 'Creating the first web page', 2, 2),
                                                                        (6, 'Line breaks, spacing, and comments', 2, 3),
                                                                        (7, '1 - Introduction', 3, 1),
                                                                        (8, '2 - Changing font type, color, and size', 3, 2),
                                                                        (9, '3 - Add a line to header and border property', 3, 3),
                                                                        (10, 'Introduction + setup', 4, 1),
                                                                        (11, 'Variables', 4, 2),
                                                                        (12, 'Introduction', 5, 1),
                                                                        (13, 'What is spring', 5, 2),
                                                                        (14, 'Spring and some of its problems', 5, 3),
                                                                        (15, 'Introduction to Java', 6, 1),
                                                                        (16, 'Your first Java Program', 6, 2),
                                                                        (17, 'Variables and Types', 6, 3);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
                           `CourID` int(11) UNSIGNED NOT NULL,
                           `CourName` varchar(50) NOT NULL,
                           `dob` date NOT NULL,
                           `update` date NOT NULL,
                           `TinyDes` varchar(100) NOT NULL,
                           `FullDes` text NOT NULL,
                           `Price` int(11) NOT NULL,
                           `CatID` int(11) NOT NULL,
                           `score` float DEFAULT 0,
                           `TeacherID` int(11) DEFAULT NULL,
                           `Views` int(11) DEFAULT NULL,
                           `Block` int(1) DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`CourID`, `CourName`, `dob`, `update`, `TinyDes`, `FullDes`, `Price`, `CatID`, `score`, `TeacherID`, `Views`, `Block`) VALUES
                                                                                                                                                  (1, 'Nodejs tutorial', '2023-01-09', '2023-01-09', 'Nodejs for beginner', '<p>Work with one of the most in-demand web development programming languages</p>\n<p>Build modern, fast and scalable server-side web applications with NodeJS, databases like SQL or MongoDB and more</p>\n<p>Understand the NodeJS ecosystem and build server-side rendered apps, REST APIs and GraphQL APIs</p>', 999000, 1, 5, 2, 8, 0),
                                                                                                                                                  (2, 'HTML tutorial', '2023-01-09', '2023-01-09', 'Perfect course for web development', '<p>Knowing HTML is the first and most important step for those who want to build quality web pages.</p>\r\n<p>Students will learn how several programming languages, HTML + CSS, work together</p>\r\n<p>Learning the HTML programming language is a launching pad to a career in IT for those who want to work in this domain.</p>', 500000, 1, 0, 2, 0, 0),
                                                                                                                                                  (3, 'CSS - completed course 2023', '2023-01-09', '2023-01-09', 'CSS - one of things necessary for web development', '<p>Learn why CSS is amazing, not something to be afraid of!</p>\r\n<p>Flexbox, grid, animations, transitions, fonts, media queries and much more - it\'s all included!</p>\r\n<p>Understand the concepts and theory behind CSS and certain CSS features</p>', 870000, 1, 0, 2, 2, 0),
                                                                                                                                                  (4, 'Javascript newest course 2023 From zero to expert', '2023-01-09', '2023-01-09', 'Most fantastic programming language ', '<p>Become an advanced, confident, and modern JavaScript developer from scratch</p>\n<p>JavaScript fundamentals: variables, if/else, operators, boolean logic, functions, arrays, objects, loops, strings, etc.</p>\n<p>Modern ES6+ from the beginning: arrow functions, destructuring, spread operator, optional chaining (ES2020), etc.</p>\n<p>Complex concepts like the \'this\' keyword, higher-order functions, closures, etc.</p>', 1800000, 1, 0, 2, 0, 0),
                                                                                                                                                  (5, 'Spring boot java 2023', '2023-01-09', '2023-01-09', 'Java spring boot for everyone', '<p>You will learn to build a Web Application, REST API and Full Stack Application with Spring Boot and Spring Frameworks</p>\r\n<p>You will Learn Spring Framework the MODERN WAY - The way Real Projects use it!</p>', 0, 1, 0, 2, 1, 0),
                                                                                                                                                  (6, 'Java programming 2023', '2023-01-09', '2023-01-09', 'Basic language ', '<p>Learn the core Java skills needed to apply for Java developer positions in just 14 hours.</p>\r\n<p>Acquire essential java basics for transitioning to the Spring Framework, Java EE, Android development and more.</p>\r\n<p>Be able to demonstrate your understanding of Java to future employers.</p>', 700000, 2, 0, 3, 0, 0),
                                                                                                                                                  (7, 'Python programming 2023', '2023-01-09', '2023-01-09', 'The most popular programming language', '<p>You will master the Python programming language by building 100 unique projects over 100 days.</p>\r\n<p>You will be able to program in Python professionally</p>', 200000, 2, 0, 3, 0, 0),
                                                                                                                                                  (8, 'C++ tutorial course', '2023-01-09', '2023-01-09', 'First step in your career', '<p>Learn to program with one of the most powerful programming languages that exists today, C++.</p>\r\n<p>Obtain the key concepts of programming that will also apply to other programming languages</p>\r\n<p>Learn Modern C++ rather than an obsolete version of C++ that most other courses teach</p>', 499000, 2, 0, 3, 0, 0),
                                                                                                                                                  (9, 'C# course 2023', '2023-01-09', '2023-01-09', 'Best C# course', '<p>Learn the fundamentals of programming using C#</p>\r\n<p>Learn how to use variables, methods, loops, conditions</p>\r\n<p>Fully understand how OOP (object oriented Programming) works and how to use it.</p>\r\n<p>Build beautiful GUIs (Graphical User Interfaces) with WPF (Windows Presentation Foundation)</p>\r\n<p>Create video games using C# and Unity 3D</p>\r\n<p>Learn how to handle errors and avoid them</p>', 570000, 2, 0, 3, 1, 0),
                                                                                                                                                  (10, 'Caculus 1', '2023-01-09', '2023-01-09', 'Advanced math for everyone', '<p>Know the advanced knowledge of math</p>\r\n<p>Able to become PhD</p>', 100000, 3, 0, 4, 0, 0),
                                                                                                                                                  (11, 'Caculus 2', '2023-01-09', '2023-01-09', 'Hard math', '<p>Next to the caculus 1</p>\r\n<p>More advanced math</p>', 200000, 3, 0, 4, 0, 0),
                                                                                                                                                  (12, 'statistics and probability', '2023-01-09', '2023-01-09', 'Essential for data science', '<p>Statistic</p>\r\n<p>probability</p>', 150000, 3, 0, 4, 1, 0),
                                                                                                                                                  (13, 'fundamentals of physics', '2023-01-09', '2023-01-09', 'All about physics', '<p>Newton law</p>\r\n<p>E = m c with square</p>', 250000, 4, 0, 4, 0, 0),
                                                                                                                                                  (14, 'fundamentals of physics 2', '2023-01-09', '2023-01-09', 'More interesting physics for everyone', '<p>More about the physics</p>\r\n<p>Advanced physics</p>\r\n<p>Space</p>', 134000, 4, 0, 4, 2, 0),
                                                                                                                                                  (15, 'Machine learning course 2023', '2023-01-09', '2023-01-09', 'To the best scientist in computer', '<p>Solving regression problems (linear regression and logistic regression)</p>\r\n<p>Solving classification problems (naive Bayes classifier, Support Vector Machines - SVMs)</p>\r\n<p>Using neural networks (feedforward neural networks, deep neural networks, convolutional neural networks and recurrent neural networks</p>', 1500000, 5, 0, 3, 0, 0),
                                                                                                                                                  (16, 'Python for Data Science', '2023-01-09', '2023-01-09', 'Python for data sience', '<p>Use Python for Data Science and Machine Learning</p>\r\n<p>Use Spark for Big Data Analysis</p>\r\n<p>Implement Machine Learning Algorithms</p>\r\n<p>Learn to use NumPy for Numerical Data</p>\r\n<p>Learn to use Pandas for Data Analysis</p>\r\n<p>Learn to use Matplotlib for Python Plotting</p>\r\n<p>Learn to use Seaborn for statistical plots</p>', 240000, 5, 0, 3, 0, 0),
                                                                                                                                                  (17, 'Excel data analysis', '2023-01-09', '2023-01-09', 'Excel for data analysis', '<p>Take your data analysis skills from ZERO to PRO with Excel Pivot Tables</p>\r\n<p>Learn how to use Pivot Tables and Pivot Charts to streamline and absolutely revolutionize your workflow in Excel</p>\r\n<p>Master unique Pivot Table tips, tools and case studies that you won\'t find in ANY other course, guaranteed</p>', 270000, 5, 0, 2, 1, 0),
                                                                                                                                                  (18, 'PHP for Beginners', '2023-01-09', '2023-01-09', 'Php is trendy', '<p>You will learn to create a (CMS) Content Management System like WordPress, Drupal or Joomla</p>\r\n<p>You will learn how to use Databases</p>\r\n<p>You will learn MySQL</p>\r\n<p>Object Oriented Programming</p>\r\n<p>You will learn how to launch your application online</p>', 760000, 1, 0, 2, 0, 0),
                                                                                                                                                  (19, 'React - The Complete Guide', '2023-01-09', '2023-01-09', 'Reactjs to make web', '<p>Build powerful, fast, user-friendly and reactive web apps</p>\r\n<p>Provide amazing user experiences by leveraging the power of JavaScript with ease</p>\r\n<p>Apply for high-paid jobs or work as a freelancer in one the most-demanded sectors you can find in web dev right now</p>', 1450000, 1, 0, 2, 0, 0),
                                                                                                                                                  (20, 'Angular Bootcamp', '2023-01-09', '2023-01-09', 'Angular ', '<p>Build amazing single page applications with Angular and Typescript</p>\r\n<p>Master fundamental concepts behind structuring Angular applications</p>\r\n<p>Realize the power of building composable components</p>', 456700, 1, 0, 2, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `coursesrating`
--

CREATE TABLE `coursesrating` (
                                 `RatingID` int(11) UNSIGNED NOT NULL,
                                 `CourID` int(11) DEFAULT NULL,
                                 `StudentID` int(11) DEFAULT NULL,
                                 `Rating` int(11) DEFAULT NULL,
                                 `FeedBack` varchar(255) DEFAULT NULL,
                                 `dob` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coursesrating`
--

INSERT INTO `coursesrating` (`RatingID`, `CourID`, `StudentID`, `Rating`, `FeedBack`, `dob`) VALUES
                                                                                                 (1, 1, 5, 5, 'This course is so good', '2023-01-05'),
                                                                                                 (2, 1, 5, 1, 'so bad', '2023-01-06'),
                                                                                                 (3, 1, 5, 1, 'so bad', '2023-01-06'),
                                                                                                 (4, 1, 5, 1, 'so bad', '2023-01-06'),
                                                                                                 (5, 1, 5, 3, 'Not bad', '2023-01-06'),
                                                                                                 (6, 3, 5, 2, 'bad', '2023-01-06'),
                                                                                                 (7, 5, 5, 5, 'amazing', '2023-01-06'),
                                                                                                 (8, 9, 5, 5, 'fantastic', '2023-01-06'),
                                                                                                 (9, 14, 5, 3, 'normal', '2023-01-06'),
                                                                                                 (10, 12, 5, 1, 'dislike', '2023-01-06'),
                                                                                                 (11, 20, 5, 4, 'great', '2023-01-06'),
                                                                                                 (12, 1, 5, 3, 'now im think its normal', '2023-01-06'),
                                                                                                 (13, 17, 5, 3, 'good', '2023-01-06');

-- --------------------------------------------------------

--
-- Table structure for table `enroll`
--

CREATE TABLE `enroll` (
                          `CourID` int(11) NOT NULL,
                          `StudentID` int(11) NOT NULL,
                          `dob` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enroll`
--

INSERT INTO `enroll` (`CourID`, `StudentID`, `dob`) VALUES
                                                        (1, 5, '2023-01-06'),
                                                        (3, 5, '2023-01-07'),
                                                        (5, 5, '2023-01-08'),
                                                        (9, 5, '2023-01-05'),
                                                        (12, 5, '2023-01-05'),
                                                        (14, 5, '2023-01-07'),
                                                        (17, 5, '2023-01-05'),
                                                        (20, 5, '2023-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
                            `sid` varchar(255) NOT NULL,
                            `sess` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`sess`)),
                            `expired` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `sess`, `expired`) VALUES
                                                      ('ecPT7gc8YmwTZToWJSIi9mdvqTXfm_3F', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"auth\":true,\"authUser\":{\"id\":2,\"username\":\"admin\",\"email\":\"duongsong9a2@gmail.com\",\"description\":null,\"permission\":0,\"blocked\":null},\"Array\":{\"Array\":\"Price\"},\"Search\":{\"Search\":\"web\"}}', '2023-01-09 16:18:56'),
                                                      ('EDX4-NKkhidTQrcnRkfcJ-aUKz1LuOb-', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"auth\":false,\"Array\":{\"Array\":\"\"},\"Search\":{\"Search\":\"lập trình\"},\"authUser\":null,\"message\":\"changes success !!!\"}', '2023-01-09 14:39:42'),
                                                      ('NhhLIx1lV_AtDENVgydHRuZL_-60WE26', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"auth\":true,\"authUser\":{\"id\":1,\"username\":\"suyoung07\",\"email\":\"duongsong9a4@gmail.com\",\"description\":null,\"permission\":1,\"blocked\":0}}', '2023-01-09 09:02:52'),
                                                      ('uCtF6AJSU3fl7MCtf3ZXMd0xzSddYsbu', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"auth\":true,\"authUser\":{\"id\":5,\"username\":\"suyoung07\",\"password\":\"$2a$10$/2ghJ3f7idvfH42oNrF9Pes7LvXfY0HOkCOPpEUTu9mrEx2pFosZ2\",\"email\":\"duongsong9a4@gmail.com\",\"description\":null,\"permission\":2,\"blocked\":0}}', '2023-01-10 06:38:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
                         `id` int(11) NOT NULL,
                         `username` varchar(50) NOT NULL,
                         `password` varchar(255) NOT NULL,
                         `email` varchar(50) NOT NULL,
                         `description` varchar(200) DEFAULT NULL,
                         `permission` int(11) NOT NULL,
                         `blocked` tinyint(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `description`, `permission`, `blocked`) VALUES
                                                                                                        (1, 'admin', '$2a$10$xfoUPt4sx/zhOWOUke49Z.AOt8sQxqniyiJypLEdZjoCczAPgmjba', 'a@g.com', '', 0, NULL),
                                                                                                        (2, 'Duong Song', '$2a$10$CcOllRKq5Ht2JgHI98sgC.coakDwm5wMZiVT.zC3Zy127TfSfEcAG', 'duongsong9a0@gmail.com', 'guy love codes', 1, 0),
                                                                                                        (3, 'Uyen Nhi', '$2a$10$Sj2s5sU6al3YKuLjEQNW0uPtq6R.8q7Wl7idUUfkenmJ1B6n90iVa', 'unhing1901@gmail.com', NULL, 1, 0),
                                                                                                        (4, 'Quoc Huy', '$2a$10$ah3HC6P34IzfZGjzw8PdR.Idfe9KBa1vc8Tbn3BJjq1z6qQvscoY6', 'huynguyn2002@gmail.com', NULL, 1, 0),
                                                                                                        (5, 'suyoung07', '$2a$10$/2ghJ3f7idvfH42oNrF9Pes7LvXfY0HOkCOPpEUTu9mrEx2pFosZ2', 'duongsong9a4@gmail.com', NULL, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `wishcourses`
--

CREATE TABLE `wishcourses` (
                               `StudentID` int(11) NOT NULL,
                               `CourID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishcourses`
--

INSERT INTO `wishcourses` (`StudentID`, `CourID`) VALUES
                                                      (5, 1),
                                                      (5, 14);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bigcategories`
--
ALTER TABLE `bigcategories`
    ADD PRIMARY KEY (`CatID`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
    ADD PRIMARY KEY (`CatID`);

--
-- Indexes for table `chapter`
--
ALTER TABLE `chapter`
    ADD PRIMARY KEY (`ChapID`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
    ADD PRIMARY KEY (`CourID`);

--
-- Indexes for table `coursesrating`
--
ALTER TABLE `coursesrating`
    ADD PRIMARY KEY (`RatingID`);

--
-- Indexes for table `enroll`
--
ALTER TABLE `enroll`
    ADD PRIMARY KEY (`CourID`,`StudentID`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
    ADD PRIMARY KEY (`sid`),
    ADD KEY `sessions_expired_index` (`expired`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishcourses`
--
ALTER TABLE `wishcourses`
    ADD PRIMARY KEY (`StudentID`,`CourID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bigcategories`
--
ALTER TABLE `bigcategories`
    MODIFY `CatID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
    MODIFY `CatID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `chapter`
--
ALTER TABLE `chapter`
    MODIFY `ChapID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
    MODIFY `CourID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `coursesrating`
--
ALTER TABLE `coursesrating`
    MODIFY `RatingID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
