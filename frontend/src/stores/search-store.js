import { makeAutoObservable, runInAction } from 'mobx';
import HttpSearch from '../service/http-search';

class SearchStore {
  searchType = 'Area';
  searchedStory = [];
  searchedUser = [];

  constructor() {
    makeAutoObservable(this);
  }

  async searchStory(keyword) {
    if (!keyword) return;
    const res = await HttpSearch.searchStory(keyword);
    if (res.status !== 200) {
      return;
    }

    runInAction(() => {
      this.searchedStory = res.data;
      this.searchType = 'Area';
    });
  }

  async searchUser(keyword) {
    if (!keyword) return;
    const res = await HttpSearch.searchUser(keyword);
    if (res.status !== 200) {
      return;
    }

    runInAction(() => {
      this.searchedUser = res.data;
      this.searchType = 'User';
    });
  }
}

export default new SearchStore();
