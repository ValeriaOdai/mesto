export default class UserInfo {
  constructor(profileNameSelector, profileInfoSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileInfo = document.querySelector(profileInfoSelector);
  }

  getUserInfo() {
    return {
      userName: this._profileName.textContent,
      userInfo: this._profileInfo.textContent
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileInfo.textContent = data.info; 
  }
}