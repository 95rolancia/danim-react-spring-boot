import { makeAutoObservable, runInAction } from 'mobx';
import HttpAuth from '../service/http-auth';

class AuthStore {
  isLoggedIn = false;
  isEmailDuplicated = false;
  isNickNameDuplicated = false;
  isEmailCodeAuthroized = false;

  constructor() {
    makeAutoObservable(this);
  }

  async signIn(signInDto) {
    const res = await HttpAuth.signIn(signInDto);
    if (res.status === 401) {
      return false;
    }
    runInAction(() => {
      this.isLoggedIn = true;
      return true;
    });
  }

  async signUp(signUpDto) {
    const res = await HttpAuth.signUp(signUpDto);
    if (res.status === 400 || res.status === 403 || res.status === 409) {
      return false;
    }
    return true;
  }

  async silentRefresh() {
    const res = await HttpAuth.silentRefresh();
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
      return false;
    }
    await HttpAuth.signOut();
    runInAction(() => {
      this.isLoggedIn = false;
      return true;
    });
  }

  async duplicateCheckEmail(email) {
    const res = await HttpAuth.duplicateCheckEmail(email);
    if (res.status === 200) {
      runInAction(() => {
        this.isEmailDuplicated = false;
      });
    } else {
      runInAction(() => {
        this.isEmailDuplicated = true;
      });
    }
  }

  async authEmailCode(emailAndCode) {
    const res = await HttpAuth.authEmailCode(emailAndCode);
    if (res.status === 200) {
      runInAction(() => {
        this.isEmailCodeAuthroized = false;
      });
    } else {
      runInAction(() => {
        this.isEmailCodeAuthroized = true;
      });
    }
  }

  async duplicateCheckNickname(nickname) {
    const res = await HttpAuth.duplicateCheckNickname(nickname);
    if (res.status === 200) {
      runInAction(() => {
        this.isNickNameDuplicated = false;
      });
    } else {
      runInAction(() => {
        this.isNickNameDuplicated = true;
      });
    }
  }
}

export default new AuthStore();
