import { makeAutoObservable, runInAction } from 'mobx';
import HttpSearch from '../service/http-search';

const searchAreaDummyData = [
  {
    img: 'https://picsum.photos/200/200',
    name: '장수왕족발',
    type: '음식점',
  },
  {
    img: 'https://picsum.photos/200/200',
    name: '몽상드애월',
    type: '관광지',
  },
  {
    img: 'https://picsum.photos/200/200',
    name: '준혁이집',
    type: '숙소',
  },
  {
    img: 'https://picsum.photos/200/200',
    name: '데빌종현네집',
    type: '관광지',
  },
];

const searchUserDummyData = [
  {
    img: 'https://picsum.photos/200/200',
    name: '김문희',
  },
  {
    img: 'https://picsum.photos/200/200',
    name: '김경원',
  },
  {
    img: 'https://picsum.photos/200/200',
    name: '데빌종현',
  },
  {
    img: 'https://picsum.photos/200/200',
    name: '노영주',
  },
];

class SearchStore {
  searchType = null;
  searchedArea = null;
  searchedUser = null;

  constructor() {
    makeAutoObservable(this);
  }

  async searchArea(keyword) {
    // const res = await HttpSearch.searchArea(keyword);
    const res = {
      status: 200,
      data: [...searchAreaDummyData],
    };
    if (res.status !== 200) {
      return;
    }

    runInAction(() => {
      this.searchedArea = res.data;
      this.searchType = 'Area';
    });
  }

  async searchUser(keyword) {
    // const res = await HttpSearch.searchUser(keyword);
    const res = {
      status: 200,
      data: [...searchUserDummyData],
    };
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
