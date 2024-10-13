--
--
-- Create Tables
--

CREATE TABLE `User`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `UserName` VARCHAR(255) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `FirstName` VARCHAR(255) NOT NULL,
    `LastName` VARCHAR(255) NOT NULL, 
    `Preference` VARCHAR (255) NULL
);
CREATE TABLE `Fridge`(
    `id` INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `UserId` INT  NOT NULL,
    `Ingredient` VARCHAR(255) NOT NULL,
    `ExpirationDate` DATE NULL,
    `Category` VARCHAR(255) NOT NULL,
    `Quantity` INT NOT NULL,
    `Unit` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`UserId`) REFERENCES `User`(`id`)ON DELETE CASCADE
);

