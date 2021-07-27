import { makeAutoObservable } from 'mobx';
import HttpClient from '../service/http-client';
class AuthStore {
  isLoggedIn = false;
  isEmailDuplicated = false;
  isNickNameDuplicated = false;
  isEmailCodeAuthroized = false;

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
    if (res.status === 403 && res.data === 'duplicate') {
      this.isEmailDuplicated = true;
    }
  }

  async authEmailCode(emailAndCode) {
    const res = await HttpClient.authEmailCode(emailAndCode);
    if (res.status === 409 && res.data === 'not authorized') {
      this.isEmailCodeAuthroized = true;
    }
  }

  async duplicateCheckNickname(nickname) {
    const res = await HttpClient.duplicateCheckNickname(nickname);
    console.log(res);
    if (res.status === 409 && res.data === 'duplicate') {
      this.isNickNameDuplicated = true;
    }
  }
}

export default new AuthStore();
