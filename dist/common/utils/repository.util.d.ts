import { Repository } from 'typeorm';
export declare function getFromDto<T>(dto: any, data: any, fields?: string[]): T;
export declare function saveDtoToRepository<T>(dto: any, data: any, repository: Repository<T>, fields?: string[]): Promise<T>;
export declare function softDeleteFromRepository<T>(payload: any, repository: Repository<T>): Promise<T>;
