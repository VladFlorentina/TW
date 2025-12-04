const { Op } = require("sequelize");
const Employee = require("../models/employee");

const router = require("express").Router();

router
    .route("/employees")
    .get(async (req, res) => {
        try {
            const { minSalary, lastName, sortBy } = req.query;

            const where = {};

            if (minSalary) {
                where.salary = { [Op.gt]: minSalary };
            }

            if (lastName) {
                where.lastName = lastName;
            }

            const options = {
                where: where,
            };

            if (sortBy) {
                options.order = [[sortBy, "ASC"]];
            }

            const employees = await Employee.findAll(options);
            return res.status(200).json(employees);
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try {
            const newEmployee = await Employee.create(req.body);
            return res.status(200).json(newEmployee);
        } catch (err) {
            return res.status(500).json(err);
        }
    });

router
    .route("/employees/:id")
    .get(async (req, res) => {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (employee) {
                return res.status(200).json(employee);
            } else {
                return res.status(404).json({ error: "Id not found" });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .put(async (req, res) => {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (employee) {
                const updated = await employee.update(req.body);
                return res.status(200).json(updated);
            } else {
                return res.status(404).json({ error: "Id not found" });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (employee) {
                await employee.destroy();
                return res.status(200).json({ message: "Sters cu succes" });
            } else {
                return res.status(404).json({ error: "Id not found" });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    });

module.exports = router;




// const { Op } = require("sequelize");
// const Employee = require("../models/employee");

// const router = require("express").Router();

// router
//     .route("/employees")
//     .get(async (req, res) => {
//         // get all
//         try {
//             const { minSalary, lastName } = req.query;
//             const whereClause = {};
//             if (minSalary) {
//                 whereClause.salary = { [Op.gt]: minSalary };
//             }

//             if (lastName) {
//                 whereClause.lastName = lastName;
//             }

//             const employees = await Employee.findAll({
//                 where: whereClause,
//             });

//             return res.status(200).json(employees);
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     })
//     .post(async (req, res) => {
//         try {
//             const newEmployee = await Employee.create(req.body);
//             return res.status(200).json(newEmployee);
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     });

// router
//     .route("/employees/:id")
//     .get(async (req, res) => {
//         // get by id
//         try {
//             const employee = await Employee.findByPk(req.params.id);
//             if (employee) {
//                 return res.status(200).json(employee);
//             } else {
//                 return res
//                     .status(404)
//                     .json({ error: `Employee with id ${req.params.id} does not exists` });
//             }
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     })
//     .put(async (req, res) => {
//         // update
//         try {
//             const employee = await Employee.findByPk(req.params.id);
//             if (employee) {
//                 return res.status(200).json(await employee.update(req.body));
//             } else {
//                 return res
//                     .status(404)
//                     .json({ error: `Employee with id ${req.params.id} does not exists` });
//             }
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     })
//     .delete(async (req, res) => {
//         // delete
//         try {
//             const employee = await Employee.findByPk(req.params.id);
//             if (employee) {
//                 await employee.destroy();
//                 return res.status(200).json({ message: "Sters" });
//             } else {
//                 return res.status(404).json({ error: "Id not found" });
//             }
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     });

// module.exports = router;