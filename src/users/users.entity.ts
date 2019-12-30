import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ length: 30 }) 
    username: string;

    @Column() 
    password: string;

}