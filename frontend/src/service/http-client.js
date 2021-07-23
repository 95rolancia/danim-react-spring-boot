export class HttpClient {
  constructor(instance) {
    this.instance = instance;
  }

  async signIn(user) {
    const res = await this.instance.post('/signin', user);
    return res;
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
