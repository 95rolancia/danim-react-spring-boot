import { instance } from './http-instance';

class HttpStory {
    constructor(instance) {
        this.instance = instance;
    }

    async getStory(storyNo) {
        try {
            const res = await this.instance.get('/story/' + storyNo);
            return res;
        } catch (error) {
            const res = error.response;
            throw new Error(`story get error ${(res, error)}`);
        }
    }

    async deleteStory(storyNo) {
        try {
            const res = await this.instance.delete('/story/' + storyNo);
            return res;
        } catch (error) {
            const res = error.response;
            throw new Error(`delete story error ${(res, error)}`);
        }
    }

    async like(storyNo) {
        try {
            const res = await this.instance.post('/love', storyNo);
            return res;
        } catch (error) {
            const res = error.response;
            if (res.status === 400) {
                return res;
            }

            throw new Error(`Like Error ${error.response}`);

        }
    }

    async unlike(storyNo) {
        try {
            const res = await this.instance.delete('/love', {
                data: {
                    storyNo: storyNo.storyNo,
                },
            });
            return res;
        } catch (error) {
            const res = error.response;
            console.log(res);
            if (res.status === 400) {
                return res;
            }
            throw new Error(`UnLike Error ${error.response}`);
        }
    }

    async getCommentList(storyNo) {
        try {
            const res = await this.instance.get('/comment/' + storyNo);
            return res;
        } catch (error) {
            const res = error.response;
            console.log(res);
            throw new Error(`CommentList Error ${error.response}`);
        }
    }

    async writeComment(comment) {
        try {
            const res = await this.instance.post('/comment', comment);
            return res;
        } catch (error) {
            const res = error.response;
            console.log(res);
            throw new Error(`WriteComment Error ${error.response}`);
        }
    }

    async deleteComment(comment) {
        try {
            const res = await this.instance.delete('/comment', {
                data: {
                    commentNo: comment.commentNo,
                    storyNo: comment.storyNo
                }
            });
            return res;
        } catch (error) {
            const res = error.response;
            console.log(res);
            throw new Error(`DeleteComment Error ${error.response}`);
        }
    }
}

export default new HttpStory(instance);