DELETE TABLE IF EXISTS parkingRecords;
CREATE TABLE parkingRecords(
  parkingRecordId INT PRIMARY KEY AUTO_INCREMENT,
  areaId INT,
  FOREIGN KEY (areaId) REFERENCES serviceArea(areaId),
  vehicleClass VARCHAR(256) NOT NULL,
  registrationNumber VARCHAR(256) NOT NULL,
  parkingDuration VARCHAR(500) NOT NULL,
  ownerName VARCHAR(256) NOT NULL,
  ownerAddress TEXT NOT NULL,
  createdTime DATETIME DEFAULT NOW()
);
-- INSERT DEFAULT VALUE
INSERT INTO parkingRecords (areaId, vehicleClass, registrationNumber, parkingDuration, ownerName,
ownerAddress) VALUES (1, 'Car', 'NA', '1', 'NA', 'NA');