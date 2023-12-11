import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../posts/post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
    gender: string;

    @OneToMany(() => Post, (photo) => photo.user)
    posts: Post[]
}