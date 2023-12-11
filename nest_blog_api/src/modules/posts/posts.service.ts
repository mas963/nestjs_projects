import { Injectable } from "@nestjs/common";
import { Post } from "./post.entity";
import { PostDto } from "./dto/post.dto";
import { User } from "../users/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) { }

    async create(post: PostDto, userId): Promise<Post> {
        return await this.postRepository.save({ ...post, userId });
    }

    async findAll(): Promise<Post[]> {
        return await this.postRepository.find({
            relations: { user: true },
        });
    }

    async findOne(id): Promise<Post> {
        return await this.postRepository.findOne({
            where: { id },
            relations: ['users'],
        });
    }

    async delete(id): Promise<void> {
        await this.postRepository.delete(id);
    }

    async update(id, postDto: PostDto) : Promise<Post> {
        const post: Post = new Post();

        post.title = postDto.title;
        post.body = postDto.body;
        post.id = id;

        return this.postRepository.save(post);
    }
}