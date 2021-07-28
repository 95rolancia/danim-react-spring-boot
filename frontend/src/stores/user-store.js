import { makeAutoObservable } from 'mobx';
import HttpUser from '../service/http-user';

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getUser() {
    const res = await HttpUser.getUser();
    console.log(res);
    if (res.status === 401) {
      return;
    }
    this.user = { ...res.data };
  }
}

export default new UserStore();
