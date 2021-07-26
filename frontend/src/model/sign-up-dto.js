export class SignUpDto {
  constructor(userId, password, nickname, gender, age) {
    this.userId = userId;
    this.password = password;
    this.nickname = nickname;
    this.gender = gender;
    this.age = age;
  }
}
