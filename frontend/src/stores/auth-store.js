import { makeAutoObservable } from 'mobx';
import HttpClient from '../service/http-client';
class AuthStore {
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
  }

  async signIn(signInDto) {
    const res = HttpClient.signIn(signInDto);
    console.log(res);
    this.isLoggedIn = true;
    return;
  }
}

export default new AuthStore();
