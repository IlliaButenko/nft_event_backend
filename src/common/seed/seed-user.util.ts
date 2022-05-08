import { UserType } from "src/user/enums/user-type.enum";

const defaultPassword = 'password';

const users = [
  { email: 'skygod1994323@gmail.com', name: 'Sky God', type: UserType.admin },
  { email: 'kssalexander323@gmail.com', name: 'Alik', type: UserType.normal },
];

export function generateAccount(name: string, email: string, user_type: UserType) {
  return {
    email: email,
    password: defaultPassword,
    name: name,
    verification_code: '',
    email_verified: true,
    user_type: user_type
  };
}

export function generateUsers() {
  return users.map((user) => generateAccount(user.name, `${user.email}`, user.type));
}
