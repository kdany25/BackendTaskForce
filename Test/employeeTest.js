import chai from 'chai'
import chaiHttp from 'chai-http'
import router from '../index.js';

import { new_User } from './Dumy.Data.js';

chai.should();
chai.use(chaiHttp)

//get all employees

describe ("get all employee",  ()=>{
    it("it should get all employees",(done)=>{
        chai.request(router).get('/AllEmployees').end((err,res)=>{
            res.should.have.status(200)
            // res.body.data.should.be.a('array')
            // res.body.should.be.a('array');
           
            // res.body.data[0].should.have.property("firstname") 
            // res.body.data[0].should.have.property("lastname")
            

            done();
        })
    })


})

  //cant get all user

describe ("negative test",  ()=>{
    it("it should not  get all employees",(done)=>{
        chai.request(router).get('/AllEmploye').end((err,res)=>{
            res.should.have.status(404)
         
            

            done();
        })
    })


})


//create user
describe ('create a employee', ()=>{
    it(" create a emplooyee",(done)=>{
      
      chai.request(router).post('/registration').send(new_User).end((err,res)=>{
        res.body.should.be.a('object')
        res.should.have.status(200)
        // res.body.data.should.have.property("message") 
        
        done(); 
      })
    })
  })

  //negative test

  //cnat not create user
describe ('negative test', ()=>{
    it(" can not create a emplooyee",(done)=>{
      
      chai.request(router).post('/registrati').send(new_User).end((err,res)=>{
        res.body.should.be.a('object')
        res.should.have.status(404)
        
        
        done(); 
      })
    })
  })


  //delete user 
  describe ('delete employee', ()=>{
    it(" have to delete employee",(done)=>{

      const id = "616b1da4f24d2fa94c95a925 ";
      
      
      chai.request(router).delete('/employee/'+id).end((err,res)=>{
        // res.should.have.status('success')
        res.should.have.status(200)
        
           
           
        done(); 
      })
    })
  })

  //cant delete user 
  describe ('negative test', ()=>{
    it(" cant not delete employee",(done)=>{

      const id = "616b1da4f24d2fa94c95a925 ";
      
      
      chai.request(router).delete('/ap'+id).end((err,res)=>{
        // res.should.have.status('success')
        res.body.should.be.a('object')
        res.should.have.status(404)
        
           
           
        done(); 
      })
    })
  })