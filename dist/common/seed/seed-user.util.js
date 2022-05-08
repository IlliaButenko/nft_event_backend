"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUsers = exports.generateAccount = void 0;
const user_type_enum_1 = require("../../user/enums/user-type.enum");
const defaultPassword = 'password';
const users = [
    { email: 'skygod1994323@gmail.com', name: 'Sky God', type: user_type_enum_1.UserType.admin },
    { email: 'kssalexander323@gmail.com', name: 'Alik', type: user_type_enum_1.UserType.normal },
];
function generateAccount(name, email, user_type) {
    return {
        email: email,
        password: defaultPassword,
        name: name,
        verification_code: '',
        email_verified: true,
        user_type: user_type
    };
}
exports.generateAccount = generateAccount;
function generateUsers() {
    return users.map((user) => generateAccount(user.name, `${user.email}`, user.type));
}
exports.generateUsers = generateUsers;
//# sourceMappingURL=seed-user.util.js.map