import { makeAutoObservable } from 'mobx';
import HttpAuth from '../service/http-auth';

class AuthStore {
  isLoggedIn = false;
  isEmailDuplicated = false;
  isNickNameDuplicated = false;
  isEmailCodeAuthroized = false;
  user = {};

  constructor() {
    makeAutoObservable(this);
  }

  async signIn(signInDto) {
    const res = await HttpAuth.signIn(signInDto);
    if (res.status === 401) {
      return;
    }
    console.log(res);
    this.isLoggedIn = true;
    return res;
  }

  async duplicateCheckEmail(email) {
    const res = await HttpAuth.duplicateCheckEmail(email);
    if (res.status === 403 && res.data === 'duplicate') {
      this.isEmailDuplicated = true;
    }
  }

  async authEmailCode(emailAndCode) {
    const res = await HttpAuth.authEmailCode(emailAndCode);
    if (res.status === 409 && res.data === 'not authorized') {
      this.isEmailCodeAuthroized = true;
    }
  }

  async duplicateCheckNickname(nickname) {
    const res = await HttpAuth.duplicateCheckNickname(nickname);
    console.log(res);
    if (res.status === 409 && res.data === 'duplicate') {
      this.isNickNameDuplicated = true;
    }
  }
}

export default new AuthStore();
