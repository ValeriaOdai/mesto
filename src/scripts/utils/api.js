export const receiveUserInfo = () => {
  return fetch('https://nomoreparties.co/v1/cohort-66/users/me', {
    headers: {
      authorization:'95f48dd5-47ba-421d-a53c-6d9826168662'
    }
  })
}
  

export const receiveCardsInfo = () => {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
    headers: {
      authorization:'95f48dd5-47ba-421d-a53c-6d9826168662'
    }
  })
}
