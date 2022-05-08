import { Column, Entity, BeforeInsert, Exclusion } from 'typeorm';
import { SoftDelete } from 'src/common/core/soft-delete';

@Entity('events')
export class Event extends SoftDelete {
    @Column()
    table: string;

    @Column()
    events: string;

    @Column()
    concert: string;

    @Column()
    merchandising: string;

    @Column()
    collections: string;

    @Column()
    artist: string;

    @Column()
    tipology: string;

    @Column()
    venue: string;

    @Column()
    venue_table: string;

    @Column()
    address: string;
}