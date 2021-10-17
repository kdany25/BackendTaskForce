import  mongoose  from "mongoose";
import bcrypt from "bcrypt"

const saltRounds = 10;



const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        trim : true
      
      },
      nationalId: {
        type: String,
        trim : true
      
      },
      empNumber: {
        type: String,
        unique : true,
        
      
      },
      phoneNumber: {
        type: String,
        unique : true,
        trim : true


      
      },
      email: {
        type: String,
        unique : true,
        trim : true
      
      },
      dOb: {
        type: Date
      
      },
       status: {
        type: String,
        enum: ["ACTIVE" , "DESACTIVE" ] ,
        default : "ACTIVE"
        
      
      },

      position: {
        type: String,
        enum : ['MANAGER','DEVELOPER','DESIGNER','TESTER','DEVOPS'] ,
        required: true
        
        
      
      },
      createdAt: {
        type: Date,
        default : new Date()
      
      },
      updatedAt: {
        type: Date,

        default : new Date()
      
      },

      isVerified : {
        type : Boolean ,
        default : false ,
    
      } ,

      password : {
        type : String ,
        required : true 
      }


      


})

employeeSchema.pre('save', function(next){
  let employee = this;
     bcrypt.genSalt(saltRounds , (error,salt) => {
       if(error) return next(error);
       bcrypt.hash(employee.password ,salt , (err , hash) => {
         if(err) return next(err);
         employee.password = hash;
         next();
       })
     });
});

employeeSchema.methods.verifyPassword = function(employeePassword, cb){
  bcrypt.compare(employeePassword, this.password, function(err, isMatch){
    if(err) return cb(err);
    cb(null, isMatch);
  });

}
 const employee = mongoose.model("employee", employeeSchema )
 export default employee

