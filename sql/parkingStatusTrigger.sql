DELIMITER //  
CREATE TRIGGER trigger_add_status_rows
AFTER INSERT ON serviceArea FOR EACH ROW
BEGIN  
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
END // 