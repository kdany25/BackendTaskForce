import { schema ,updateSchema } from "./employee.schema.js";

const addEmployeeValidation = async (req ,res , next ) => {
    const value = await schema.validate(req.body)

    if (value.error){

         return  res.send({
            status : 'Validation Error',
            message : value.error.details[0].message
        })
    } else {
        next();


    }

}

const updateEmployeeValidation = async (req ,res , next ) => {
    const value = await updateSchema.validate(req.body)

    if (value.error){

        return   res.send({
            status : 'Validation Error' ,
            message : value.error.details[0].message
        })
    } else {
        next();


    }

}


export {
    addEmployeeValidation , updateEmployeeValidation
}