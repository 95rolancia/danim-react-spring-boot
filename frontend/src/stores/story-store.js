import { makeAutoObservable } from 'mobx';
import HttpStory from '../service/http-story';

class StoryStore {
  lat = null;
  lng = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLatLng(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  async getStory(storyNo) {
    const res = await HttpStory.getStory(storyNo);
    if (res.status === 404) {
      return null;
    }
    return res.data;
  }

  async deleteStory(storyNo) {
    const res = await HttpStory.deleteStory(storyNo);
    if (res.status !== 200) {
      return;
    }
    return true;
  }

  async like(storyNo) {
    const res = await HttpStory.like(storyNo);
    if (res.status === 400) {
      return 'exist';
    }
    return true;
  }

  async unlike(storyNo) {
    const res = await HttpStory.unlike(storyNo);
    if (res.status === 400) {
      return 'exist';
    }
    return true;
  }

  async getCommentList(storyNo) {
    const res = await HttpStory.getCommentList(storyNo);
    if (res.status !== 200) {
      return;
    }
    return res.data;
  }

  async writeComment(comment) {
    const res = await HttpStory.writeComment(comment);
    if (res.status !== 200) {
      return;
    }
    return true;
  }

  async deleteComment(comment) {
    const res = await HttpStory.deleteComment(comment);
    if (res.status !== 200) {
      return;
    }
    return true;
  }
}

export default new StoryStore();
