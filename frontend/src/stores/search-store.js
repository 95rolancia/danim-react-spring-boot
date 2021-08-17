import { makeAutoObservable, runInAction } from 'mobx';
import HttpSearch from '../service/http-search';

class SearchStore {
  searchType = 'Area';
  searchedStory = [];
  searchedUser = [];
  searchedPlace = [];
  placeDetailInfo = null;

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

  async searchPlace(keyword) {
    if (!keyword) return;
    const res = await HttpSearch.searchPlace(keyword);
    console.log(res);
    if (res.status !== 200) {
      return;
    }

    runInAction(() => {
      this.searchedPlace = res.data.places;
    });
  }

  async getPlaceInfo(keyword) {
    if (!keyword) return;
    const res = await HttpSearch.getPlaceInfo(keyword);
    console.log(res);
    if (res.status !== 200) {
      return;
    }

    runInAction(() => {
      this.placeDetailInfo = res.data;
      console.log(this.placeDetailInfo);
    });
  }
}

export default new SearchStore();
