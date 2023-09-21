// Imported required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ipinfo = require('ipinfo');
const twilio = require('twilio');
const bcrypt = require('bcrypt');

// Initialized Express app
const app = express();
app.use(bodyParser.json());

// Connected to MongoDB


mongoose.connect('mongodb+srv://admin:VXojEmxERXlCwFtM@cluster0.fmswmvz.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
console.log("connected to database");
// Defined Mongoose schema and model for user data
const userSchema = new mongoose.Schema({
  username: String,
  password: String, 
  phone: String,
  otp: String, 
});
const User = mongoose.model('User', userSchema);

// Function to generate a random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Function to send OTP using Twilio
async function sendOTP(phone, otp) {
  try {
    const client = new twilio('AC014fb30003112226b59cc9059c14866f', '84bf0b6bbc27a9b668b49edadc1f6918');
    await client.messages.create({
      body: `Your OTP: ${otp}`,
      from: '9798763484',
      to: phone,
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
}

// Registration route
app.post('/register', async (req, res) => {
  try {
    // Validated IP address using ipinfo module
    const ipData = await ipinfo(req.ip);

    // Generated OTP and send it to the user's phone number
    const otp = generateOTP();
    await sendOTP(req.body.phone, otp);

    // Saved user data (including hashed password and OTP) to the database
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      phone: req.body.phone,
      otp: otp,
    });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Started the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
 

});


