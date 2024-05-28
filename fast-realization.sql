-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: later-transfer-to-oracle
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fast_realization`
--

DROP TABLE IF EXISTS `fast_realization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fast_realization` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author` varchar(100) DEFAULT NULL,
  `numPpu` int DEFAULT NULL,
  `problem` text,
  `proposal` text,
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fast_realization`
--

LOCK TABLES `fast_realization` WRITE;
/*!40000 ALTER TABLE `fast_realization` DISABLE KEYS */;
INSERT INTO `fast_realization` VALUES (1,'TEST',1,'TEST','TEST','C:\\Practice\\PPU\\ppu\\src\\images\\photo.jpg');
/*!40000 ALTER TABLE `fast_realization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tsz_ppu`
--

DROP TABLE IF EXISTS `tsz_ppu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsz_ppu` (
  `ID_POZ` int unsigned NOT NULL,
  `ID_DEP` int DEFAULT NULL,
  `NAME_WORK` varchar(255) DEFAULT NULL,
  `TEC_SOST` varchar(255) DEFAULT NULL,
  `PROBLEM` varchar(255) DEFAULT NULL,
  `RESUME` varchar(255) DEFAULT NULL,
  `REC_BEFORE` varchar(255) DEFAULT NULL,
  `REC_TARGET` varchar(255) DEFAULT NULL,
  `AFTER` varchar(255) DEFAULT NULL,
  `RESULT` varchar(255) DEFAULT NULL,
  `RES_AFTER` varchar(255) DEFAULT NULL,
  `YEAR` varchar(255) DEFAULT NULL,
  `ID_USER` varchar(255) DEFAULT NULL,
  `RES` varchar(255) DEFAULT NULL,
  `PZ` varchar(255) DEFAULT NULL,
  `EP` varchar(255) DEFAULT NULL,
  `PPU_ID` varchar(255) DEFAULT NULL,
  `SOGLASOVANNO` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_POZ`),
  UNIQUE KEY `ID_POZ_UNIQUE` (`ID_POZ`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsz_ppu`
--

LOCK TABLES `tsz_ppu` WRITE;
/*!40000 ALTER TABLE `tsz_ppu` DISABLE KEYS */;
/*!40000 ALTER TABLE `tsz_ppu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tsz_ppu_tip`
--

DROP TABLE IF EXISTS `tsz_ppu_tip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsz_ppu_tip` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsz_ppu_tip`
--

LOCK TABLES `tsz_ppu_tip` WRITE;
/*!40000 ALTER TABLE `tsz_ppu_tip` DISABLE KEYS */;
INSERT INTO `tsz_ppu_tip` VALUES (1,'Снижение времени процесса'),(2,'Снижение затрат на реализацию'),(3,'Повышение безопасности '),(4,'Повышение качества продукции'),(5,'Повышение производительности труда'),(6,'Повышение уолвня культуры работы'),(7,'Снижение времени процесса'),(8,'Снижение затратна реализацию');
/*!40000 ALTER TABLE `tsz_ppu_tip` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28 15:34:59
