USE c9;
CREATE TABLE access_recode (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    time TIMESTAMP NOT NULL,
    ip VARCHAR(20),
    city VARCHAR(30),
    country VARCHAR(10),
    longitude DECIMAL(7,4),
    latitude DECIMAL(7,4)
);