-- Average weight by week
SELECT EXTRACT(WEEK from date) as Week, AVG(weight) from DailyWeights GROUP BY EXTRACT(WEEK from date);

-- Last 7 Weights
SELECT CONCAT(EXTRACT(MONTH FROM date), '/', EXTRACT(DAY FROM date)) as MonthDay,
       SUM(weight) as Weight 
FROM DailyWeights 
GROUP BY MonthDay 
ORDER BY MonthDay DESC
LIMIT 7;

-- Avg weight by month
SELECT DATE_FORMAT(date, '%b') as Month, AVG(weight) as MonthlyAvg
FROM DailyWeights
GROUP BY Month
ORDER BY Month;

SELECT date, reps * weight as total_volume FROM ExerciseSets GROUP BY date;

-- Total Reps and Weight each Date by ExerciseID
SELECT date, SUM(reps) AS total_reps, SUM(reps * weight) AS total_weight
FROM ExerciseSets
WHERE exercise_id = 1
GROUP BY date
ORDER BY date;

-- Avg Reps and Weight each Date by ExerciseID
SELECT date, AVG(reps) AS average_reps, AVG(weight) AS average_weight, AVG(reps * weight) AS average_volume
FROM ExerciseSets
WHERE exercise_id = 1
GROUP BY date
ORDER BY date;

-- Count # of Sets Per day for last 7 days
SELECT DATE(date) AS workout_date, COUNT(*) AS num_sets
FROM ExerciseSets
WHERE date >= CURDATE() - INTERVAL 7 DAY
GROUP BY DATE(date)
ORDER BY workout_date;

-- Total # of sets last 7 days
SELECT SUM(num_sets) AS total_sets_last_7_days
FROM (
    SELECT DATE(date) AS workout_date, COUNT(*) AS num_sets
    FROM ExerciseSets
    WHERE date >= CURDATE() - INTERVAL 7 DAY
    GROUP BY DATE(date)
) AS subquery;

-- Total # of sets today
SELECT COUNT(*) AS total_sets_today
FROM ExerciseSets
WHERE DATE(date) = CURDATE();

-- Total # of weight lifted today
SELECT SUM(reps * weight) AS total_weight_today
FROM ExerciseSets
WHERE DATE(date) = CURDATE();

-- Total sets last 7 days
SELECT COUNT(*) AS total_sets_last_7_days
FROM ExerciseSets
WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);

-- Total weight moved last 7 days
SELECT SUM(reps * weight) AS total_weight_last_7_days
FROM ExerciseSets
WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);

