import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Event } from '../../event/entities/event.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cityName: string;

  @Column()
  countryName: string;

  @OneToMany(() => Event, (event) => event.city)
  events: Event[];
}
