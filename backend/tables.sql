SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS DailyWeights;
DROP TABLE IF EXISTS Equipments;
DROP TABLE IF EXISTS Exercises;
DROP TABLE IF EXISTS BodyParts;
DROP TABLE IF EXISTS ExerciseBodyParts;
DROP TABLE IF EXISTS WorkoutLogs;
DROP TABLE IF EXISTS ExerciseSets;

CREATE TABLE Users (
    user_id int NOT NULL AUTO_INCREMENT,
    firstName varchar(50) NOT NULL,
    birthday date,
    gender varchar(50),
    height varchar(50),
    PRIMARY KEY (user_id)
);

CREATE TABLE DailyWeights (
    weight_id int NOT NULL AUTO_INCREMENT,
    date date NOT NULL,
    weight int NOT NULL,
    user_id int,
    PRIMARY KEY (weight_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Equipments (
    equipment_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (equipment_id)
);

CREATE TABLE Exercises (
    exercise_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    notes text,
    equipment_id int,
    PRIMARY KEY (exercise_id),
    FOREIGN KEY (equipment_id) REFERENCES Equipments(equipment_id)
    
);

CREATE TABLE BodyParts (
    bp_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (bp_id)
);


CREATE TABLE ExerciseBodyParts (
    ebp_id int NOT NULL AUTO_INCREMENT,
    exercise_id int,
    bp_id int,
    PRIMARY KEY (ebp_id),
    FOREIGN KEY (exercise_id) REFERENCES Exercises(exercise_id),
    FOREIGN KEY (bp_id) REFERENCES BodyParts(bp_id)
);

CREATE TABLE WorkoutLogs (
    workout_id int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    notes text,
    user_id int,
    PRIMARY KEY (workout_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE ExerciseSets (
    es_id int NOT NULL AUTO_INCREMENT,
    set_number int NOT NULL,
    reps int NOT NULL,
    weight int NOT NULL,
    workout_id int,
    exercise_id int,
    PRIMARY KEY (es_id),
    FOREIGN KEY (workout_id) REFERENCES WorkoutLogs(workout_id),
    FOREIGN KEY (exercise_id) REFERENCES Exercises(exercise_id)
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;