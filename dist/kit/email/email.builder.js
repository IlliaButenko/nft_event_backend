"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const EmailBuilder = {
    confirmRegisterEmail: (verification_code) => `
    <html>this is confirm register email. Verifiy your email by clicking this <a href="${process.env.APP_URL}/signin?email_verify=${verification_code}">link</a><br/></html>
  `,
    forgetPasswordEmail: (forgetpassword_code) => `
  <html>this is email to reset password. Reset password by clicking this <a href="${process.env.APP_URL}/reset_password/${forgetpassword_code}">link</a><br/></html>
  `,
    messageEmail: async (link, content, qrImagePath) => {
        return `
      <html>
        <div>
          ${content}
        </div>
        <div style="text-align: center">
          <img src="${qrImagePath}" style="width: 300px"/>
        </div>
        <div>
          Click this <a href="${link}">link</a>.
        </div>
      </html>
    `;
    }
};
exports.default = EmailBuilder;
//# sourceMappingURL=email.builder.js.map