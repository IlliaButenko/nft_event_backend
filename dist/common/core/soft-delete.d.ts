export declare class SoftDelete {
    static scope: {
        default: {
            deletedAt: import("typeorm").FindOperator<any>;
        };
        allEntity: {
            deletedAt: import("typeorm").FindOperator<any>;
        };
    };
    id: string;
    deletedAt?: string;
    createdAt: string;
    updatedAt: string;
}
