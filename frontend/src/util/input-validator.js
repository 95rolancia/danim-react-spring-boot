export class InputValidator {
     checkPassword = (pwd) => {
        const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
        if (regExp.test(pwd)) {
            return true;
        } 
            return false;
        
    }

     checkEmail = (email) => {
        const regExp =/[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
        if (regExp.test(email)) {
            return true;
        } 
            return false;
    }

     checkNickname = (nickname) => {
        const regExp = /^[가-힣]{2,12}|[a-zA-Z]{2,12}\s[a-zA-Z]{2,15}$/;
        if (regExp.test(nickname)) {
            return true;
        } 
            return false;
    }
}
 