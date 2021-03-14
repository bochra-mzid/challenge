const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "RANDOM_TOKEN_SECRET"

router.post("/", async (req, res) => {
     try {
      const { email, password } = req.body;
  
      // validate
  
      if (!email || !password)
        return res
          .status(400)
          .json({ errorMessage: "Please enter all required fields." });
  
      const existingUser = await User.findOne({ email });
      if (!existingUser)
        return res.status(401).json({ errorMessage: "Wrong email or password." });
  
      const passwordCorrect = await bcrypt.compare(
        password,
        existingUser.passwordHash
      );
      if (!passwordCorrect)
        return res.status(401).json({ errorMessage: "Wrong email or password." });
        const token = jwt.sign(
            {
              user: existingUser._id,
            },
            JWT_SECRET
          );
      
          // send the token in a HTTP-only cookie
      
          
            res.send(token);
         }
          catch (err) {
           console.error(err);
           res.status(500).send();
         }
      });

      module.exports = router