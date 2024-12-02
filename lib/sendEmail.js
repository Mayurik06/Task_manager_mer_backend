import path from 'path'
import nodemailer from 'nodemailer'
import ejs from 'ejs'
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail= async({to,subject,template,variable})=>{
    const transporter= nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    });

    const templatePath=path.join(__dirname,'./views/emails/',`${template}.ejs`);
    const htmlContent=await ejs.renderFile(templatePath,variable);

    const mailOptions={
        from:process.env.EMAIL_USER,
        to,
        subject,
        html:htmlContent,
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error ('Error sending email:'+error.message);
    }
};

export default sendEmail;