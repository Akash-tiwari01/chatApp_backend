const nodemailer = require('nodemailer')
const axios = require("axios");
const otpGenerator = require('../handlers/utilityFunction.js')
const registerUser = async (email,code)=>{

}

const sendEmailVerification = async (email, code) => { // Add parameters
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user:  "drrahulkapoor22@gmail.com",
                pass:  "tiwa zbls zduw bydt" // Fixed typo in env var name
            }
        });

        const mailOptions = {
            from: 'drrahulkapoor22@gmail.com',
            to: email,
            subject: "Email Verification Code",
            html: `<p>Your verification code is: <strong>${code}</strong></p>
            <p>This code will expire in 24 hours.</p>`
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}


const emailVerification = (otp1, otp2)=>{
     if (otp1==otp2)
     return true
    return false
}


const sendMobileVerification = (phoneNo, otp)=>{

    // Replace with your Fast2SMS API key
    const apiKey = "mqCDgOt80wRB2ePyvV4J1ZUxu5kilofE7jrXYQMILbFpGsKTAdmUfuF2qCLN845jSYhegAIMHDd6wBvt";

    // Phone number must be 10 digits (India)

    const message = `Your OTP is ${otp}`;
    const data = {
        
        "route" : "otp",
        "variables_values" : otp,
        
        "numbers" : phoneNo,
        }
    axios.post("https://www.fast2sms.com/dev/bulkV2", data, {
        headers :

        {
        
        "authorization":"bCr8O8vbj80AW4w82b08f43uixpl2DpQaYuqs9zbDjZztKCAMhHGwUhJNycv"
        ,"Content-Type":"application/json"
        }
        
        
        
    })
    .then(response => {
        console.log("OTP sent successfully:", response.data);
    })
    .catch(error => {
        console.error("Failed to send OTP:", error.response?.data || error.message);
    });
}

const mobileVerification = (phoneNo, code)=>{

}



module.exports = {registerUser, sendEmailVerification, emailVerification, sendMobileVerification, mobileVerification}