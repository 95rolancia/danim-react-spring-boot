export class InputValidator {
  checkPassword = (pwd) => {
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
    if (regExp.test(pwd)) {
      return true;
    }
    return false;
  };

  checkEmail = (email) => {
    const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    
    if (regExp.test(email)) {
      return true;
    }
    return false;
  };

  checkNickname = (nickname) => {
    const regExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]){1,11}$/;

    if (regExp.test(nickname)) {
      return true;
    }
    return false;
  };
}

export default new InputValidator();
