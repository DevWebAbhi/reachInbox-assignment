const { GoogleGenerativeAI } = require("@google/generative-ai");
const sendEmail = require("./mailer");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(body,subject,email) {
  
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `${subject}\n\n${body}\n\nLabels: Interested, Not Interested, More Information`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  sendEmail(email,text,subject,body);
  console.log(text);
}

module.exports=run;