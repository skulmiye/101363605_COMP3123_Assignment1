const express = require('express');
const EmpModel = require('../models/employee.js');
const router = express.Router();

// Route to get all employee details
// http://localhost:8082/api/v1/emp/employees
router.get('/employees', async(req, res) => {
    try{
        const empList = await EmpModel.find({})
        res.status(200).send(empList)
    }catch(error) {
        res.status(500).send(error)
    }
});


// Route to create a new employee
// http://localhost:8082/api/v1/emp/employees
router.post('/employees', async (req, res) => {
    try {
        const newEmp = new EmpModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            salary: req.body.salary
        });

        await newEmp.save(); // Save the new emp

        res.status(201).send(newEmp)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Route to get employee details by ID
// http://localhost:8082/api/v1/emp/employees/:eid
router.get('/employees/:eid',async (req, res) => {
    try {
        const emp = await EmpModel.findById(req.params.eid);

        if (!emp) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.eid
            });
        }

        res.status(200).send(emp);
    }catch(error) {
        console.error(error);
        const response = {
            status: false,
            message: error.message || "Internal server error"
        };
        res.status(500).json(response);
    }
});


// Route to update employee details by ID
// http://localhost:8082/api/v1/emp/employees/:eid
router.put('/employees/:eid', async (req, res) => {
    try {
        const updatedEmp = await EmpModel.findByIdAndUpdate(
            req.params.eid,
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                gender: req.body.gender,
                salary: req.body.salary
            },
            { new: true }
        );

        if (!updatedEmp) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.eid
            });
        }

        res.status(200).send(updatedEmp);
    } catch (error) {
        console.error(error);
        const response = {
            status: false,
            message: error.message || "Internal server error"
        };
        res.status(500).json(response);
    }
});


// Route to delete employee by ID
// http://localhost:8082/api/v1/emp/employees
router.delete('/employees', async (req, res) => {
    try {
        const employeeId = req.query.eid;

        if (!employeeId) {
            return res.status(400).send({
                message: "Employee ID is required in the query parameters"
            });
        }

        const deletedEmp = await EmpModel.findByIdAndRemove(employeeId);

        if (!deletedEmp) {
            return res.status(404).send({
                message: "Employee not found with id " + employeeId
            });
        }

        res.status(200).send({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error(error);
        const response = {
            status: false,
            message: error.message || "Internal server error"
        };
        res.status(500).json(response);
    }
});

module.exports = router;