import { makeAutoObservable, runInAction } from 'mobx';
import HttpSearch from '../service/http-search';

class SearchStore {
  searchType = 'Area';
  searchedStory = [];
  searchStoryState = 'done';
  searchedUser = [];
  searchUserState = 'done';
  searchedPlace = [];
  searchPlaceState = 'done';
  placeDetailInfo = null;

  constructor() {
    makeAutoObservable(this);
  }

  async searchStory(keyword) {
    if (!keyword) return;
    this.searchStoryState = 'pending';
    this.searchType = 'Area';
    const res = await HttpSearch.searchStory(keyword);
    if (res.status !== 200) {
      return;
    }

    runInAction(() => {
      this.searchedStory = res.data;
      this.searchStoryState = 'done';
    });
  }

  async searchUser(keyword) {
    if (!keyword) return;
    this.searchUserState = 'pending';
    this.searchType = 'User';
    const res = await HttpSearch.searchUser(keyword);
    if (res.status !== 200) {
      return;
    }

    runInAction(() => {
      this.searchedUser = res.data;
      this.searchUserState = 'done';
    });
  }

  async searchPlace(keyword) {
    if (!keyword) return;
    this.searchPlaceState = 'pending';
    const res = await HttpSearch.searchPlace(keyword);
    if (res.status !== 200) {
      return;
    }

    runInAction(() => {
      this.searchedPlace = res.data.places;
      this.searchPlaceState = 'done';
    });
  }

  async getPlaceInfo(keyword) {
    if (!keyword) return;
    const res = await HttpSearch.getPlaceInfo(keyword);
    if (res.status !== 200) {
      return;
    }

    runInAction(() => {
      this.placeDetailInfo = res.data;
    });
  }
}

export default new SearchStore();
