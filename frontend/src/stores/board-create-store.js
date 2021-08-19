import { makeAutoObservable, runInAction } from 'mobx';
import httpBoardCreate from '../service/http-board-create';

class BoardCreateStore {
  isExist = false;
  duration = 0;
  photos = [];
  startDate = '';
  status = '';
  thumbnail = '';
  title = '';

  totalImgNum = 0;
  errorImgNum = 0;
  successImgNum = 0;
  isFirstPage = true;
  isLoading = false;
  isTempChecked = true;

  nickname = 'danim';

  tripDate = [];
  tripAddress = [];

  imgBaseURL = process.env.REACT_APP_IMAGE_BASE_URL;

  currentStoryNumber = null;

  constructor() {
    makeAutoObservable(this);
  }

  changeLoading2MemoWrite() {
    this.isFirstPage = false;
    this.isLoading = !this.isLoading;
  }

  changePage2MemoWrite() {
    this.isFirstPage = false;
  }

  changePage2TitleCreate() {
    this.isFirstPage = true;
    this.isLoading = !this.isLoading;
  }

  handleLoading() {
    runInAction(() => {
      this.isLoading = !this.isLoading;
    });
  }

  async setStoryPhoto(obj) {
    const res = await httpBoardCreate.setStoryPhoto(obj);
    if (res.status !== 200) {
      return false;
    }
    this.isExist = false;
    return res;
  }

  async setStory(obj) {
    const res = await httpBoardCreate.setStory(obj);
    if (res.status !== 200) {
      return false;
    }
    this.isExist = false;
    return res;
  }

  async updateStory(obj) {
    const res = await httpBoardCreate.updateStory(obj, this.currentStoryNumber);
    if (res.status !== 200) {
      return false;
    }

    this.isExist = false;
    return true;
  }

  async setNickname(nickname) {
    runInAction(() => {
      this.nickname = nickname;
    });
  }

  async setDefaultTitle() {
    const getDate = () => {
      let today = new Date();
      let year = today.getFullYear();
      let month = ('0' + (today.getMonth() + 1)).slice(-2);
      let day = ('0' + today.getDate()).slice(-2);

      return year + '-' + month + '-' + day + '의 일기';
    };
    const defaultTitle = getDate();
    this.title = defaultTitle;
    return;
  }

  handleTitleChange(value) {
    runInAction(() => {
      this.title = value;
    });
  }

  async addPhoto(photo) {
    if (this.photos.length === 0) {
      this.photos = [photo];
    } else {
      if (Date.parse(this.photos[0].date) >= Date.parse(photo.date)) {
        this.photos = [photo, ...this.photos];
      } else if (
        Date.parse(this.photos[this.photos.length - 1].date) <
        Date.parse(photo.date)
      ) {
        this.photos = [...this.photos, photo];
      } else {
        for (let i = 1; i < this.photos.length; i++) {
          if (Date.parse(this.photos[i].date) >= Date.parse(photo.date)) {
            this.photos = [
              ...this.photos.slice(0, i),
              photo,
              ...this.photos.slice(i),
            ];
            break;
          }
        }
      }
    }
    runInAction(() => {
      if (this.thumbnail === '') {
        this.thumbnail = this.photos[0].filename;
      }
    });
  }

  async sortTripDate(date) {
    const dateSet = new Set([...this.tripDate, date.slice(0, 10)]);
    this.tripDate = [...dateSet].sort();
    return;
  }

  async sortTripAddress(address) {
    const addressSet = new Set([...this.tripAddress, address]);
    this.tripAddress = [...addressSet].sort();
  }

  async setTotalImgNum(num) {
    this.totalImgNum = num;
  }

  resetImgErrSuccessNum() {
    this.errorImgNum = 0;
    this.successImgNum = 0;
  }

  uploadImgErrNum() {
    this.errorImgNum += 1;
  }

  async uploadImgSuccessNum() {
    this.successImgNum += 1;
  }

  async uploadMemo(newMemo, address) {
    const memo = newMemo;
    for (let i = 0; i < this.photos.length; i++) {
      if (this.photos[i].address === address) {
        this.photos[i].content = memo;
      }
    }
  }

  changeThumbnail(filename) {
    this.thumbnail = filename;
  }

