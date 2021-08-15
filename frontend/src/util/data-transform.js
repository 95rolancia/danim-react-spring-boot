export const getPlanDate = (date) => {
  if (date === undefined) return '정보 없음';
  console.log(date.startDate.getDay());
  return (
    date.startDate.getFullYear() +
    '.' +
    (date.startDate.getMonth() + 1) +
    '.' +
    date.startDate.getDate() +
    ' - ' +
    (date.endDate.getMonth() + 1) +
    '.' +
    date.endDate.getDate()
  );
};

export const getFullPlanDate = (date) => {
  const diffTime = Math.abs(date.endDate - date.startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
};
