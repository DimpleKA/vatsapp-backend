const nodemailer = require('nodemailer');

const sendOTP = async (email, otp, message) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'dchatcare@gmail.com',
              pass: 'gcrcyxdrpajxmxau'
            }
        });
        
        var mailOptions = {
            from: 'dchatcare@gmail.com',
            to: email,
            subject: `${message} ${otp}`,
            text: `${message} ${otp}`
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info.response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendOTP;
