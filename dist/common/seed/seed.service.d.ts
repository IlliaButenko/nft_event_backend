import { UserService } from '../../user/user.service';
export declare class SeedService {
    private readonly userService;
    constructor(userService: UserService);
    startDevelopmentSeed(): Promise<void>;
    seedUsers(): Promise<void>;
}
