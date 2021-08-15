export const getPlanDate = (date) => {
  if (date === undefined) return '정보 없음';
  return (
    date.startDate.getFullYear() +
    '.' +
    date.startDate.getMonth() +
    '.' +
    date.startDate.getDay() +
    ' - ' +
    date.endDate.getMonth() +
    '.' +
    date.endDate.getDay()
  );
};

export const getFullPlanDate = (date) => {
  const days = date.endDate.getDay() - date.startDate.getDay() + 1;
  return days;
};
