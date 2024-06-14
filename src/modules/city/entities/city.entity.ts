import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Event } from '../../event/entities/event.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city_name: string;

  @Column()
  country_name: string;

  @OneToMany(() => Event, (event) => event.city)
  events: Event[];
}
