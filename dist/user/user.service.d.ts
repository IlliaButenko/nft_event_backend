import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { EmailService } from 'src/kit/email/email.service';
import { UserDto } from './dtos/user.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly emailService;
    constructor(userRepository: Repository<User>, emailService: EmailService);
    addUser(payload: CreateUserDto, throwError?: boolean): Promise<User>;
    updateUser(user: User): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
    findUserById(id: string): Promise<User>;
    updateUserAvatar(id: string, avatar: any): Promise<User>;
    verifyEmail(code: any): Promise<boolean>;
    forgetPassword(email: any): Promise<boolean>;
    resetPassword(payload: any): Promise<boolean>;
    getAllUsers(): Promise<UserDto[]>;
}
