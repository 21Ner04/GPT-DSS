import i18next from 'i18next';
import _ from 'lodash';
import finderMessage from './utils/utils.js';

import initWatchers from './watchers.js';

import Messages from './components/Messages.js';

import resources from './locales/index.js';

import enImage from '../assets/images/favicon-e-32x32.png';

import ruImage from '../assets/images/favicon-ru-32x32.png';

const app = async () => {
  const state = {
    lang: 'en',
    history: [],
    activeMessage: '',
    form: {
      state: 'ready',
    },
  };
  const watcherState = initWatchers(state);

  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: state.lang,
    resources,
  });
  // eslint-disable-next-line max-len
  //-------------------------------------------------------------------------------------------------
  const sectionMain = document.querySelector('.main');
  const divMain = sectionMain.querySelector('.main');
  const output = document.querySelector('#output');
  const input = document.querySelector('textarea');
  const title = document.querySelector('h1');
  const trash = document.querySelector('.trash');
  const list = document.querySelector('.chat-list');
  const pInf = document.querySelector('#inf');
  const info = document.querySelector('.info');
  const submitButton = document.querySelector('.btn-submit');
  const addButton = document.querySelector('.add-chat');
  const regenerateButton = document.querySelector('.response');
  const languageButton = document.querySelector('.theme-toggle');
  const form = document.querySelector('form');
  const toggle = document.querySelector('.theme');
  const language = document.querySelector('.theme-toggle');

  languageButton.insertAdjacentHTML('afterbegin', `<img src=${enImage} alt="en">`);

  const renderChats = (list, name = '') => {
    const ol = document.createElement('ol');
    const li = document.createElement('li');
    const a = document.createElement('a');
    const id = _.uniqueId();
    const myName = name.trim().length >= 22 && name !== null ? `${name.trim().slice(0, 22)}...` : name;
    a.textContent = name === '' ? i18nextInstance.t('addChat') : myName;
    ol.classList.add('btn', 'no-marker', 'active-chat');
    ol.id = id;
    li.classList.add('list-item');
    li.appendChild(a);
    ol.appendChild(li);
    list.prepend(ol);
  };
    // eslint-disable-next-line max-len
    // ----------------------------------------------------------------------------------------------
  const submitForm = (value) => {
    if (list.children.length === 0) {
      renderChats(list, value);
    }
    regenerateButton.removeAttribute('hidden')
    const div = document.createElement('div');
    const p = document.createElement('p');
    const activeChat = document.querySelector('.active-chat');
    const activeElement = activeChat.querySelector('li > a');
    if (activeElement.textContent === 'New Chat' || activeElement.textContent === 'Новый чат') {
      const myValue = value.trim().length >= 22 ? `${value.trim().slice(0, 22)}...` : value.trim();
      activeElement.textContent = myValue.trim();
    }
    const { id } = activeChat;
    const messages = finderMessage(id, watcherState) === undefined ? new Messages() : finderMessage(id, watcherState);
    if (messages.id === 'none') {
      messages.generateId(id);
      watcherState.history.push(messages);
    }
    messages.add('user', value);
    p.classList.add('assistant-message');
    div.textContent = value;
    div.classList.add('user-message');
    output.appendChild(div);
    output.appendChild(p);
    title.remove();
    form.reset();
    input.focus();
    watcherState.form.state = 'processing';
  };

  const changeLang = async (lang) => {
    await i18nextInstance.changeLanguage(lang);
  };

  // dark - light mode knopka
  toggle.addEventListener('click', (event) => {
    const elementSection = sectionMain.querySelectorAll('*');
    const myEvent = event;
    if (myEvent.target.classList.contains('dark-mode')) {
      sectionMain.classList.remove('main-black');
      sectionMain.classList.add('main-white');
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
      sectionMain.classList.remove('main-white');
      sectionMain.classList.add('main-black');
      myEvent.target.name = 'themeLight';
      myEvent.target.textContent = i18nextInstance.t('themeLight');
      elementSection.forEach((element) => {
        const copyElement = element;
        copyElement.style.color = 'white';
      });
    }
  });
  // ----------------------------------------------------------------------------------------------

  // re - e flag knopka
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
    pInf.textContent = i18nextInstance.t('inf');
    title.textContent = i18nextInstance.t('title');
    trash.textContent = i18nextInstance.t('trash');
  });
  // ---------------------------------------------------------------
  trash.addEventListener('click', () => {
    list.innerHTML = '';
    state.history = [];
  });

  // ---------------------------------------------------------------

  addButton.addEventListener('click', () => {
    output.innerHTML = '';
    regenerateButton.setAttribute('hidden', '');
    divMain.prepend(title);
    const olAll = document.querySelectorAll('ol');
    olAll.forEach((ol) => {
      ol.classList.remove('active-chat');
    });
    renderChats(list);
  });

  // ---------------------------------------------------------------

  regenerateButton.addEventListener('click', async (event) => {
    event.preventDefault();
    output.lastChild.textContent = '';
    watcherState.form.state = 'resetting';
  });
  // ---------------------------------------------------------------

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const object = Object.fromEntries(formData);
    submitForm(object.input);
  });

  // ---------------------------------------------------------------

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitButton.classList.remove('active');
      submitButton.setAttribute('disabled', '');
      submitForm(event.target.value);
    }
  });

  input.addEventListener('input', (event) => {
    event.preventDefault();
    if (event.target.value.length === 0) {
      submitButton.classList.remove('active');
      submitButton.setAttribute('disabled', '');
      return;
    }
    submitButton.classList.add('active');
    submitButton.removeAttribute('disabled');
  });
  // ---------------------------------------------------------------
  list.addEventListener('click', (event) => {
    const olAllElements = document.querySelectorAll('ol');
    const olElement = event.target.closest('ol');
    if (event.target.classList.contains('active-chat') || olElement === null) {
      return;
    }
    output.innerHTML = '';
    olAllElements.forEach((olEl) => {
      olEl.classList.remove('active-chat');
    });
    const findId = olElement.id;
    olElement.classList.add('active-chat');
    if (finderMessage(findId, watcherState) === undefined) {
      regenerateButton.setAttribute('hidden', '');
      divMain.prepend(title);
      return;
    }
    watcherState.form.state = 'rendering';
    regenerateButton.removeAttribute('hidden');
    title.remove();
  });
  form.reset();
  input.focus();
};
export default app;
