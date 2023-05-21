export default class UserInfo {
  constructor(profileName, profileInfo) {
    this._profileName = document.querySelector(profileName);
    this._profileInfo = document.querySelector(profileInfo);
  }

  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileInfo: this._profileInfo.textContent
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.inputName;
    this._profileInfo.textContent = data.inputInfo; 
  }
}