/* eslint-disable no-param-reassign */
import i18next from 'i18next';

import resources from './locales/index.js';

import '../assets/favicon/favicon-16x16.png';

import '../assets/favicon/favicon-32x32.png';

import enImage from '../assets/images/favicon-e-32x32.png';

import ruImage from '../assets/images/favicon-ru-32x32.png';

const app = async () => {
  const state = {
    lang: 'en',
  };

  // eslint-disable-next-line no-unused-vars
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: state.lang,
    resources,
  });
  const changeLang = async (lang) => {
    await i18nextInstance.changeLanguage(lang);
  };

  const { body } = document;
  // eslint-disable-next-line no-unused-vars
  const input = document.querySelector('textarea');
  const title = document.querySelector('h1');
  const trash = document.querySelector('.trash');
  const p = document.querySelector('#inf');
  const info = document.querySelector('.info');
  const submitButton = document.querySelector('.btn-submit');
  const addButton = document.querySelector('.add-chat');
  const regenerateButton = document.querySelector('.response');
  const languageButton = document.querySelector('.theme-toggle');
  languageButton.insertAdjacentHTML('afterbegin', `<img src=${enImage} alt="en">`);

  // dark - light mode knopka
  const toggle = document.querySelector('.theme');
  toggle.name = 'themeDark';
  toggle.addEventListener('click', (event) => {
    const elementSection = document.querySelector('.main').querySelectorAll('*');
    const myEvent = event;
    if (myEvent.target.classList.contains('dark-mode')) {
      body.classList.remove('body-black');
      body.classList.add('body-white');
      myEvent.target.classList.remove('dark-mode');
      myEvent.target.classList.add('light-mode');
      myEvent.target.name = 'themeDark';
      myEvent.target.textContent = i18nextInstance.t('themeDark');
      elementSection.forEach((element) => {
        const copyElement = element;
        copyElement.style.color = 'black';
      });
    } else {
      myEvent.target.classList.remove('light-mode');
      myEvent.target.classList.add('dark-mode');
      body.classList.remove('body-white');
      body.classList.add('body-black');
      myEvent.target.name = 'themeLight';
      myEvent.target.textContent = i18nextInstance.t('themeLight');
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
    changeLang(state.lang);
    addButton.textContent = i18nextInstance.t('addChat');
    regenerateButton.textContent = i18nextInstance.t('reset');
    toggle.textContent = i18nextInstance.t(toggle.name);
    info.textContent = i18nextInstance.t('info');
    p.textContent = i18nextInstance.t('inf');
    title.textContent = i18nextInstance.t('title');
    trash.textContent = i18nextInstance.t('trash');
  });
  // -----------------------------------------------------

  submitButton.addEventListener('click', () => {
  // eslint-disable-next-line no-alert
    alert('я отправляю запрос');
  });
  addButton.addEventListener('click', () => {
    const div = document.querySelector('.chat-list');
    const ol = document.createElement('ol');
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = i18nextInstance.t('addChat');
    ol.classList.add('btn', 'no-marker');
    li.classList.add('list-item');
    li.appendChild(a);
    ol.appendChild(li);
    div.appendChild(ol);
  });
  regenerateButton.addEventListener('click', () => {
  // eslint-disable-next-line no-alert
    alert('Переделываю запрос');
  });
};
export default app;
