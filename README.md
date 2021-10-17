# Employee Management
Employee Management is system which will help manager  to create , edit , suspend , update  


# Tech/Framework Used:
* [Git](https://git-scm.com/downloads)
* [Express](https://expressjs.com/)
* [Nodejs](https://nodejs.org/en/)
* [Mongoose](https://cloud.mongodb.com)



# Installation
```

git clone https://github.com/kdany25/BackendTaskForce.git

cd BackendTaskForce


npm install

```
# .env Variabe 
```
create .env file and copy the following 

PORT = 5000 
MONGO_URL = mongodb://dany:dany@cluster0-shard-00-00.gzlmh.mongodb.net:27017,cluster0-shard-00-01.gzlmh.mongodb.net:27017,cluster0-shard-00-02.gzlmh.mongodb.net:27017/employee?ssl=true&replicaSet=atlas-v7ypa9-shard-0&authSource=admin&retryWrites=true&w=majority

sendGridApi = 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

ACCESS_TOKEN_SECRET = kibonke

REFRESH_TOKEN_SECRET = 44f50e320c86fbb181f66419b39d04f2a9b5d68afc8db4f9be4e4f5278a613c4f5f9a6a39f3a7a9832bdfe75a5da9f44fccdd26803ee82fc2db8e0621d9ac062

BASE_URL = http://localhost:5000

```
# To start the server
```

npm run start

```
# To run tests
```

npm run test

```
# API Reference
You need need [postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop//%40) to test APIs.

` GET /AllEmployees ` Fetch all employees. 

` POST /registration ` create a employee.  protected (requires token )

` PATCH /employee/:id` update a employee.   protected (requires token )

` PATCH /employee/status/:id ` updating status.  

` DELETE /employee/:id ` delete employee.  protected (requires token ) protected (requires token )

` GET /employee/search ` search by name or email , phone , or code ,or position .

` POST /login ` LOgin Employee.

` GET /reset-password `  request to change password .

` PATCH /set-password `  change password or set new password.



