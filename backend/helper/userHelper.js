const bcrypt = require("bcrypt")

const encryptPassword = async(plainPassword)=>{
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(plainPassword , saltRounds);
    return encryptedPassword;
}


module.exports = {encryptPassword};