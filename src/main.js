// eslint-disable-next-line no-unused-vars
const state = 
{
  lang: 'en',
};
const body = document.body
const submitButton = document.querySelector('.btn-submit');
const addButton = document.querySelector('.add-chat');
const regenerateButton = document.querySelector('.response');

// dark - light mode knopka
const toggle = document.querySelector('.theme')
toggle.addEventListener('click', (event) =>{
  const elementSection = document.querySelector('.main').querySelectorAll('*')
  if(event.target.classList.contains('dark-mode')){
    body.classList.remove('body-black')
    body.classList.add('body-white')  
    event.target.classList.remove('dark-mode');
    event.target.classList.add('light-mode');
    event.target.textContent = '☾ Dark mode'
    elementSection.forEach((element) =>{
      element.style.color = 'black';
    })
  }else{
    event.target.classList.remove('light-mode');
    event.target.classList.add('dark-mode');
    body.classList.remove('body-white') 
    body.classList.add('body-black') 
    event.target.textContent = '☼ Light mode';
    elementSection.forEach((element) =>{
      element.style.color = 'white';
    })
  }
})
// -----------------------------------------------------

// re - e flag knopka
const language = document.querySelector(".theme-toggle")
language.addEventListener('click', (event) =>{
  if(state.lang === 'en'){
  event.target.src = 'assets/favicon/favicon-ru-32x32.png';
  event.alt = 'ru';
  state.lang = 'ru';
}else{
  event.target.src = 'assets/favicon/favicon-e-32x32.png';
  event.alt = 'en';
  state.lang = 'en';
}
})
// -----------------------------------------------------

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
