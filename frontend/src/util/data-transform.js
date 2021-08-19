export const getPlanDate = (startDate, endDate) => {
  if (startDate == null) return '정보 없음';
  return (
    startDate.getFullYear() +
    '.' +
    (startDate.getMonth() + 1) +
    '.' +
    startDate.getDate() +
    ' - ' +
    (endDate.getMonth() + 1) +
    '.' +
    endDate.getDate()
  );
};

export const getFullPlanDate = (startDate, endDate) => {
  if (startDate == null) return 3;
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
};

export const getPictureDate = (createdDate) => {
  if (createdDate === null) return '정보 없음';
  return (
    createdDate.getHours() +
    '시 ' +
    (createdDate.getMinutes()) +
    '분'
  );
}
