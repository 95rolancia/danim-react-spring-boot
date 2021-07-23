export class HttpClient {
  constructor(instance) {
    this.instance = instance;
  }

  async signIn(user) {
    try {
      const res = await this.instance.post('/signin', user);
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
