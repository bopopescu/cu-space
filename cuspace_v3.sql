CREATE TABLE `Job` (
  `Job_id` int(10) NOT NULL,
  `Job_name` varchar(1000) NOT NULL,
  `Job_info` varchar(1000) NOT NULL,
  `Start_date` date NOT NULL,
  `End_date` date NOT NULL,
  `Create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Company_id` varchar(36) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` int(10) NOT NULL,
  `Website` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Job`
--
ALTER TABLE `Job`
  ADD PRIMARY KEY (`Job_id`);


  -- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 25, 2018 at 07:34 PM
-- Server version: 5.6.35
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `CUSPACE`
--

-- --------------------------------------------------------

--
-- Table structure for table `Job_applicant`
--

CREATE TABLE `Job_applicant` (
  `Applicant_id` int(10) NOT NULL,
  `Job_id` int(10) NOT NULL,
  `User_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Job_applicant`
--
ALTER TABLE `Job_applicant`
  ADD PRIMARY KEY (`Applicant_id`);

-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 25, 2018 at 07:34 PM
-- Server version: 5.6.35
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `CUSPACE`
--

-- --------------------------------------------------------

--
-- Table structure for table `Job_category`
--

CREATE TABLE `Job_category` (
  `Job_cat_id` int(10) NOT NULL,
  `Job_cat_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Job_category`
--
ALTER TABLE `Job_category`
  ADD PRIMARY KEY (`Job_cat_id`);

-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 25, 2018 at 07:34 PM
-- Server version: 5.6.35
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `CUSPACE`
--

-- --------------------------------------------------------

--
-- Table structure for table `Job_category_group`
--

CREATE TABLE `Job_category_group` (
  `Job_cat_group_id` int(10) NOT NULL,
  `Job_id` int(10) NOT NULL,
  `Job_cat_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Job_category_group`
--
ALTER TABLE `Job_category_group`
  ADD PRIMARY KEY (`Job_cat_group_id`);

-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 25, 2018 at 07:34 PM
-- Server version: 5.6.35
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `CUSPACE`
--

-- --------------------------------------------------------

--
-- Table structure for table `Company`
--

CREATE TABLE `Company` (
  `Company_id` varchar(36) NOT NULL,
  `Company_name` varchar(1000) NOT NULL,
  `Company_info` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Company`
--
ALTER TABLE `Company`
  ADD PRIMARY KEY (`Company_id`);
