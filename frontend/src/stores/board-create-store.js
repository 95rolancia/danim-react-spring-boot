import { makeAutoObservable, runInAction } from 'mobx';
import httpBoardCreate from '../service/http-board-create';
import loadImage from 'blueimp-load-image';
import { CompareSharp } from '@material-ui/icons';

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

  handleTitleChange(value) {
    this.title = value
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
      console.log('사진 추가중, 첫번째 사진 추가')
      this.photos = [photo]
    } else {
      if (Date.parse(this.photos[0].date) >= Date.parse(photo.date)) {
        this.photos = [photo, ...this.photos]
      } else if (Date.parse(this.photos[this.photos.length - 1].date) < Date.parse(photo.date)) {
        this.photos = [...this.photos, photo]
      } else {
        for (let i = 1; i < (this.photos.length); i++) {
          if (Date.parse(this.photos[i].date) >= Date.parse(photo.date)) {
            this.photos = [...this.photos.slice(0, i), photo, ...this.photos.slice(i)]
            break;
          }
        }
      }
    }
    runInAction(() => {
      if (this.thumbnail === "") {
        this.thumbnail = this.photos[0].filename
      }
    })
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

  changeThumbnail(filename) {
    this.thumbnail = filename
  }

  changeTag(str, targetPhoto) {
    const tempIndex = this.photos.findIndex(photo => photo.filename === targetPhoto.filename)
    this.photos[tempIndex].tag = str
  }

  deletePhoto(targetPhoto) {
    const tempIndex = this.photos.findIndex(photo => photo.filename === targetPhoto.filename)
    console.log('템프인덱스',tempIndex)
    this.photos.splice(tempIndex, 1)

    runInAction(() => {
      if (targetPhoto.filename === this.thumbnail) {
        this.thumbnail = this.photos[0].filename
      }

      const tempDateIndex = this.tripDate.findIndex(date => date === targetPhoto.date.slice(0, 10))
      console.log(this.photos.slice(0)[0].date)
      console.log(targetPhoto.date)
      
      if (tempIndex === 0 && this.photos[0].date.slice(0, 10) !== targetPhoto.date.slice(0, 10)) {
        this.tripDate.splice(tempDateIndex, 1)
      } else if (tempIndex === (this.photos.length) && this.photos[tempIndex-1].date.slice(0, 10) !== targetPhoto.date.slice(0, 10)) {
        console.log('나는 템프인덱스', tempIndex)
        console.log('나는 포토', this.photos)
        this.tripDate.splice(tempDateIndex, 1)
      } else {
        if (
          tempIndex !== 0 && tempIndex !== (this.photos.length) &&
          this.photos[tempIndex - 1].date.slice(0, 10) !== targetPhoto.date.slice(0, 10) &&
          this.photos[tempIndex].date.slice(0, 10) !== targetPhoto.date.slice(0, 10)) {
          this.tripDate.splice(tempDateIndex, 1)
        }
      }
    })
  }

  calculateDayNum(targetDate) {
    const tempDateIndex = this.tripDate.findIndex(date => date === targetDate)
    const translateDate = [
      '첫째', '둘째', '셋째', '넷째', '다섯째', '여섯째', '일곱째', '여덟째', '아홉째', '열째', '열한째', '열두째'
    ]
    return translateDate[tempDateIndex]
  }

  calculatePrettyDate(targetDate) {
    const year = targetDate.slice(2,4)
    const month = targetDate.slice(5,7)
    const day = targetDate.slice(8, 10)
    return [year, month, day]
  }

  calculatePrettyAddress(address) {
    const addressArr = address.split(' ').slice(2).join(' ')
    return addressArr
  }
}

export default new BoardCreateStore();