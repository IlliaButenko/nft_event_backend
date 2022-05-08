import { UserType } from "src/user/enums/user-type.enum";
export declare function generateAccount(name: string, email: string, user_type: UserType): {
    email: string;
    password: string;
    name: string;
    verification_code: string;
    email_verified: boolean;
    user_type: UserType;
};
export declare function generateUsers(): {
    email: string;
    password: string;
    name: string;
    verification_code: string;
    email_verified: boolean;
    user_type: UserType;
}[];
