import { Column, Entity, BeforeInsert, Exclusion, ManyToOne, OneToMany } from 'typeorm';
import { SoftDelete } from 'src/common/core/soft-delete';
import { EventCardDto } from '../dtos/evet_card.dto';
import { User } from 'src/user/entities/user.entity';
import { Ticket } from './ticket.entity';

@Entity('event_cards')
export class EventCard extends SoftDelete {
    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
    date: string;

    @Column({ nullable: true })
    likes_number: number;

    @Column({ nullable: true })
    background: string;

    @Column({ nullable: true })
    picture_large: string;

    @Column({ nullable: true })
    picture_small: string;

    @Column()
    price: number;

    @Column("text")
    venue_description: string;

    @Column("text")
    description: string;

    @Column({ nullable: true })
    facebook: string;

    @Column({ nullable: true })
    twitter: string;

    @Column({ nullable: true })
    instagram: string;

    @Column({ nullable: true })
    tiktok: string;

    @Column({ nullable: true })
    telegram: string;

    @Column({ nullable: true })
    discord: string;

    @ManyToOne(() => User, user => user.event_cards)
    creator: User;

    @Column({ nullable: true })
    tags: string;

    @Column()
    category: string;

    @Column()
    collection: string;

    @Column()
    green_pass_needed: boolean;

    @Column({ nullable: true })
    total_tickets: number;

    @OneToMany(() => Ticket, ticket => ticket.eventcard )
    tickets: Ticket[]

    @Column({ default: 0 })
    buy_count: number;

    toEventCardDto(): EventCardDto {
        return {
            id: this.id,
            name: this.name,
            location: this.location,
            date: this.date,
            likes_number: this.likes_number,
            background: this.background,
            picture_large: this.picture_large,
            picture_small: this.picture_small,
            price: this.price,
            venue_description: this.venue_description,
            description: this.description,
            facebook: this.facebook,
            twitter: this.twitter,
            instagram: this.instagram,
            tiktok: this.tiktok,
            telegram: this.telegram,
            discord: this.discord,
            creator: this.creator.toUserDto(),
            tags: this.tags,
            category: this.category,
            collection: this.collection,
            green_pass_needed: this.green_pass_needed,
            total_tickets: this.total_tickets,
            buy_count: this.buy_count,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}