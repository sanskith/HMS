CREATE DATABASE NHMS;

USE NHMS;

CREATE TABLE USERS(
ID INTEGER PRIMARY KEY,
NAME text NOT NULL,
USERNAME text NOT NULL,
PASSWORD text NOT NULL,
EMAIL text,
PHONE text,
IS_ADMIN BOOLEAN DEFAULT FALSE,
CONSTRAINT UK_USERNAME UNIQUE(USERNAME)
);

CREATE SEQUENCE USER_S START 1;

CREATE TABLE MEDICINE(
ID INTEGER PRIMARY KEY ,
NAME TEXT NOT NULL,
COMPANY TEXT,
MNF_DATE DATE NOT NULL,
EXP_DATE DATE NOT NULL,
PRICE DOUBLE precision,
PURCHASE_PRICE DOUBLE precision,
UNITS INTEGER,
USER_ID INTEGER,
FOREIGN KEY (USER_ID) REFERENCES USERS(ID),
CONSTRAINT UK_MEDICINE UNIQUE(NAME, COMPANY)
);

CREATE SEQUENCE MEDICINE_S START 1;

CREATE TABLE BILL(
ID INTEGER PRIMARY KEY ,
CUSTOMER_NAME TEXT,
CUSTOMER_PHONE TEXT,
CUSTOMER_AGE INTEGER,
CUSTOMER_GENDER TEXT,
DATE DATE,
TOTAL DOUBLE precision,
USER_ID INTEGER,
FOREIGN KEY (USER_ID) REFERENCES USERS(ID)
);

CREATE SEQUENCE BILL_S START 1;

CREATE TABLE BILL_MEDICINE(
ID INTEGER PRIMARY KEY,
BILL_ID INTEGER,
MEDICINE_ID INTEGER,
UNITS INTEGER,
FOREIGN KEY (BILL_ID) REFERENCES BILL(Id),
FOREIGN KEY (MEDICINE_ID) REFERENCES MEDICINE(Id)
);

CREATE SEQUENCE BILL_MEDICINE_S START 1;