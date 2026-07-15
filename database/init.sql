CREATE DATABASE IF NOT EXISTS artefact_finder
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE artefact_finder;

CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    object_id INT NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    image_url TEXT,
    culture VARCHAR(255),
    period VARCHAR(255),
    medium VARCHAR(255),
    object_url TEXT,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
