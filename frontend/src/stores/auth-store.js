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

  async duplicateCheckNickname(nickname) {
    const res = await HttpClient.duplicateCheckNickname(nickname);
    console.log(res);
    if (res.status === 409 && res.data === 'duplicate') {
      return true;
    }
    return false;
  }
}

export default new AuthStore();
