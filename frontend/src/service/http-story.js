import { instance } from './http-instance';

class HttpStory {
    constructor(instance) {
        this.instance = instance;
    }

    async getStory(storyno) {
        try {
            const res = await this.instance.get('/story/' + storyno);
            return res;
        } catch (error) {
            const res = error.response;
            throw new Error(`story get error ${(res, error)}`);
        }
    }
}

export default new HttpStory(instance);