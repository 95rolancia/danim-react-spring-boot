import { instance } from './http-instance';

class HttpMainPage{
    constructor(instance) {
        this.instance = instance;
    }

    async getMyInterestsStory() {
        try {
            const res = await this.instance.get('/home/myPopular');
            return res;
        } catch (error) {
            const res = error.response;
            throw new Error(`MyInterests get error ${(res.response)}`);
        }
    }

    async getPopularStory() {
        try {
            const res = await this.instance.get('/home/popular');
            return res;
        } catch (error) {
            const res = error.response;
            throw new Error(`Popular get error ${(res.response)}`);
        }
    }

    async getMyInterestsPhoto() {
        try {
            const res = await this.instance.get('/home/myPopular/photo');
            return res;
        } catch (error) {
            const res = error.response;
            throw new Error(`MyPhotos get error ${(res.response)}`);
        }
    }

}

export default new HttpMainPage(instance);