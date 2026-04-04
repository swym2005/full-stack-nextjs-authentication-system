import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


export const sendEmail = async ({email, emailType, userId}:any) => {
    try {
        // Generation of the token for the verify and also for the forgotpasswordToken if jarurat hai to.
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // So now we gotta update the user.. with the generated token so find him first.

        if(emailType === "VERIFY")
        {
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000});
        }else if(emailType === "RESET")
        {
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000});

        }
// Okay so till here the token generation shit is over.

        // Now we'll create the transporter.
     const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "3436eedac079d6",
        pass: "33e5f71a4ec2f6"
        }
});

        // Now wee'll have the mailOptions(Jo bhi content hai woh) simple object hi hai yeh
        const mailOptions = {
            from: 'dronzer@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset Your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "forgotpassword"}?token=${hashedToken}">here</a> to 
                    ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        }

        // Send the email.
       const mailresponse = await transporter.sendMail(mailOptions);
       return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}
