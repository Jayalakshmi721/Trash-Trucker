const express = require("express");
const nodemailer = require("nodemailer");
const cors=require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jmparu123@gmail.com",
    pass: "hirq coql xrpb esbc",
  },
});

app.post("/sendemail", (req, res) => {
  const mailOptions = {
    from: "jmparu123@gmail.com",
    to: "mjayalakshmi721@gmail.com",
    subject: "nodemailer Test",
    html: "The Bin is full  <a href='http://localhost:3000/usermap'>View on Map</a>",
  
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Failed to send email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
