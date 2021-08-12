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

  async getUserInfo(nickname) {
    const res = await HttpUser.getUserInfo(nickname);
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  }

  async setInterestArea(area) {
    const res = await HttpUser.setInterestArea(area);
    if (res.status !== 200) {
      return;
    }

    runInAction(() => {
      this.user = { ...this.user, areas: [...area.areas] };
    });
  }

  async setStoryPhoto(files) {
    const res = await HttpUser.setStoryPhoto(files);
    if (res.status !== 200) {
      return false
    }
    return res
  }
}

export default new UserStore();
