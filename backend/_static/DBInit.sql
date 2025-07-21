CREATE TABLE Users (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    Email VARCHAR(255) UNIQUE,
    Password VARCHAR(255),
    DoB DATE
);

CREATE TABLE IncomeTypes (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    IsStable BOOLEAN
);

CREATE TABLE ExpenseCategories (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100)
);

CREATE TABLE Income (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    IncomeTypeID INT,
    Amount DECIMAL(10,2),
    Description TEXT,
    DateReceived DATE,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (IncomeTypeID) REFERENCES IncomeTypes(ID)
);

CREATE TABLE Expenses (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    CategoryID INT,
    Amount DECIMAL(10,2),
    Description TEXT,
    DateSpent DATE,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (CategoryID) REFERENCES ExpenseCategories(ID)
);

CREATE TABLE RecurringIncome (
    RecurringIncomeID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    IncomeTypeID INT,
    Amount DECIMAL(10,2),
    Frequency VARCHAR(50),
    StartDate DATE,
    EndDate DATE NULL,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (IncomeTypeID) REFERENCES IncomeTypes(ID)
);

CREATE TABLE RecurringExpenses (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    CategoryID INT,
    Frequency VARCHAR(50),
    StartDate DATE,
    EndDate DATE NULL,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (CategoryID) REFERENCES ExpenseCategories(ID)
);

CREATE TABLE BudgetPlans (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    StartDate DATE,
    EndDate DATE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);
