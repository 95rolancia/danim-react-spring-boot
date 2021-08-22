export const getPlaceImgUrl = (imgUrl) => {
  if (imgUrl == null) return null;
  return `${process.env.REACT_APP_IMAGE_BASE_URL}place/${imgUrl}`;
};
