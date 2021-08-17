import { makeAutoObservable } from 'mobx';
import HttpMainPage from '../service/http-main-page';

class MainPageStore {
  constructor() {
    makeAutoObservable(this);
  }

  async getMyInterestsStory() {
    const res = await HttpMainPage.getMyInterestsStory();
    if (res.status !== 200) return;
    return res.data;
  }

  async getPopularStory() {
    const res = await HttpMainPage.getPopularStory();
    if (res.status !== 200) return;
    return res.data;
  }

  async getMyInterestsPhoto() {
    const res = await HttpMainPage.getMyInterestsPhoto();
    if (res.status !== 200) return;
    return res.data;
  }
}

export default new MainPageStore();
