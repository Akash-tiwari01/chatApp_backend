const { generateOtp } = require("sendotp");
const { sendEmailVerification, sendMobileVerification, emailVerification } = require("../handlers/userHandlers.js");
const { otpGenerator } = require("../handlers/utilityFunction.js");


const verifyUser = async (req, res) => { // Make it async
    try {
        
        if (req.body.email) {
            //verify user email 
            console.log(req.body.email);
            const email = req.body.email
            const otp = generateOtp()
            const success = await sendEmailVerification(email, otp);
            
            if (success) {
                req.session.user = {email, otp}
                return res.status(200).json({
                    message: "Mail sent successfully"
                });
            } else {
                return res.status(400).json({
                    error: "Verification failed",
                    message: "Failed to send verification email"
                });
            }
        } else if (req.body.phoneNo) {
            //verify Phone No
            const success = await emailVerification(req.session.user.email, otp)
            if (success) {
                return res.status(200).json({
                    message: "OTP sent successfully"
                });
            } else {
                return res.status(400).json({
                    error: "Verification failed",
                    message: "Failed to send verification email"
                });
            }
        } 
        else if (req.body.otp)
        {
            const success =  emailVerification(req.body?.otp, req.session.user?.otp);
            // const success = true
            if (success) {
                
                return res.status(200).json({
                    message: "otp verified successfully"
                });
            } else {
                return res.status(400).json({
                    error: "Verification failed",
                    message: "Incorrect OTP"
                });
            }
        }
        else {
            console.log("helloji");
            return res.status(400).json({
                error: "Verification failed",
                message: "Either email or phone no is mandatory"
            });
        }
    } catch (error) {
        console.error('Verification error:', error);
        return res.status(500).json({
            error: "Internal server error",
            message: "An unexpected error occurred"
        });
    }
}



module.exports = {verifyUser}