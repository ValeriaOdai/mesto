export default class UserInfo {
  constructor(profileNameSelector, profileInfoSelector, avatarSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileInfo = document.querySelector(profileInfoSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
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
    this._profileInfo.textContent = data.about; 
  }

  setAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}