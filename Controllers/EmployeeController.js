
import employee from "../Model/employee.js";
import uniqueRandom from "../helper/uniqueRandom.js";
import {emailSender, resetPasswordEmail} from "../helper/Emailsender.js";
import jwt  from "jsonwebtoken";
import xlsx from "xlsx" ;
import { authenticatetoken } from "../helper/verifyToken.js";
import hashPassword from "../helper/hashPassword.js";
// const workbook = xlsx.readFile('../data/employeeData.xlsx') ;

export const createEmployee = async(req,res) => {
 
  try {
    let foundEmp = true;
    let token;
    while(foundEmp){
      const employeeNumber = uniqueRandom();
      const ret =  await employee.find({empNumber:`EMP${employeeNumber}`}); 
      
      
      if (!ret?.length)  { 
        const employ = new employee({
          ...req.body,
          empNumber: `EMP${employeeNumber}`
        })
         const {email,position, _id}= await employ.save();

         
        emailSender(req.body.email);
        // console.log({status, error});
        token = jwt.sign({ email , position , _id }, process.env.ACCESS_TOKEN_SECRET , {expiresIn : '1d'});
        console.log('token', token);
      foundEmp = false;
   
     }

      
    }

    return res.send({
      status: 'success',
      message: 'Employee created successfully',
      token
    });

  }catch (error) {
    
    res.status(500).send(error);

  }
  

}

export const dataFromExcel = async (req,res) => {
  // const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // for( let index =2 ; index < 4 ; index++){
  //   const name = worksheet[`A${index}`].v;
  //   const nationalId = worksheet[`B${index}`].v;
  //   const phoneNumber = worksheet[`C${index}`].v;
  //   const email = worksheet[`D${index}`].v;
  //   const dOb = worksheet[`E${index}`].v;
  //   const password = worksheet[`F${index}`].v;
  //   const position = worksheet[`G${index}`].v;

  //     console.log ({
  //       name ,
  //       nationalId ,
  //       phoneNumber
  //     })
  // }

}


export const getAllEmployee = async (req, res) => {
  const users = await employee.find({})
  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
  
};

export const updateEmployee = async (req, res) => {

  try{
    await employee.findByIdAndUpdate(req.params.id , req.body)
    res.send(employee)

  }catch (error){
    res.status(500).send(error)

  }

};

export const updateEmployeeStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  if(!status || !id){
    return res.send({
      status: 'Error -- bad request',
      message: 'status or id are required.'
    })
  }
  console.log('id', id);
  try{
    await employee.updateOne({_id : id}, { status })
    return res.send({
      status: 'success',
      message: 'status updated successfully',
    })

  }catch (error){
    res.status(500).send(error)

  }

};

export const deleteEmployee = async (req,res) =>{
  try {
    const emp = await employee.findByIdAndDelete(req.params.id)
    if (!emp) res.status(404).send("employee not found");
    res.status(200).send();
  } catch (error) {
    
  }
}

export const resetEmployeePassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    employee.findOne({email}, async (error, data) => {
      if(error){
        return res.send({
          status: 'error',
          error,
        });
      }
      console.log("data" , data)
      if(!data){
        return res.send({
          status: 'Not found',
          message: 'user does not exist'
        })
      }
      const {email, position, _id} = data;
      let token = jwt.sign({ email , position , _id }, process.env.ACCESS_TOKEN_SECRET , {expiresIn : '1d'});
     const emasender = await resetPasswordEmail({email: data.email, token});
     console.log(emasender)
      return res.send({
        status: 'success',
        message: 'Check yor email to reset password'
      });

    })

  } catch(error){

  }

};

export const setEmployeePassword = async (req, res) => {
  const { newPassword, retypePassword } = req.body;
  const { token } = req.query;
try {
  if(!token) {
    return res.send({
      status: 'Error',
      message: 'Unauthorized access'
    });
  }
  if(token){
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , async (err,user) => {
      console.log(user)
      if (user) {
        const {_id} = user;
        employee.findOne({_id}, async (error, data) => {
          if(error){
            return res.send({
              status: 'error',
              error,
            });
          }
          console.log("tesss",data)
          if(!data) {
            return res.send({
              status: 'Error',
              message: 'Unauthorized access',
            });
          }
          if(newPassword === retypePassword){
            const hashedPassword = await hashPassword(newPassword);
            console.log('paadd', hashedPassword);
            await employee.updateOne({_id}, {password: hashedPassword});
            return res.send({
              status: 'Success',
              message: 'Your password was reset. login now'
            });
          }
          else {
            return res.send({
              status: 'Error',
              message: 'Password did not match. please retry again'
            })
          }
        });
      }
      if (err ) return res.send({
        status: 401,
        message: "invalid token",
      });
  })
     
  }
} catch(error) {
    // res.send(error)
}

} 



export const getSpecificEmployee = async(req,res) => {
  const {name, phoneNumber, empNumber, email, position} = req.query;
  // if(!name || !phoneNumber || !empNumber || !email || !postion){
  //   return res.send({
  //     status: "Bad request",
  //     message: 'Provide the one of the following query: name, phoneNumber, empNumber, email, or position',
  //   })
  // }
  try {
    
    await employee.find({$or: [{name}, {phoneNumber}, {empNumber}, {email}, {position}]} , (error , data) => {
      if(error) {
        return res.send({
          status: 'error',
          error
        });
      }
      console.log(data.name)
      if(!data.length) {

        return res.send({
          status: "Not found",
          message: "Employee not found"
        });
      }
      return res.send({
        status: "success",
        message: "employee found",
        data,
      })
    })
  } catch (error) {
    // res.sendStatus(500);
    
  }
}

export const login = async (req , res) => {
  const { email, password } = req.body;

  employee.findOne({email} , (error , user)=>{
    if(!user) {
      return res.send({
        status: "Error",
        message: "incorrect username or password."
      });
    }
    const { position, _id } = user;
    console.log('hhhh', {position, _id});
       
    if (error) return new Error(error);

      user?.verifyPassword(password, (error, isMatch) => {
        if(error) return new Error(error);
        if(!isMatch) {
          return res.send({
            status: "Error",
            message: "incorrect username or password."
          });
        }
       let token = jwt.sign({ email , position , _id }, process.env.ACCESS_TOKEN_SECRET , {expiresIn : '1d'});
        return res.send({
          status: "success",
          token
        })

      });
  }) ;
  
  
}



