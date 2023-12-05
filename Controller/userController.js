
const jwt = require('jsonwebtoken');


const bcrypt = require('bcrypt');


const User = require('../model/userModel')


exports.register = async (req, res) => {
  
    try {
 // console.log(process.env.SecretKey);
 const{name,password,email}= req.body
 
 const hashedPassword = await bcrypt.hash(password, 10);
 
 
 const user ={
     name,
     password:hashedPassword,
 }
 
   
 console.log(user);
     const newUser = await User.create(user)
 
     res.status(201).json({ message: 'User registered successfully' });
 
    } catch (error) {
     res.status(404).json({
         error:error.message
     })
     
    }
 }

 exports.login=  async(req, res) => {

    try {
        const { name,password } = req.body;
    
    
    const user = await User.findOne({name})
    console.log(user);
        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (passwordMatch) {
          // Generate JWT
          const token = jwt.sign({ userId: user._id, username: user.username }, 'asg7-hnkhgs-53jje7-63hdhk-72ggdshbs', { expiresIn: '30d' });
            console.log(token);
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}