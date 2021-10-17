import bcrypt from 'bcrypt';


const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.genSalt(saltRounds , async (error,salt) => {
        if(error) return new Error(error);
        return bcrypt.hash(password ,salt , (err , hash) => {
          if(err) return new Error(err);
          console.log('password45', hash);
          return hash;
        });
      });
}


export default hashPassword;