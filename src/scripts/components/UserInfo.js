export default class UserInfo {
  constructor(profileNameSelector, profileInfoSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileInfo = document.querySelector(profileInfoSelector);
  }

  //возвращает объект с данными пользователя. 
  //Этот метод пригодится когда данные пользователя нужно будет подставить 
  //в форму при открытии.
  getUserInfo() {
    return {
      userName: this._profileName.textContent,
      userInfo: this._profileInfo.textContent
    };
  }

  //принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileInfo.textContent = data.occupation; 
  }
}