import { makeAutoObservable, runInAction } from 'mobx';
import httpBoardCreate from '../service/http-board-create';
import loadImage from 'blueimp-load-image';

class BoardCreateStore {
  duration = 0;
  photos = [];
  startDate = "";
  status = "";
  thumbnail = "";
  title = "";

  totalImgNum = 0;
  errorImgNum = 0;
  successImgNum = 0;
  isFirstPage = true;
  isLoading = false;

  nickname = "danim";

  tripDate = [];
  tripAddress = [];

  imgBaseURL = process.env.REACT_APP_IMAGE_BASE_URL;

  constructor() {
    makeAutoObservable(this);
  }

  changeLoading2MemoWrite() {
    this.isFirstPage = false;
    this.isLoading = !this.isLoading
  }

  changePage2MemoWrite() {
    this.isFirstPage = false;
  }

  handleLoading() {
    this.isLoading = !this.isLoading
  }

  async setStoryPhoto(obj) {
    const res = await httpBoardCreate.setStoryPhoto(obj);
    if (res.status !== 200) {
      return false
    };
    return res
  }

  async setStory(obj) {
    const res = await httpBoardCreate.setStory(obj);
    if (res.status !== 200) {
      return false
    };
    return res
  }

  // async handleSubmitStory() {
  //   console.log(this.tripDate)
  //   const obj = {
  //     // 이거 나중에 조금 더 고치기
  //     duration: this.tripDate,
  //     photos: this.photos,
  //     startDate: this.tripDate[0],
  //     status: this.status,
  //     thumbnail: this.photos[0],
  //     title: this.title,
  //   }
  //   console.log(obj)
  //   this.setStory(obj)
  // }

  async setNickname(nickname) {
    this.nickname = nickname
  }

  // 처음 렌더링될때만 타이틀 들어가면 좋겠는데 어디넣지
  async setDefaultTitle() {
    const getDate = () => {
      let today = new Date();
      let year = today.getFullYear();
      let month = ('0' + (today.getMonth() + 1)).slice(-2);
      let day = ('0' + today.getDate()).slice(-2);
  
      return year + '-' + month + '-' + day + '의 일기';
    };
    const defaultTitle = getDate();
    this.title = defaultTitle
    return;
  }

  async handleTitleChange(value) {
    this.title = value
    return;
  }

  async getMetaData(imgFile) {
    const result = await loadImage.parseMetaData(imgFile, {
      maxMetaDataSize: 262144,
    });
    try {
      if (result.exif.get('GPSInfo') !== undefined) {
        const gpsInfo = result.exif.get('GPSInfo').getAll();
        const latArr = gpsInfo.GPSLatitude.split(',');
        const lat =
          parseFloat(latArr[0]) +
          parseFloat(latArr[1] / 60) +
          parseFloat(latArr[2] / 3600);
        const lngArr = gpsInfo.GPSLongitude.split(',');
        const lng =
          parseFloat(lngArr[0]) +
          parseFloat(lngArr[1] / 60) +
          parseFloat(lngArr[2] / 3600);
        console.log('get meta data 완료', result);
        return {
          dateTimeDigitized: result.exif.get('Exif').get('DateTimeDigitized'),
          latitude: lat,
          longtitude: lng,
        };
      } else {
        console.log('getMetaData 실패ㅠㅠ gps 인포 언디파인드');
        return false;
      }
    } catch {
      console.log('getMetaData 실패ㅠㅠ 언디파인드는 아닌데...');
      return false;
    }
  }

  async addPhoto(photo) {
    if (this.photos.length === 0) {
      this.photos = [photo]
      return true;
    } else {
      if (Date.parse(this.photos[0].date) > Date.parse(photo.date)) {
        this.photos = [photo, ...this.photos]
      } else if (Date.parse(this.photos[this.photos.length - 1].date) < Date.parse(photo.date)) {
        this.photos = [...this.photos, photo]
      } else {
        for (let i = 1; i < (this.photos.length - 1); i++) {
          if (Date.parse(this.photos[i].date) > Date.parse(photo.date)) {
            this.photos = [...this.photos.slice(0, i), photo, ...this.photos.slice(i)]
            // this.photos = this.photos.slice(0, i) + [photo] + this.photos.slice(i)
            break;
          }
        }
      }
      return true;
    }
  }

  async sortTripDate(date) {
    const dateSet = new Set([...this.tripDate, date.slice(0, 10)])
    this.tripDate = [...dateSet].sort()
    return;
  }

  async sortTripAddress(address) {
    const addressSet = new Set([...this.tripAddress, address])
    this.tripAddress = [...addressSet].sort()
  }

  // handlePageChange() {
  //   this.isFirstPage = false
  //   this.isLoading = true

  //     setTimeout(() => {
  //       this.isLoading = false
  //     }, 1000)
  //   }

  async setTotalImgNum(num) {
    this.totalImgNum = num
  }

  resetImgErrSuccessNum() {
    console.log('넘버리셋!')
    this.errorImgNum = 0
    this.successImgNum = 0
  }

  uploadImgErrNum() {
    console.log('에러넘버추가!')
    this.errorImgNum += 1
  }

  async uploadImgSuccessNum() {
    this.successImgNum += 1
    console.log('성공넘버추가!', this.successImgNum)
    return
  }

  async uploadMemo(newMemo, address) {
    const memo = newMemo
    for (let i = 0; i < this.photos.length; i++) {
      if (this.photos[i].address === address) {
        this.photos[i].content = memo
      }
    }
  }

}

export default new BoardCreateStore();