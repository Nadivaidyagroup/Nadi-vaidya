<?php

/*
=========================================
DATABASE CONNECTION
=========================================
*/

include "config/db.php";

/*
=========================================
CREATE ADMINS TABLE
=========================================
*/

$admins = "

CREATE TABLE IF NOT EXISTS admins (

  id INT PRIMARY KEY AUTO_INCREMENT,

  name VARCHAR(255) NOT NULL,

  email VARCHAR(255) NOT NULL UNIQUE,

  password VARCHAR(255) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)

";

/*
=========================================
CREATE BLOGS TABLE
=========================================
*/

$blogs = "

CREATE TABLE IF NOT EXISTS blogs (

  id INT PRIMARY KEY AUTO_INCREMENT,

  title VARCHAR(255) NOT NULL,

  slug VARCHAR(255) NOT NULL UNIQUE,

  category VARCHAR(255),

  author VARCHAR(255),

  image TEXT,

  excerpt TEXT,

  content LONGTEXT,

  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)

";

/*
=========================================
CREATE CONTACT FORMS TABLE
=========================================
*/

$contactForms = "

CREATE TABLE IF NOT EXISTS contact_forms (

  id INT PRIMARY KEY AUTO_INCREMENT,

  name VARCHAR(255) NOT NULL,

  email VARCHAR(255) NOT NULL,

  phone VARCHAR(50),

  message TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)

";

/*
=========================================
CREATE DOSHA FORMS TABLE
=========================================
*/

$doshaForms = "

CREATE TABLE IF NOT EXISTS dosha_forms (

  id INT PRIMARY KEY AUTO_INCREMENT,

  name VARCHAR(255) NOT NULL,

  email VARCHAR(255) NOT NULL,

  phone VARCHAR(50),

  result VARCHAR(100),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)

";

/*
=========================================
CREATE NADI FORMS TABLE
=========================================
*/

$nadiForms = "

CREATE TABLE IF NOT EXISTS nadi_forms (

  id INT PRIMARY KEY AUTO_INCREMENT,

  name VARCHAR(255) NOT NULL,

  gender VARCHAR(50),

  age VARCHAR(50),

  education VARCHAR(255),

  phone VARCHAR(50),

  whatsapp VARCHAR(50),

  email VARCHAR(255),

  country VARCHAR(255),

  city VARCHAR(255),

  state VARCHAR(255),

  address TEXT,

  message TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)

";

/*
=========================================
RUN ALL TABLES
=========================================
*/

mysqli_query($conn, $admins);

mysqli_query($conn, $blogs);

mysqli_query($conn, $contactForms);

mysqli_query($conn, $doshaForms);

mysqli_query($conn, $nadiForms);

/*
=========================================
SUCCESS MESSAGE
=========================================
*/

echo "

<h2 style='font-family:Arial;color:green;'>

✅ All Tables Created Successfully

</h2>

";

?>