# Vehicle Accident Detection & Emergency Notification System

A Node.js-based backend system that automatically detects vehicle accidents and sends encrypted emergency alerts to authorities via SMS and email. The system provides secure data management for users, vehicles, and accident records with real-time emergency response capabilities.

## 🚗 Features

### Core Functionality
- **Accident Detection & Recording**: Automatically logs accident details including location, severity levels (minor, moderate, severe), and timestamps
- **Emergency Notification System**: 
  - Sends SMS alerts via Twilio to emergency services (112)
  - Sends email notifications with encrypted accident data
  - Real-time alert delivery for rapid response
- **Data Encryption**: AES-256-CBC encryption for sensitive accident information
- **Vehicle Management**: Track vehicle information, service dates, and autonomous features
- **User Authentication**: Secure user registration and authentication with bcrypt password hashing
- **Role-Based Access**: Support for user and admin roles

### Security Features
- Password hashing with bcrypt
- Data encryption for emergency communications
- CORS and Helmet.js for enhanced API security
- Environment-based configuration for sensitive credentials


## 🏗️ System Architecture

┌─────────────────┐
│ Client Apps │
│ (Mobile/Web) │
└────────┬────────┘
│
▼
┌─────────────────┐
│ Express.js │
│ REST API │
│ (server.js) │
└────────┬────────┘
│
┌────┴────┐
▼ ▼
┌────────┐ ┌──────────────┐
│MongoDB │ │ Emergency │
│Database│ │ Notifier │
│ │ │ (Twilio/Mail)│
└────────┘ └──────────────┘


### Database Models

**User Model**
- Name, Email, Password (hashed)
- Role-based access (user/admin)
- Pre-save password hashing middleware

**Vehicle Model**
- Owner reference, Model, Plate Number
- Last service date tracking
- Autonomous features flag

**Accident Model**
- Vehicle reference, Location data
- Severity classification (minor/moderate/severe)
- Automatic timestamp recording

## 📋 Prerequisites

- **Node.js**: v14.x or higher
- **MongoDB**: v4.x or higher (local or MongoDB Atlas)
- **Twilio Account**: For SMS notifications
- **Gmail Account**: For email notifications (or other SMTP service)

## 🔧 Installation

### 1. Clone the Repository
  -git clone https://github.com/jadhavpiyush333/accident-detection-system.git
  -cd accident-detection-system

     
### 2. Install Dependencies
   -npm install

   
### 3. Required NPM Packages
  -npm install express mongoose dotenv cors helmet bcryptjs
  -npm install twilio nodemailer crypto

    
### 4. Environment Configuration

Create a `.env` file in the root directory:

  -Server Configuration
  -PORT=5000
  -NODE_ENV=development

Database
  -MONGODB_URI=mongodb://localhost:27017/accident-detection

OR for MongoDB Atlas:
  -MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/accident-detection
  -Twilio Configuration
  -TWILIO_SID=your_twilio_account_sid
  -TWILIO_AUTH_TOKEN=your_twilio_auth_token
  -TWILIO_PHONE_NUMBER=+1234567890

Email Configuration
  -EMAIL_USER=your-email@gmail.com
  -EMAIL_PASS=your-app-specific-password

Encryption
  -ENCRYPTION_KEY=your-32-character-encryption-key-here
  -JWT Secret (if implementing JWT authentication)
  -JWT_SECRET=your-jwt-secret-key

  
### 5. Setup Gmail for Nodemailer

For Gmail, you need to:
1. Enable 2-Factor Authentication on your Google Account
2. Generate an App-Specific Password
3. Use the app password in `EMAIL_PASS`

### 6. Setup Twilio

