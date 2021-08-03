import { makeAutoObservable, runInAction } from 'mobx';
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

    this.isLoggedIn = true;

    return res;
  }

  async slientRefresh() {
    const res = await HttpAuth.slientRefresh();
    if (res.status !== 200) {
      return false;
    }
    runInAction(() => {
      this.isLoggedIn = true;
      return true;
    });
  }

  async signOut() {
    if (!this.isLoggedIn) {
      return;
    }
    await HttpAuth.signOut();
    runInAction(() => {
      this.isLoggedIn = false;
    });
  }

  async duplicateCheckEmail(email) {
    const res = await HttpAuth.duplicateCheckEmail(email);
    if (res.status === 200) {
      this.isEmailDuplicated = true;
    } else {
      this.isEmailDuplicated = false;
    }
  }

  async authEmailCode(emailAndCode) {
    const res = await HttpAuth.authEmailCode(emailAndCode);
    if (res.status === 200) {
      this.isEmailCodeAuthroized = true;
    } else {
      this.isEmailCodeAuthroized = false;
    }
  }

  async duplicateCheckNickname(nickname) {
    const res = await HttpAuth.duplicateCheckNickname(nickname);
    console.log(res);
    if (res.status === 200) {
      this.isNickNameDuplicated = true;
    } else {
      this.isNickNameDuplicated = false;
    }
  }
}

export default new AuthStore();
