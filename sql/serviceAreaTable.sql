DROP TABLE IF EXISTS serviceArea;
CREATE TABLE serviceArea (
  areaId INT PRIMARY KEY AUTO_INCREMENT,
  city VARCHAR(512) NOT NULL,
  area VARCHAR(512) NOT NULL
);

-- INSERT STATEMENTS
INSERT INTO serviceArea (city, area) VALUES ("DEFAULT", "DEFAULT");

INSERT INTO serviceArea (city, area) 
  VALUES ("Jalandhar", "LPU Mall");
INSERT INTO serviceArea (city, area) 
  VALUES ("Jalandhar", "LPU Law Gate");
-- ====================================
INSERT INTO serviceArea (city, area) 
  VALUES ("Chandigarh", "Elante Mall");
-- ====================================
INSERT INTO serviceArea (city, area) 
  VALUES ("Amritsar", "Gloden Temple Parking Area");
-- ====================================
INSERT INTO serviceArea (city, area) 
  VALUES ("Ranchi", "Lalpur");
INSERT INTO serviceArea (city, area) 
  VALUES ("Ranchi", "SAIL Township");
-- ====================================