1. Sign up at [Twilio](https://www.twilio.com/)
2. Get your Account SID and Auth Token
3. Purchase a phone number with SMS capabilities
4. Add credentials to `.env` file

## 📁 Project Structure

accident-detection-system/
├── models/
│ ├── User.js # User schema with authentication
│ ├── Vehicle.js # Vehicle information schema
│ └── Accident.js # Accident records schema
├── utils/
│ ├── encryption.js # Data encryption/decryption
│ └── emergencyNotifier.js # Emergency alert system
├── routes/
│ └── authRoutes.js # Authentication routes (to be created)
├── config/
│ └── db.js # MongoDB connection (to be created)
├── server.js # Main application entry point
├── .env # Environment variables (create this)
├── .gitignore # Git ignore file
├── package.json # Project dependencies
└── README.md # Project documentation


## 🚀 Running the Application

### Development Mode
  -npm run dev

  
### Production Mode
  -nmp start 

  
The server will start on `http://localhost:5000` (or your specified PORT).

## 📡 API Endpoints (To Be Implemented)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Vehicles
- `POST /api/vehicles` - Add new vehicle
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:id` - Get vehicle by ID
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Accidents
- `POST /api/accidents` - Report new accident
- `GET /api/accidents` - Get all accidents
- `GET /api/accidents/:id` - Get accident by ID
- `GET /api/accidents/vehicle/:vehicleId` - Get accidents by vehicle

## 🔒 Security Implementation

### Password Security
User passwords are automatically hashed using bcrypt with a salt factor of 10 before storage [file:16].

### Data Encryption
Sensitive accident data is encrypted using AES-256-CBC before transmission to emergency services [file:17].

### API Security
- **Helmet.js**: Sets various HTTP headers for security
- **CORS**: Configured for cross-origin resource sharing
- **Environment Variables**: Sensitive data stored securely

## 📱 Emergency Notification Flow

Accident Detected
↓
Data Encryption
↓
┌───┴───┐
▼ ▼
Email SMS
Alert Alert
↓ ↓
Emergency Services


When an accident is detected:
1. Accident data is encrypted using AES-256-CBC
2. Email sent to `112@emergency.in` with encrypted details
3. SMS sent to emergency number `112` with location info
4. Both notifications happen simultaneously for rapid response

## 🛠️ Missing Files to Create

### 1. `config/db.js` - Database Connection
  -const mongoose = require('mongoose');

  -const connectDB = async () => {
 -try {
   await mongoose.connect(process.env.MONGODB_URI, {
   useNewUrlParser: true,
  useUnifiedTopology: true,
   });
  console.log('MongoDB Connected...');
   } catch (error) {
   console.error('Database connection error:', error.message);
   process.exit(1);
   }
  };

  module.exports = connectDB;

  
### 2. `routes/authRoutes.js` - Authentication Routes
  const express = require('express');
  const router = express.Router();
  const User = require('../models/User');

  // Define your authentication routes here
  router.post('/register', async (req, res) => {
  // Registration logic
  });

  router.post('/login', async (req, res) => {
 // Login logic
 });

 module.exports = router;

 
### 3. `.gitignore`
  -node_modules/
  -.env
  -*.log
  -.DS_Store
  -coverage/
  -dist/
  -build/


### 4. `package.json` - Add Scripts
  {
"name": "accident-detection-system",
"version": "1.0.0",
"description": "Vehicle accident detection and emergency notification system",
"main": "server.js",
"scripts": {
"start": "node server.js",
"dev": "nodemon server.js",
"test": "jest"
},
"keywords": ["accident", "detection", "emergency", "nodejs", "mongodb"],
"author": "Your Name",
"license": "MIT",
"dependencies": {
"express": "^4.18.2",
"mongoose": "^7.0.0",
"dotenv": "^16.0.3",
"cors": "^2.8.5",
"helmet": "^7.0.0",
"bcryptjs": "^2.4.3",
"twilio": "^4.10.0",
"nodemailer": "^6.9.1",
"jsonwebtoken": "^9.0.0"
},
"devDependencies": {
"nodemon": "^2.0.22",
"jest": "^29.5.0"
}
}



## ⚠️ Important Notes

### Security Considerations
1. **Deprecated Crypto Methods**: The current encryption implementation uses deprecated `createCipher` and `createDecipher` methods. Update to `createCipheriv` and `createDecipheriv` for better security
2. **Environment Variables**: Never commit `.env` file to version control
3. **API Keys**: Rotate credentials regularly
4. **HTTPS**: Use HTTPS in production for secure data transmission

### Recommended Updates

**Update `encryption.js` for Better Security:**
  const crypto = require('crypto');
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // 32 bytes
const IV_LENGTH = 16;

const encryptData = (data) => {
const iv = crypto.randomBytes(IV_LENGTH);
const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
let encrypted = cipher.update(data, 'utf8', 'hex');
encrypted += cipher.final('hex');
return iv.toString('hex') + ':' + encrypted;
};




## 📊 Database Schema Overview

| Model | Key Fields | Purpose |
|-------|-----------|---------|
| User | name, email, password, role | User authentication and management |
| Vehicle | owner, model, plateNumber, autonomousFeatures | Vehicle tracking and information |
| Accident | vehicle, location, severity, timestamp | Accident records and analytics |

## 🔮 Future Enhancements

- [ ] Implement JWT authentication middleware
- [ ] Add accident severity prediction using ML
- [ ] Real-time location tracking with GPS integration
- [ ] Dashboard for accident analytics and reporting
- [ ] Mobile app integration (React Native/Flutter)
- [ ] WebSocket support for real-time updates
- [ ] Integration with traffic management systems
- [ ] Multi-language support for notifications
- [ ] Add unit and integration tests
- [ ] Implement rate limiting for API protection
- [ ] Add accident history and statistics API
- [ ] Support for multiple emergency contact numbers
- [ ] Integration with hospital availability systems

## 🧪 Testing

Run tests (after implementing test cases)
npm test

Run with coverage
npm run test:coverage


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Express.js for the robust web framework
- MongoDB for flexible data storage
- Twilio for reliable SMS delivery
- Nodemailer for email notifications
- The Node.js community for excellent documentation

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub or contact the maintainer.

## ⚡ Quick Start Checklist

- [ ] Clone repository
- [ ] Install dependencies (`npm install`)
- [ ] Create `.env` file with all required variables
- [ ] Set up MongoDB (local or Atlas)
- [ ] Configure Twilio account
- [ ] Set up Gmail app password
- [ ] Create missing files (`db.js`, `authRoutes.js`)
- [ ] Run the server (`npm run dev`)
- [ ] Test emergency notification system
- [ ] Implement remaining API routes

---

**Status**: 🚧 Under Development - Core modules implemented, API routes and frontend pending

**Version**: 1.0.0 (Backend Core)

⭐ **Star this repository if you find it useful!**
