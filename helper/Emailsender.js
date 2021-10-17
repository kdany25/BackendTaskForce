
import { sgMail } from "../index.js";

const emailSender = (email)=> {
    const msg = {
    to: email,
    from: 'kabadany25@gmail.com', 
    subject: 'Welcome to Awesomity',
    text: "Congratulations and welcome to the team! We are excited to have you at Awesomity We know you are going to be a valuable asset to our company and are looking forward to the positive impact you are going to have here. ",
    html: "<strong> Congratulations and welcome to the team! We are excited to have you at Awesomity We know you are going to be a valuable asset to our company and are looking forward to the positive impact you are going to have here. </strong>",
    }

    sgMail.send(msg).then(()=>{
        return {
            status: 'success',
        }
    } ,error => {

        if (error?.response) {
            console.log('error', error.response);
            return {
                status: 'error',
                error: error.response.body,
            }
        }
    });
}

const resetPasswordEmail = ({email, token})=> {
    const msg = {
    to: email,
    from: 'kabadany25@gmail.com', 
    subject: 'Resetting Password',
    text: `link to reset your new password ${process.env.BASE_URL}/set-password?token=${token} `,
    html: `<strong> link to reset your new password ${process.env.BASE_URL}/set-password?token=${token}  </strong>`,
    }

    sgMail.send(msg).then(()=>{
        return {
            status: 'success',
        }
    } ,error => {

        if (error?.response) {
            console.log('error', error.response);
            return {
                status: 'error',
                error: error.response.body,
            }
        }
    });
}

export { emailSender, resetPasswordEmail };