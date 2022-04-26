DROP TABLE IF EXISTS parkingStatus;
CREATE TABLE parkingStatus (
  parkingId INT PRIMARY KEY AUTO_INCREMENT,
  slotId INT(100),
  areaId INT,
  FOREIGN KEY (areaId) REFERENCES serviceArea(areaId),
  parkingRecordId INT DEFAULT 1,
  status VARCHAR(256) DEFAULT "parked"; -- parked and released
  FOREIGN KEY (parkingRecordId) REFERENCES parkingRecords(parkingRecordId)
);