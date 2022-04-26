-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2022 at 02:12 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_parking`
--

-- --------------------------------------------------------

--
-- Table structure for table `incident`
--

CREATE TABLE `incident` (
  `incidentId` int(11) NOT NULL,
  `incidentType` varchar(256) DEFAULT NULL,
  `severityLevel` varchar(256) DEFAULT NULL,
  `accountNumber` varchar(1024) DEFAULT NULL,
  `customerName` varchar(512) DEFAULT NULL,
  `incidentTitle` varchar(256) DEFAULT NULL,
  `incidentDecription` text DEFAULT NULL,
  `assignedTo` int(11) DEFAULT NULL,
  `status` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `parkingrecords`
--

CREATE TABLE `parkingrecords` (
  `parkingRecordId` int(11) NOT NULL,
  `areaId` int(11) DEFAULT NULL,
  `vehicleClass` varchar(256) NOT NULL,
  `registrationNumber` varchar(256) NOT NULL,
  `parkingDuration` varchar(500) NOT NULL,
  `ownerName` varchar(256) NOT NULL,
  `ownerAddress` text NOT NULL,
  `createdTime` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `parkingrecords`
--

INSERT INTO `parkingrecords` (`parkingRecordId`, `areaId`, `vehicleClass`, `registrationNumber`, `parkingDuration`, `ownerName`, `ownerAddress`, `createdTime`) VALUES
(1, 7, 'Car', 'NA', '1', 'akash', 'Kathua', '2022-04-05 20:13:37'),
(12, 8, 'Bike', 'JH-123-123-PQ', '5', 'akash', 'Kathua', '2022-04-09 15:12:53'),
(13, 8, 'Bike', 'JH-123-123-PQ', '5', 'akash', 'Kathua', '2022-04-09 15:14:22'),
(14, 8, 'Bike', 'JH-123-123-PQ', '5', 'akash', 'Kathua', '2022-04-09 15:17:19'),
(15, 9, 'Car', 'JH-123-123-PQ', '5', 'akash', 'Kathua', '2022-04-09 18:51:34'),
(16, 11, 'Bike', 'JH-123-123-PQ', '5', 'akash', 'Kathua', '2022-04-09 19:05:13'),
(17, 10, 'Bus', 'JH-123-123-PQ', '5', 'akash', 'Kathua', '2022-04-09 19:08:46'),
(18, 13, 'Pickup truck', 'JH-123-123-PQ', '5', 'akash', 'Kathua', '2022-04-09 19:45:31'),
(19, 13, 'SUV', 'JH-123-123-PQR', '2', 'akash', 'Kathua', '2022-04-10 07:46:50'),
(20, 9, 'SUV', 'JH-123-123-PQ', '5', 'akash', 'Kathua', '2022-04-10 14:31:55'),
(21, 8, 'Pickup truck', 'JH-123-123-PQ', '5', 'akash', 'Kathua', '2022-04-10 14:32:57'),
(22, 10, 'Car', 'PNG-237-J', '2', 'Akash', 'Kathua', '2022-04-23 10:36:28');

-- --------------------------------------------------------

--
-- Table structure for table `parkingstatus`
--

CREATE TABLE `parkingstatus` (
  `parkingId` int(11) NOT NULL,
  `slotId` int(100) DEFAULT NULL,
  `areaId` int(11) DEFAULT NULL,
  `parkingRecordId` int(11) DEFAULT 1,
  `status` varchar(256) DEFAULT 'parked'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `parkingstatus`
--

INSERT INTO `parkingstatus` (`parkingId`, `slotId`, `areaId`, `parkingRecordId`, `status`) VALUES
(2, 1, 8, 1, 'parked'),
(3, 2, 8, 12, 'parked'),
(4, 3, 8, 12, 'parked'),
(5, 4, 8, 12, 'parked'),
(6, 5, 8, 12, 'parked'),
(7, 6, 8, 12, 'parked'),
(8, 7, 8, 14, 'parked'),
(9, 8, 8, 21, 'parked'),
(10, 9, 8, 12, 'parked'),
(11, 10, 8, 12, 'parked'),
(12, 11, 8, 12, 'parked'),
(13, 12, 8, 12, 'parked'),
(14, 1, 9, 15, 'parked'),
(15, 2, 9, 20, 'parked'),
(16, 3, 9, 1, 'free'),
(17, 4, 9, 1, 'free'),
(18, 5, 9, 1, 'free'),
(19, 6, 9, 1, 'free'),
(20, 7, 9, 1, 'free'),
(21, 8, 9, 1, 'free'),
(22, 9, 9, 1, 'free'),
(23, 10, 9, 1, 'free'),
(24, 11, 9, 1, 'free'),
(25, 12, 9, 1, 'free'),
(26, 1, 10, 1, 'free'),
(27, 2, 10, 1, 'free'),
(28, 3, 10, 1, 'free'),
(29, 4, 10, 1, 'free'),
(30, 5, 10, 1, 'free'),
(31, 6, 10, 1, 'free'),
(32, 7, 10, 1, 'free'),
(33, 8, 10, 1, 'free'),
(34, 9, 10, 1, 'free'),
(35, 10, 10, 1, 'free'),
(36, 11, 10, 1, 'free'),
(37, 12, 10, 1, 'free'),
(38, 1, 11, 1, 'free'),
(39, 2, 11, 1, 'free'),
(40, 3, 11, 1, 'free'),
(41, 4, 11, 1, 'free'),
(42, 5, 11, 1, 'free'),
(43, 6, 11, 1, 'free'),
(44, 7, 11, 1, 'free'),
(45, 8, 11, 1, 'free'),
(46, 9, 11, 1, 'free'),
(47, 10, 11, 1, 'free'),
(48, 11, 11, 1, 'free'),
(49, 12, 11, 1, 'free'),
(50, 1, 12, 1, 'free'),
(51, 2, 12, 1, 'free'),
(52, 3, 12, 1, 'free'),
(53, 4, 12, 1, 'free'),
(54, 5, 12, 1, 'free'),
(55, 6, 12, 1, 'free'),
(56, 7, 12, 1, 'free'),
(57, 8, 12, 1, 'free'),
(58, 9, 12, 1, 'free'),
(59, 10, 12, 1, 'free'),
(60, 11, 12, 1, 'free'),
(61, 12, 12, 1, 'free'),
(62, 1, 13, 1, 'free'),
(63, 2, 13, 1, 'free'),
(64, 3, 13, 1, 'free'),
(65, 4, 13, 1, 'free'),
(66, 5, 13, 1, 'free'),
(67, 6, 13, 1, 'free'),
(68, 7, 13, 1, 'free'),
(69, 8, 13, 1, 'free'),
(70, 9, 13, 1, 'free'),
(71, 10, 13, 1, 'free'),
(72, 11, 13, 1, 'free'),
(73, 12, 13, 1, 'free');

-- --------------------------------------------------------

--
-- Table structure for table `servicearea`
--

CREATE TABLE `servicearea` (
  `areaId` int(11) NOT NULL,
  `city` varchar(512) NOT NULL,
  `area` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `servicearea`
--

INSERT INTO `servicearea` (`areaId`, `city`, `area`) VALUES
(7, 'DEFAULT', 'DEFAULT'),
(8, 'Jalandhar', 'LPU Mall'),
(9, 'Jalandhar', 'LPU Law Gate'),
(10, 'Chandigarh', 'Elante Mall'),
(11, 'Amritsar', 'Golden Temple Parking Area'),
(12, 'Ranchi', 'Lalpur'),
(13, 'Ranchi', 'SAIL Township');

--
-- Triggers `servicearea`
--
DELIMITER $$
CREATE TRIGGER `trigger_add_status_rows` AFTER INSERT ON `servicearea` FOR EACH ROW BEGIN  
    INSERT INTO parkingStatus (slotId, areaId, parkingRecordId) VALUES (1, NEW.areaId, 1);
    INSERT INTO parkingStatus (slotId, areaId, parkingRecordId) VALUES (2, NEW.areaId, 1);
    INSERT INTO parkingStatus (slotId, areaId, parkingRecordId) VALUES (3, NEW.areaId, 1);
    INSERT INTO parkingStatus (slotId, areaId, parkingRecordId) VALUES (4, NEW.areaId, 1);
    INSERT INTO parkingStatus (slotId, areaId, parkingRecordId) VALUES (5, NEW.areaId, 1);
    INSERT INTO parkingStatus (slotId, areaId, parkingRecordId) VALUES (6, NEW.areaId, 1);
    INSERT INTO parkingStatus (slotId, areaId, parkingRecordId) VALUES (7, NEW.areaId, 1);
    INSERT INTO parkingStatus (slotId, areaId, parkingRecordId) VALUES (8, NEW.areaId, 1);
    INSERT INTO parkingStatus (slotId, areaId, parkingRecordId) VALUES (9, NEW.areaId, 1);
    INSERT INTO parkingStatus (slotId, areaId, parkingRecordId) VALUES (10, NEW.areaId, 1);
    INSERT INTO parkingStatus (slotId, areaId, parkingRecordId) VALUES (11, NEW.areaId, 1);
    INSERT INTO parkingStatus (slotId, areaId, parkingRecordId) VALUES (12, NEW.areaId, 1);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `userEmail` varchar(256) NOT NULL,
  `password` varchar(500) NOT NULL,
  `fullName` varchar(500) NOT NULL,
  `isAdmin` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `userEmail`, `password`, `fullName`, `isAdmin`) VALUES
(1, 'admin@gmail.com', 'test1234', 'Akash Andotra', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `incident`
--
ALTER TABLE `incident`
  ADD PRIMARY KEY (`incidentId`),
  ADD KEY `assignedTo` (`assignedTo`);

--
-- Indexes for table `parkingrecords`
--
ALTER TABLE `parkingrecords`
  ADD PRIMARY KEY (`parkingRecordId`),
  ADD KEY `areaId` (`areaId`);

--
-- Indexes for table `parkingstatus`
--
ALTER TABLE `parkingstatus`
  ADD PRIMARY KEY (`parkingId`),
  ADD KEY `areaId` (`areaId`),
  ADD KEY `parkingRecordId` (`parkingRecordId`);

--
-- Indexes for table `servicearea`
--
ALTER TABLE `servicearea`
  ADD PRIMARY KEY (`areaId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userEmail` (`userEmail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `incident`
--
ALTER TABLE `incident`
  MODIFY `incidentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `parkingrecords`
--
ALTER TABLE `parkingrecords`
  MODIFY `parkingRecordId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `parkingstatus`
--
ALTER TABLE `parkingstatus`
  MODIFY `parkingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `servicearea`
--
ALTER TABLE `servicearea`
  MODIFY `areaId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `incident`
--
ALTER TABLE `incident`
  ADD CONSTRAINT `incident_ibfk_1` FOREIGN KEY (`assignedTo`) REFERENCES `user` (`userId`);

--
-- Constraints for table `parkingrecords`
--
ALTER TABLE `parkingrecords`
  ADD CONSTRAINT `parkingrecords_ibfk_1` FOREIGN KEY (`areaId`) REFERENCES `servicearea` (`areaId`);

--
-- Constraints for table `parkingstatus`
--
ALTER TABLE `parkingstatus`
  ADD CONSTRAINT `parkingstatus_ibfk_1` FOREIGN KEY (`areaId`) REFERENCES `servicearea` (`areaId`),
  ADD CONSTRAINT `parkingstatus_ibfk_2` FOREIGN KEY (`parkingRecordId`) REFERENCES `parkingrecords` (`parkingRecordId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
