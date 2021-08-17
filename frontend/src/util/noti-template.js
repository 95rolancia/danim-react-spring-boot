export const notiTemplate = (noti) => {
  const type = noti.type;
  switch (type) {
    case 'comment':
      return `${noti.from}님이 ${noti.dataId} 게시글에 댓글을 달았습니다.`;
    case 'love':
      return `${noti.from}님이 ${noti.dataId} 게시글에 좋아요를 눌렀습니다.`;
    case 'follow':
      return `${noti.from}님이 팔로우하셨습니다.`;
    default:
      throw new Error(`unknown notiTemplate ${type}`);
  }
};
