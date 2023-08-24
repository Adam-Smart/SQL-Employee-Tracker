INSERT INTO department (id, department_name)
VALUES (1, "Frozen"),
       (2, "Produce"),
       (3, "Bakery"),
       (4, "Front-End");

INSERT INTO role (id, role_title, salary, department_id)
VALUES (1, "Stock Replen", 18000, 1),
       (2, "Stock Checker", 12000, 2),
       (3, "Till Operator", 13000, 4),
       (4, "Customer Service", 11000, 4),
       (5, "Baker", 11000, 3),
       (6, "Runner", 12500, 4),
       
INSERT INTO employee (id, firstname, lastname, role_id, manager_id)
VALUES (1, "Tim", "LeClerc", 1, NULL),
       (2, "Flin", "Verstappen", 1, NULL),
       (3, "Lucy", "Riccardo", 2, NULL),
       (4, "Harry", "Perez", 2, NULL),
       (5, "Charlotte", "Alonso", 3, NULL),
       (6, "Joel", "Bottas", 3, NULL),
       (7, "Trent", "Russel", 4, NULL),
       (8, "Toby", "Hamilton", 4, NULL),