const { google } = require('googleapis');
const cheerio = require('cheerio');
const run = require('./openAI');

function readEmails(accessToken, refreshToken, profile) {
    const arr = [];
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    gmail.users.getProfile({
        userId: 'me'
    }, (err, res) => {
        if (err) {
            console.error('Error retrieving user profile:', err);
            return;
        }

        const emailId = res.data.emailAddress;
        console.log('User email ID:', emailId);

        gmail.users.messages.list({
            userId: 'me',
            q: 'in:inbox',
        }, (err, res) => {
            if (err) {
                console.error('The API returned an error:', err);
                return;
            }
            const messages = res.data.messages;
            if (messages) {
                messages.forEach((message) => {
                    gmail.users.messages.get({
                        userId: 'me',
                        id: message.id,
                        format: 'full',
                    }, async (err, res) => {
                        if (err) {
                            console.error('Error retrieving message:', err);
                            return;
                        }
                        const messageData = res.data;
                        const subject = messageData.payload.headers.find(header => header.name === 'Subject').value;

                        let body = '';

                        
                        if (messageData.payload.parts) {
                            const bodyPart = messageData.payload.parts.find(part => part.mimeType === 'text/html');
                            if (bodyPart) {
                                
                                const $ = cheerio.load(Buffer.from(bodyPart.body.data, 'base64').toString());
                                body = $('body').text();
                            }
                        } else {
                            
                            body = Buffer.from(messageData.payload.body.data, 'base64').toString();
                        }

                        arr.push({ subject, body });
                        if (arr.length == messages.length) {
                            arr.forEach(async (e, idx) => {
                                try {
                                    if (idx == 0) {
                                        console.log(body);
                                        await run(body, subject, emailId);
                                        
                                    }

                                } catch (error) {
                                    console.log(error)
                                }
                            })
                        }

                    });

                });

            } else {
                console.log('No messages found.');
            }
        });
    });
}

module.exports = readEmails;
