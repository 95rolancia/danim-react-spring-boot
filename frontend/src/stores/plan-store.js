import { makeAutoObservable } from 'mobx';
import HttpPlan from '../service/http-plan';

class PlanStore {
  startDate = null;
  endDate = null;
  selectedDay = 1;
  selectedPlaceCnt = 0;
  subPlans = null;

  constructor() {
    makeAutoObservable(this);
  }

  selectDay(day) {
    this.selectedDay = day;
  }

  setDate(startDate, endDate) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  initSubPlans(date) {
    this.subPlans = Array.from({ length: date }, () => []);
  }

  addPlaceToPlan(placeInfo) {
    this.subPlans[this.selectedDay - 1].push(placeInfo);
    this.selectedPlaceCnt += 1;
  }

  deletePlaceFromPlan(placeName, day) {
    const newSubPlan = this.subPlans[day].filter(
      (place) => place.name !== placeName,
    );
    this.subPlans[day] = newSubPlan;
    this.subPlans = [...this.subPlans];
  }

  async createPlan(plan) {
    console.log(plan);
    const res = await HttpPlan.createPlan(plan);
    if (res.status !== 200) {
      return false;
    }
    return true;
  }
}

export default new PlanStore();
