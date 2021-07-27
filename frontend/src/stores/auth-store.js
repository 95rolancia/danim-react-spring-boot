import { makeAutoObservable } from 'mobx';
import HttpClient from '../service/http-client';
class AuthStore {
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  async signIn(signInDto) {
    const res = await HttpClient.signIn(signInDto);
    console.log(res);
    this.isLoggedIn = true;
    return res;
  }

  async duplicateCheckEmail(email) {
    const res = await HttpClient.duplicateCheckEmail(email);
    console.log(res);
    return res;
  }

  async authEmailCode(emailAndCode) {
    const res = await HttpClient.authEmailCode(emailAndCode);
    console.log(res);
    return res;
  }
}

export default new AuthStore();
