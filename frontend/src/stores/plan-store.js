import { makeAutoObservable, runInAction } from 'mobx';
import HttpPlan from '../service/http-plan';

class PlanStore {
  startDate = null;
  endDate = null;
  selectedDay = 1;
  selectedPlaceCnt = 0;
  subPlans = null;
  loadingDetailPlan = 'done';
  currentReadingPlanNo = undefined;
  currentPlanType = 'write';

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

  addPlaceToPlan(placeInfo, uuid) {
    this.subPlans[this.selectedDay - 1].push({ ...placeInfo, key: uuid });
    this.selectedPlaceCnt += 1;
  }

  deletePlaceFromPlan(placeKey, day) {
    const newSubPlan = this.subPlans[day].filter(
      (place) => place.key !== placeKey,
    );
    this.subPlans[day] = newSubPlan;
    this.subPlans = [...this.subPlans];
  }

  async createPlan(plan) {
    const res = await HttpPlan.createPlan(plan);
    if (res.status !== 200) {
      return false;
    }
    return true;
  }

  async getDetailPlan(planNo) {
    this.loadingDetailPlan = 'pending';
    const res = await HttpPlan.getDetailPlan(planNo);
    if (res.status !== 200) {
      return;
    }

    runInAction(() => {
      this.currentReadingPlanNo = planNo;
      this.startDate = new Date(res.data.startDate);
      this.endDate = new Date(res.data.endDate);
      const temp = res.data.subplans.map((plan) => {
        return plan.places.map((place) => place);
      });
      this.subPlans = temp;
      this.currentPlanType = 'edit';
      this.loadingDetailPlan = 'done';
    });
  }

  async updatePlan(newPlan, planNo) {
    const res = await HttpPlan.updatePlan(newPlan, planNo);
    if (res.status !== 200) {
      return false;
    }
    return true;
  }
}

export default new PlanStore();
