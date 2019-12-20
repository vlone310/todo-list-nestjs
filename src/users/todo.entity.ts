import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column() 
    completed: boolean;

}
