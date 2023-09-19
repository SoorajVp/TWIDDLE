import Mailgen from 'mailgen';
import nodemailer, { Transporter } from 'nodemailer';
import configKeys from '../../config';
import AppError from '../../utils/appError';
import { HttpStatus } from '../../types/httpStatus';


const confirmEmail = (email: string, userId: string, token: string): Promise<boolean> => {
  
    return new Promise<boolean>((resolve, reject) => {
      const transporter: Transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: configKeys.EMAIL_USER,
          pass: configKeys.EMAIL_PASS
        }
      });
  
      const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
          // Customize the product details
          name: 'TWIDDLE Web Application ',
          link: 'https://your-product.com'
        }
      });

      const user = email.split("@")[0].toUpperCase()
      const emailItems = {
        body: {
          name: user, // Recipient's name
          intro: 'Welcome to our Twiddle app!', // Introduction text
          action: {
            instructions: 'To get started with our platform, please click the button below:', // Action instructions
            button: {
              color: '#22BC66', // Button color
              text: 'Click here', // Button text
              link: `${configKeys.CLIENT_PORT}/auth/${token}/token/${userId}` // Button link
            }
          },
          outro: 'Need help? Contact us at soorajvp2017@gmail.com' // Outro text
        }
      };
  
      const emailBody = mailGenerator.generate(emailItems);
      const emailText = mailGenerator.generatePlaintext(emailItems);
  
      const mailOptions = {
        from: 'soorajvp2017@gmail.com',
        to: email, // Replace with the recipient's email address
        subject: 'Email verification',
        html: emailBody,
        text: emailText
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new AppError( "This email is not valid", HttpStatus.BAD_REQUEST )
        } else {
          resolve(true);
        }
      });
    });
  };
  

export default confirmEmail;