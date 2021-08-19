const express = require("express");
const router = express.Router();
const controllers = require("./controllers");
const {check,validationResult} = require('express-validator');

router.get("/tasks", (req, res) => controllers.getTasksController(req, res));

router.post("/task", (req, res) => controllers.createTaskController(req, res));

router.put("/task", (req, res) => controllers.updateTaskController(req, res));

router.delete("/task/:id", (req, res) => controllers.deleteTaskController(req, res));

router.post("/user", [
    check('User', 'name is required').not().isEmpty(),
    check('Password', 'password is required').not().isEmpty(),
],(req, res) => controllers.registerController(req, res));


const result = validationResult(req);
var errors = result.errors;

for (var key in errors) {
    console.log(errors[key].value);
}

if(!result.isEmpty()) {
    res.render('register',{
        errors: errors
    })
}

module.exports = router