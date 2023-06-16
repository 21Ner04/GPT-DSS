import i18next from 'i18next';

import enImage from '../assets/images/favicon-e-32x32.png';

import ruImage from '../assets/images/favicon-ru-32x32.png';

const app = () => {
const state = {
  lang: 'en',
};
const i18nextInstance = i18next.createInstance()
const { body } = document;
const input = document.querySelector('textarea');
const submitButton = document.querySelector('.btn-submit');
const addButton = document.querySelector('.add-chat');
const regenerateButton = document.querySelector('.response');
const languageButton = document.querySelector('.theme-toggle');
languageButton.insertAdjacentHTML('afterbegin', `<img src=${enImage} alt="en">`);

// dark - light mode knopka
const toggle = document.querySelector('.theme');
toggle.addEventListener('click', (event) => {
  const elementSection = document.querySelector('.main').querySelectorAll('*');
  const myEvent = event;
  if (myEvent.target.classList.contains('dark-mode')) {
    body.classList.remove('body-black');
    body.classList.add('body-white');
    myEvent.target.classList.remove('dark-mode');
    myEvent.target.classList.add('light-mode');
    myEvent.target.textContent = '☾ Dark mode';
    elementSection.forEach((element) => {
      const copyElement = element;
      copyElement.style.color = 'black';
    });
  } else {
    myEvent.target.classList.remove('light-mode');
    myEvent.target.classList.add('dark-mode');
    body.classList.remove('body-white');
    body.classList.add('body-black');
    myEvent.target.textContent = '☼ Light mode';
    elementSection.forEach((element) => {
      const copyElement = element;
      copyElement.style.color = 'white';
    });
  }
});
// -----------------------------------------------------

// re - e flag knopka
const language = document.querySelector('.theme-toggle');
language.addEventListener('click', (event) => {
  const myEvent = event;
  if (state.lang === 'en') {
    myEvent.target.src = ruImage;
    myEvent.alt = 'ru';
    state.lang = 'ru';
  } else {
    myEvent.target.src = enImage;
    myEvent.alt = 'en';
    state.lang = 'en';
  }
});
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
}
export default app;