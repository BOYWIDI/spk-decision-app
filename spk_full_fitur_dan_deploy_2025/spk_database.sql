CREATE DATABASE IF NOT EXISTS spk_app DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE spk_app;

-- Tabel admin
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
INSERT INTO admins (username, password) VALUES ('admin', '$2b$10$QJuyr6WmMv3phS/C6mQZjuDdqF4ziYZ/NRYI8tLdZ3gZTQJ/Gddzm'); -- password: admin

-- Tabel pengguna
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    age INT
);
-- password: user123
INSERT INTO users (username, password, name, role, age) VALUES 
('user1', '$2b$10$U5CDf9YPvqAM59xUwSHIru3Pr3BdWRFbWr02Ah8oN6Db9tN7AdL.a', 'User One', 'user', 25),
('admin2', '$2b$10$QJuyr6WmMv3phS/C6mQZjuDdqF4ziYZ/NRYI8tLdZ3gZTQJ/Gddzm', 'Admin Two', 'admin', 35);

-- Tabel pertanyaan
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL
);
INSERT INTO questions (text) VALUES ('Apakah Anda merokok?'), ('Apakah Anda rutin berolahraga?');

-- Tabel jawaban/respon
CREATE TABLE IF NOT EXISTS responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    answers TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);