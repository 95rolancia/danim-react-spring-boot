import { makeAutoObservable, runInAction } from 'mobx';
import httpBoardCreate from '../service/http-board-create';

class BoardCreateStore {
  duration = 0;
  photos = [];
  startDate = ""
  status = "PUBLISHED"
  thumbnail = ""
  title = ""

  errorImg = 0;
  successImg = 0;

  nicknmae = "danim"

  constructor() {
    makeAutoObservable(this);
  }

  async setStoryPhoto(files) {
    const res = await httpBoardCreate.setStoryPhoto(files);
    if (res.status !== 200) {
      return false
    };
    return res
  }
  


}

export default new BoardCreateStore();