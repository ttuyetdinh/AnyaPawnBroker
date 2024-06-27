import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repo: Repository<User>,
    ) {
        this.repo = repo;
    }

    async findById(id: string) {
        return this.repo.findOneBy({ id: id });
    }

    async findByEmail(email: string) {
        return this.repo.findOneBy({ email: email });
    }

    async findAll() {
        return this.repo.find();
    }

    async create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return this.repo.save(user);
    }

    async update(id: string, attrs: Partial<User>) {
        const user = await this.repo.findOneBy({ id: id });

        if (!user) {
            return null;
        }

        Object.assign(user, attrs);
        return this.repo.save(user);
    }
    async remove(id: string) {
        const user = await this.repo.findOneBy({ id: id });

        if (!user) {
            throw new Error('User not found');
        }
        await this.repo.remove(user);
    }
}
