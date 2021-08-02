import { makeAutoObservable, runInAction } from 'mobx';
import HttpUser from '../service/http-user';

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getUser() {
    const res = await HttpUser.getUser();
    if (res.status !== 200) {
      return false;
    }
    runInAction(() => {
      this.user = { ...res.data };
    });
    return true;
  }

  async setInterestArea(area) {
    const res = await HttpUser.setInterestArea(area);
    if (res.status !== 200) {
      return false;
    }
    return true;
  }
}

export default new UserStore();
