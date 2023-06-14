// eslint-disable-next-line no-unused-vars
const state = {};
const submitButton = document.querySelector('.btn-submit');
const addButton = document.querySelector('.add-chat');
const regenerateButton = document.querySelector('.response');
const toggle = document.querySelector('.toggle');
toggle.addEventListener('click', (event) =>{
  const button = document.createElement('button');
  button.classList.add('toggle');
  
})
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
