# My Node.js Application

This is a Node.js application that implements a user registration system with features such as MongoDB integration, IP validation, OTP (One-Time Password) generation and verification, and secure password handling.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed 
- MongoDB installed and running
- Twilio account and API credentials (for sending SMS OTPs)

## Installation

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/your-username/your-repo.git
Change to the project directory:
   cd your-repo
Install the required dependencies:
  npm install

Create a .env file in the root directory of the project and set the following environment variables:

MONGODB_URI=your-mongodb-connection-string
TWILIO_SID=your-twilio-account-sid

TWILIO_AUTH_TOKEN=your-twilio-auth-token

TWILIO_PHONE_NUMBER=your-twilio-phone-number

To run the application, use the following command:

  Node Index.js

