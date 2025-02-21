INSERT INTO User (name, email, phone, address, profile_pic, password, role, active, deleted, createdAt) VALUES
('Admin', 'admin@example.com', NULL, NULL, NULL, '$2b$10$onmVA0FKMKuSUhOwQxDSd.6WO0KvZBZdTEQTR15ubuxkyJuw7mIEG', 'admin', true, false, NOW());

INSERT INTO ClientProfile (firstName, lastName, dateOfBirth, gender, address, phoneNumber, email, createdAt, updatedAt) VALUES
('Jean', 'Dupont', '1985-06-15', 'male', '123 Rue de Paris, Paris', '0612345678', 'jean.dupont@example.com', NOW(), NOW()),
('Marie', 'Curie', '1978-11-07', 'female', '56 Avenue des Champs, Lyon', '0698765432', 'marie.curie@example.com', NOW(), NOW()),
('Lucas', 'Martin', '1990-02-20', 'male', '89 Boulevard Haussmann, Marseille', '0712345698', 'lucas.martin@example.com', NOW(), NOW()),
('Sophie', 'Lemoine', '1983-09-12', 'female', '77 Rue Lafayette, Bordeaux', '0756789123', 'sophie.lemoine@example.com', NOW(), NOW()),
('Thomas', 'Durand', '1995-04-25', 'male', '22 Rue de la République, Lille', '0678901234', 'thomas.durand@example.com', NOW(), NOW());

INSERT INTO Vehicle (brand, model, version, color, vin, internalId, mileage, licensePlate, fees, price, purchasePrice, img, isRental, `condition`, available, addedAt) VALUES
('Toyota', 'Corolla', 'XLE', 'Bleu', 'VIN123456789', 'INT123', 50000, 'AB-123-CD', 500, 15000, 12000, NULL, false, 'used', true, NOW()),
('Renault', 'Clio', 'Intens', 'Rouge', 'VIN987654321', 'INT987', 30000, 'CD-456-EF', 600, 13000, 10000, NULL, false, 'used', true, NOW()),
('Peugeot', '208', 'Allure', 'Noir', 'VIN567890123', 'INT567', 40000, 'EF-789-GH', 550, 14000, 11000, NULL, false, 'used', true, NOW()),
('BMW', 'X5', 'M Sport', 'Blanc', 'VIN246810121', 'INT246', 60000, 'GH-123-IJ', 700, 45000, 40000, NULL, false, 'used', true, NOW()),
('Mercedes', 'A-Class', 'AMG', 'Gris', 'VIN135791357', 'INT135', 25000, 'IJ-456-KL', 800, 38000, 35000, NULL, false, 'used', true, NOW());