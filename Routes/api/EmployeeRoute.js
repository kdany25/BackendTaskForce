import express from "express";

import {
    createEmployee ,
    getAllEmployee ,
    updateEmployee ,
    deleteEmployee,
    getSpecificEmployee ,
    updateEmployeeStatus ,
    resetEmployeePassword,
    setEmployeePassword,
    dataFromExcel ,
    login

} from '../../Controllers/EmployeeController.js'

import { addEmployeeValidation , updateEmployeeValidation } from "../../Validations/employeeValidation.js";
import {authenticatetoken} from "../../helper/verifyToken.js"

const router = express.Router();

router.post("/registration", authenticatetoken, addEmployeeValidation, createEmployee);
router.get('/AllEmployees' ,getAllEmployee);
router.patch('/employee/:id' , authenticatetoken, updateEmployeeValidation , updateEmployee)
router.patch('/employee/status/:id' , updateEmployeeStatus)
router.get('/reset-password' , resetEmployeePassword)
router.delete('/employee/:id' , authenticatetoken, deleteEmployee)
router.get ('/employee/search', getSpecificEmployee)
router.post('/login' ,login )
router.patch('/set-password' , setEmployeePassword)



export default router;
