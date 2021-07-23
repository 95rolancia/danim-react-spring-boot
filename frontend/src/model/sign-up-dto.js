export class SignUpDto {
  constructor(userId, userPwd, userNickname, userGender, userAge) {
    this.userId = userId;
    this.userPwd = userPwd;
    this.userNickname = userNickname;
    this.userGender = userGender;
    this.userAge = userAge;
  }
}
