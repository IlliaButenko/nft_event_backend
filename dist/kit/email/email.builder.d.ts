declare const EmailBuilder: {
    confirmRegisterEmail: (verification_code: any) => string;
    forgetPasswordEmail: (forgetpassword_code: any) => string;
    messageEmail: (link: any, content: any, qrImagePath: any) => Promise<string>;
};
export default EmailBuilder;
