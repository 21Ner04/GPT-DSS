// eslint-disable-next-line no-unused-vars
const state = {};
const submitButton = document.querySelector('.submit');
const addButton = document.querySelector('.add-chat');
const regenerateButton = document.querySelector('.response');
submitButton.addEventListener('click', () => {
  // eslint-disable-next-line no-alert
  alert('я отправляю запрос');
});
addButton.addEventListener('click', () => {
  // eslint-disable-next-line no-alert
  alert('Я добавляю чат');
});
regenerateButton.addEventListener('click', () => {
  // eslint-disable-next-line no-alert
  alert('Переделываю запрос');
});
