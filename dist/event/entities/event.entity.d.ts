import { SoftDelete } from 'src/common/core/soft-delete';
export declare class Event extends SoftDelete {
    table: string;
    events: string;
    concert: string;
    merchandising: string;
    collections: string;
    artist: string;
    tipology: string;
    venue: string;
    venue_table: string;
    address: string;
}
