import { instance } from './http-instance';

class HttpClient {
  constructor(instance) {
    this.instance = instance;
  }

  async signIn(user) {
    try {
      const res = await this.instance.post('/auth/signin', user);
      return res;
    } catch (error) {
      throw new Error(`sign in error ${error}`);
    }
  }

  async signUp(user) {
    try {
      const res = await this.instance.post('/signup', user);
      return res;
    } catch (error) {
      throw new Error(`sign up error ${error}`);
    }
  }
}

export default new HttpClient(instance);