  changeTag(str, targetPhoto) {
    const tempIndex = this.photos.findIndex(
      (photo) => photo.filename === targetPhoto.filename,
    );
    this.photos[tempIndex].tag = str;
  }

  deletePhoto(targetPhoto) {
    const tempIndex = this.photos.findIndex(
      (photo) => photo.filename === targetPhoto.filename,
    );

    this.photos.splice(tempIndex, 1);

    runInAction(() => {
      if (targetPhoto.filename === this.thumbnail) {
        this.thumbnail = this.photos[0].filename;
      }

      const tempDateIndex = this.tripDate.findIndex(
        (date) => date === targetPhoto.date.slice(0, 10),
      );

      if (
        tempIndex === 0 &&
        this.photos[0].date.slice(0, 10) !== targetPhoto.date.slice(0, 10)
      ) {
        this.tripDate.splice(tempDateIndex, 1);
      } else if (
        tempIndex === this.photos.length &&
        this.photos[tempIndex - 1].date.slice(0, 10) !==
          targetPhoto.date.slice(0, 10)
      ) {
        this.tripDate.splice(tempDateIndex, 1);
      } else {
        if (
          tempIndex !== 0 &&
          tempIndex !== this.photos.length &&
          this.photos[tempIndex - 1].date.slice(0, 10) !==
            targetPhoto.date.slice(0, 10) &&
          this.photos[tempIndex].date.slice(0, 10) !==
            targetPhoto.date.slice(0, 10)
        ) {
          this.tripDate.splice(tempDateIndex, 1);
        }
      }
    });
  }

  calculateDayNum(targetDate) {
    const tempDateIndex = this.tripDate.findIndex(
      (date) => date === targetDate,
    );
    const translateDate = [
      '첫째',
      '둘째',
      '셋째',
      '넷째',
      '다섯째',
      '여섯째',
      '일곱째',
      '여덟째',
      '아홉째',
      '열째',
      '열한째',
      '열두째',
    ];
    return translateDate[tempDateIndex];
  }

  calculatePrettyDate(targetDate) {
    const year = targetDate.slice(2, 4);
    const month = targetDate.slice(5, 7);
    const day = targetDate.slice(8, 10);
    return [year, month, day];
  }

  calculatePrettyAddress(address) {
    if (address) {
      const addressArr = address.split(' ').slice(2).join(' ');
      return addressArr;
    }
    return [];
  }

  handleIsTempChecked(value) {
    this.isTempChecked = value;
  }

  reset() {
    this.duration = 0;
    this.photos = [];
    this.startDate = '';
    this.status = 'TEMP';
    this.thumbnail = '';
    this.title = '';
    this.totalImgNum = 0;
    this.errorImgNum = 0;
    this.successImgNum = 0;
    this.isFirstPage = true;
    this.isLoading = false;
    this.isTempChecked = true;
    this.nickname = 'danim';
    this.tripDate = [];
    this.tripAddress = [];
    this.imgBaseURL = process.env.REACT_APP_IMAGE_BASE_URL;
  }

  async getTemporarilySavedStory(storyNo) {
    this.isLoading = true;
    this.isExist = true;
    const res = await httpBoardCreate.getTemporarilySavedStory(storyNo);
    if (res.status !== 200) {
      return false;
    }

    runInAction(() => {
      this.isFirstPage = false;
      this.duration = res.data.duration;
      this.photos = []; // 나중
      this.startDate = res.data.startDate;
      this.status = res.data.status;
      this.thumbnail = res.data.thumbnail;
      this.title = res.data.title;

      this.totalImgNum = 0;
      this.errorImgNum = 0;
      this.successImgNum = 0;
      this.isFirstPage = false;
      this.isLoading = false;

      this.nickname = res.data.nickname;

      res.data.substories.forEach((story) => {
        story.photos.forEach((photo) => {
          this.sortTripDate(photo.date);
          this.sortTripAddress(photo.address);
          delete photo.photoNo;
          this.addPhoto(photo);
        });
      });

      if (res.data.status === 'PUBLISHED') {
        this.isTempChecked = true;
      } else {
        this.isTempChecked = false;
      }

      this.currentStoryNumber = storyNo;
      this.isLoading = false;
    });
  }
}

export default new BoardCreateStore();
