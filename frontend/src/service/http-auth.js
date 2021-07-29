import { instance } from './http-instance';

class HttpAuth {
  constructor(instance) {
    this.instance = instance;
  }

  async signIn(user) {
    try {
      const res = await this.instance.post('/auth/signin', user);
      this.instance.defaults.headers.common['Authorization'] =
        res.data.accessToken;
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status === 401) {
        return res;
      }
      throw new Error(`auth email error ${error}`);
    }
  }

  async signUp(user) {
    try {
      const res = await this.instance.post('/signup', user);
      console.log(res);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status !== 200) {
        return res;
      }
      throw new Error(`sign up error ${error}`);
    }
  }

  async duplicateCheckEmail(email) {
    try {
      const res = await this.instance.post(`/duplicate/email`, email);
      console.log(res);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status === 409 && res.data === 'duplicate') {
        return res;
      }
      throw new Error(`auth email error ${error}`);
    }
  }

  async authEmailCode(emailAndCode) {
    try {
      const res = await this.instance.post(`/auth/email`, emailAndCode);
      console.log(res);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status === 409 && res.data === 'not authorized') {
        return res;
      }
      if (res.status === 403) {
        return res;
      }
      throw new Error(`auth email error ${error}`);
    }
  }

  async duplicateCheckNickname(nickname) {
    try {
      const res = await this.instance.post(`/duplicate/nickname`, nickname);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.data === 'duplicate' && res.status === 409) {
        return res;
      }
      throw new Error(`auth email error ${error}`);
    }
  }
}

export default new HttpAuth(instance);
