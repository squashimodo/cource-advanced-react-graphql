const nodemailer = require('nodemailer');
const { MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER } = process.env;

var transport = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

const makeANiceEmail = text => `
  <div clasName="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px
  "><h2>Hi m8</h2><p>${text}</p></div>
`;

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;