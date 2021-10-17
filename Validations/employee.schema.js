import joi from "joi"

const schema = joi.object().keys({
name : joi.string().min(2).required(), 
nationalId: joi.string().max(16).required(),
phoneNumber : joi.string().max(12).required(),
email :joi.string().email().required(),
dOb : joi.date().max('12-21-2003').iso(),
position : joi.string().valid('MANAGER' , 'DEVELOPER' , 'DESIGNER' , 'TESTER' , 'DEVOPS') ,
password : joi.string().max(20).required()
})

const updateSchema = joi.object().keys({
    name : joi.string().min(2).required(), 
    nationalId: joi.string().max(16).required(),
    phoneNumber : joi.string().max(12).required(),
    email :joi.string().email().required(),
    position : joi.string().valid('MANAGER' , 'DEVELOPER' , 'DESIGNER' , 'TESTER' , 'DEVOPS') ,
   
    })



export{
    schema , updateSchema

}