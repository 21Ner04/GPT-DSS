// eslint-disable-next-line no-unused-vars
const state = {};
const body = document.body
const submitButton = document.querySelector('.btn-submit');
const addButton = document.querySelector('.add-chat');
const regenerateButton = document.querySelector('.response');
const toggle = document.querySelector('.theme')
toggle.addEventListener('click', (event) =>{
  const elementSection = document.querySelector('.main').querySelectorAll('*')
  if(event.target.classList.contains('dark-mode')){
    body.classList.remove('body-black')
    body.classList.add('body-white')  
    event.target.classList.remove('dark-mode');
    event.target.classList.add('light-mode');
    event.target.textContent = '☾ Dark mode'
    section.forEach((element) =>{
      element.style.color = 'black';
    })
  }else{
    event.target.classList.remove('light-mode');
    event.target.classList.add('dark-mode');
    body.classList.remove('body-white') 
    body.classList.add('body-black') 
    event.target.textContent = '☼ Light mode';
    section.forEach((element) =>{
      element.style.color = 'white';
    })
  }
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
