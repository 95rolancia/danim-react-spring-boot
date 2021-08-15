import { makeAutoObservable, runInAction } from 'mobx';
import HttpStory from '../service/http-story';

class StoryStore {
  lat = 33.492269071672496;
  lng = 126.53945522035214;

  constructor() {
    makeAutoObservable(this);
  }

  setLatLng(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  async getStory(storyno) {
    const res = await HttpStory.getStory(storyno);
    if (res.status !== 200) {
      return;
    }
    return res.data;
  }
}

export default new StoryStore();
