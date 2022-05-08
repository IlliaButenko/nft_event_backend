import { Column, Entity, BeforeInsert, Exclusion, OneToMany } from 'typeorm';
import { SoftDelete } from 'src/common/core/soft-delete';
import { UserDto } from '../dtos/user.dto';
import { UserRole } from '../enums/user-role.enum';
import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { UserType } from '../enums/user-type.enum';
import { EventCard } from 'src/event/entities/event_card.entity';
import { Message } from 'src/message/entities/message.entity';
import { Ticket } from 'src/event/entities/ticket.entity';

@Entity('users')
export class User extends SoftDelete {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: UserType.normal })
  user_type: UserType;

  @Column({ nullable: true })
  login_user: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  preProcess() {
    this.email = this.email.toLowerCase();
    return hash(this.password, 10).then(
      (encrypted) => (this.password = encrypted),
    );
  }

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  role: UserRole;

  @Column({ nullable: true })
  email_verified: boolean;

  @Column({ nullable: true })
  verification_code: string;

  @Column({ nullable: true })
  forgetpassword_code: string;

  @Column({ default: 0 })
  followers: number;

  @Column({ nullable: true })
  medium: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  background: string;

  @Column({ nullable: true })
  wallet_address: string;

  @OneToMany(() => EventCard, event_card => event_card.creator )
  event_cards: EventCard[]

  @OneToMany(() => Ticket, ticket => ticket.buyer )
  tickets: Ticket[]

  @OneToMany(() => Message, message => message.creator )
  messages: Message[]

  toUserDto(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      user_type: this.user_type,
      login_user: this.login_user,
      email_verified: this.email_verified,
      followers: this.followers,
      medium: this.medium,
      instagram: this.instagram,
      twitter: this.twitter,
      facebook: this.facebook,
      avatar: this.avatar,
      background: this.background,
      wallet_address: this.wallet_address,
    };
  }
}
