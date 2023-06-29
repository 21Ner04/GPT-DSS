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
    elements: {
      bottomSection: document.querySelector('.bottom-section'),
      sectionMain: document.querySelector('.main'),
      divMain: document.querySelector('.main > div'),
      output: document.querySelector('#output'),
      input: document.querySelector('textarea'),
      title: document.querySelector('h1'),
      trash: document.querySelector('.trash'),
      list: document.querySelector('.chat-list'),
      pInf: document.querySelector('#inf'),
      info: document.querySelector('.info'),
      submitButton: document.querySelector('.btn-submit'),
      addButton: document.querySelector('.add-chat'),
      regenerateButton: document.querySelector('.response'),
      languageButton: document.querySelector('.theme-toggle'),
      form: document.querySelector('form'),
      toggle: document.querySelector('.theme'),
      language: document.querySelector('.theme-toggle'),
    }
  };
  const watcherState = initWatchers(state);

  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: state.lang,
    resources,
  });

  state.elements.languageButton.insertAdjacentHTML('afterbegin', `<img src=${enImage} alt="en">`);

  // eslint-disable-next-line no-shadow
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

  const submitForm = (value) => {
    if (state.elements.list.children.length === 0) {
      renderChats(state.elements.list, value);
    }
    state.elements.regenerateButton.removeAttribute('hidden');
    const div = document.createElement('div');
    const p = document.createElement('p');
    const activeChat = document.querySelector('.active-chat');
    const activeElement = activeChat.querySelector('li > a');
    if (activeElement.textContent === 'New Chat' || activeElement.textContent === 'Новый чат') {
      const myValue = value.trim().length >= 22 ? `${value.trim().slice(0, 22)}...` : value.trim();
      activeElement.textContent = myValue.trim();
    }
    const { id } = activeChat;
    // eslint-disable-next-line max-len
    const messages = finderMessage(id, watcherState) === undefined ? new Messages() : finderMessage(id, watcherState);
    if (messages.id === 'none') {
      messages.generateId(id);
      watcherState.history.push(messages);
    }
    messages.add('user', value);
    p.classList.add('assistant-message');
    div.textContent = value;
    div.classList.add('user-message');
    state.elements.output.appendChild(div);
    state.elements.output.appendChild(p);
    state.elements.title.remove();
    state.elements.form.reset();
    state.elements.input.focus();
    watcherState.form.state = 'processing';
  };

  const changeLang = async (lang) => {
    await i18nextInstance.changeLanguage(lang);
  };

  // dark - light mode knopka
  state.elements.toggle.addEventListener('click', (event) => {
    const elementSection = state.elements.bottomSection.querySelectorAll('*');
    const myEvent = event;
    if (myEvent.target.classList.contains('dark-mode')) {
      state.elements.sectionMain.classList.remove('main-black');
      state.elements.sectionMain.classList.add('main-white');
      myEvent.target.classList.remove('dark-mode');
      myEvent.target.classList.add('light-mode');
      myEvent.target.name = 'themeDark';
      myEvent.target.textContent = i18nextInstance.t('themeDark');
      elementSection.forEach((element) => {
        const copyElement = element;
        state.elements.info.style.color = 'black';
        state.elements.title.style.color = 'black';
        copyElement.style.color = 'black';
      });
    } else {
      myEvent.target.classList.remove('light-mode');
      myEvent.target.classList.add('dark-mode');
      state.elements.sectionMain.classList.remove('main-white');
      state.elements.sectionMain.classList.add('main-black');
      myEvent.target.name = 'themeLight';
      myEvent.target.textContent = i18nextInstance.t('themeLight');
      elementSection.forEach((element) => {
        const copyElement = element;
        state.elements.info.style.color = 'rgba( 255, 255, 255, 0.5)'
        state.elements.title.style.color = 'white';
        copyElement.style.color = 'white';
        state.elements.submitButton.style.color = '';
      });
    }
  });
  // ----------------------------------------------------------------------------------------------

  // re - e flag knopka
  state.elements.language.addEventListener('click', (event) => {
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
    state.elements.addButton.textContent = i18nextInstance.t('addChat');
    state.elements.regenerateButton.textContent = i18nextInstance.t('reset');
    state.elements.toggle.textContent = i18nextInstance.t(state.elements.toggle.name);
    state.elements.info.textContent = i18nextInstance.t('info');
    state.elements.pInf.textContent = i18nextInstance.t('inf');
    state.elements.title.textContent = i18nextInstance.t('title');
    state.elements.trash.textContent = i18nextInstance.t('trash');
    state.elements.input.placeholder = i18nextInstance.t('placeholder');
  });
  // ---------------------------------------------------------------
  state.elements.trash.addEventListener('click', () => {
    state.elements.list.innerHTML = '';
    state.history = [];
  });

  // ---------------------------------------------------------------

  state.elements.addButton.addEventListener('click', () => {
    state.elements.output.innerHTML = '';
    state.elements.regenerateButton.setAttribute('hidden', '');
    state.elements.divMain.prepend(state.elements.title);
    const olAll = document.querySelectorAll('ol');
    olAll.forEach((ol) => {
      ol.classList.remove('active-chat');
    });
    renderChats(state.elements.list);
  });

  // ---------------------------------------------------------------

  state.elements.regenerateButton.addEventListener('click', async (event) => {
    event.preventDefault();
    state.elements.output.lastChild.textContent = '';
    watcherState.form.state = 'resetting';
  });
  // ---------------------------------------------------------------

  state.elements.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const object = Object.fromEntries(formData);
    submitForm(object.input);
  });

  // ---------------------------------------------------------------

  state.elements.input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      state.elements.submitButton.classList.remove('active');
      state.elements.submitButton.setAttribute('disabled', '');
      submitForm(event.target.value);
    }
  });

  state.elements.input.addEventListener('input', (event) => {
    event.preventDefault();
    if (event.target.value.length === 0) {
      state.elements.submitButton.classList.remove('active');
      state.elements.submitButton.setAttribute('disabled', '');
      return;
    }
    state.elements.submitButton.classList.add('active');
    state.elements.submitButton.removeAttribute('disabled');
  });
  // ---------------------------------------------------------------
  state.elements.list.addEventListener('click', (event) => {
    const olAllElements = document.querySelectorAll('ol');
    const olElement = event.target.closest('ol');
    if (event.target.classList.contains('active-chat') || olElement === null) {
      return;
    }
    state.elements.output.innerHTML = '';
    olAllElements.forEach((olEl) => {
      olEl.classList.remove('active-chat');
    });
    const findId = olElement.id;
    olElement.classList.add('active-chat');
    if (finderMessage(findId, watcherState) === undefined) {
      state.elements.regenerateButton.setAttribute('hidden', '');
      state.elements.divMain.prepend(state.elements.title);
      return;
    }
    watcherState.form.state = 'rendering';
    state.elements.regenerateButton.removeAttribute('hidden');
    state.elements.title.remove();
  });
  state.elements.form.reset();
  state.elements.input.focus();
};
export default app;
