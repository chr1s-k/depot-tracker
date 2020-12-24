CREATE DATABASE IF NOT EXISTS keycloakdb;
CREATE USER IF NOT EXISTS 'keycloakuser'@'%' IDENTIFIED BY 'keycloakpw';
GRANT ALL PRIVILEGES ON keycloakdb.* TO 'keycloakuser'@'%';
FLUSH PRIVILEGES;
