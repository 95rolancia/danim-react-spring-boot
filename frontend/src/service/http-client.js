export class HttpClient {
  constructor(instance) {
    this.instance = instance;
  }

  async signIn(user) {
    const res = await this.instance.post('/signin', user);
    return res;
  }
}
