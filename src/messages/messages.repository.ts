import { readFile, writeFile } from 'fs/promises';

export class MessagesRepository {
    async create(content: string) {
        const data = await readFile('./file_data/messages.json', 'utf-8');
        const messages = JSON.parse(data);

        const id = Math.floor(Math.random() * 999);

        messages[id] = { id, content };

        await writeFile('./file_data/messages.json', JSON.stringify(messages));
    }
    async findAll() {
        const content = await readFile('./file_data/messages.json', 'utf-8');
        return JSON.parse(content);
    }
    async findOne(id: string) {
        const content = await readFile('./file_data/messages.json', 'utf-8');
        const messages = JSON.parse(content);

        return messages[id];
    }
}
