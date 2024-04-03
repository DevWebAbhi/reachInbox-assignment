# reachInbox-assignment

# Email Assistant

## Description
Email Assistant is a Node.js application that reads emails from a user's Gmail inbox using OAuth authentication and replies to emails based on their content. The application integrates with the Google Gmail API, Nodemailer for sending emails, and Gemni AI models for generating replies.

## Features
- OAuth authentication with Google for accessing Gmail API
- Reading emails from the user's Gmail inbox
- Parsing email content to generate appropriate replies
- Using Gemni AI models for generating email replies
- Sending replies to the original sender using Nodemailer

## Installation
1. Clone the repository: `git clone https://github.com/DevWebAbhi/reachInbox-assignment.git`
2. Navigate to the project directory: `cd reachInbox-assignment`
3. Install dependencies: `npm install`

## Usage
1. Set up OAuth credentials for your Google Cloud project as described in the [Google OAuth documentation](https://cloud.google.com/docs/authentication/getting-started).
2. Configure the OAuth credentials in the project.
3. Run the application: `node app.js`
4. Open your web browser and navigate to the provided URL for OAuth authentication.
5. Log in with your Google account and grant access to the application.
6. Once authenticated, the application will start reading your emails and generating replies.

## Dependencies
- googleapis: For interacting with the Google Gmail API
- nodemailer: For sending emails
- Gemeni AI: generating text for replying according to email
- cheerio: For parsing HTML email content
- express: For handling OAuth callbacks
- dotenv: For managing environment variables


## Deployed Link For OAuth

- https://reachinbox-assignment-zdhi.onrender.com/auth/google