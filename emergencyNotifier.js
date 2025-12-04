const twilio = require('twilio');
const nodemailer = require('nodemailer');
const { encryptData } = require('./encryption');

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const notifyEmergencyTeam = async (accidentData) => {
    try {
        const encryptedData = encryptData(JSON.stringify(accidentData));

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: '112@emergency.in',
            subject: 'Emergency Alert: Vehicle Accident Detected',
            text: `Accident detected at ${accidentData.location}. Please respond. Details: ${encryptedData}`
        });

        await twilioClient.messages.create({
            body: `Emergency Alert: Accident at ${accidentData.location}.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: '112'
        });

    } catch (error) {
        console.error(`Error sending emergency alert: ${error.message}`);
    }
};

module.exports = { notifyEmergencyTeam };
