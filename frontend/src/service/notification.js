import { firebaseDatabase } from './firebase';

class Notification {
  syncNoti(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`noti/${userId}`);
    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      const result = [];
      for (let noti in value) {
        result.push(value[noti]);
      }
      result && onUpdate(result);
    });
    return () => ref.off();
  }
}

export default new Notification();
