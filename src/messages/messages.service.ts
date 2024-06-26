import { MessagesRepository } from './messages.repository';

export class MessagesService {
    messagesRepository: MessagesRepository;
    constructor() {
        this.messagesRepository = new MessagesRepository();
    }
    async create(content: string) {
        return this.messagesRepository.create(content);
    }
    async findAll() {
        return this.messagesRepository.findAll();
    }
    async findOne(id: string) {
        return this.messagesRepository.findOne(id);
    }
}
