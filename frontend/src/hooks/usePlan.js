import { useContext } from 'react';
import { PlanContext } from '../stores';

const usePlan = () => {
  return useContext(PlanContext);
};

export default usePlan;
