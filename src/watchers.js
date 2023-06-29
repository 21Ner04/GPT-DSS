import _ from 'lodash';

import onChange from 'on-change';

import finderMessage from './utils/utils.js';

import { sendMessage } from './server.js';

const initWatchers = (initState) => {
  const formHandler = async () => {
    const { state } = initState.form;
    const assistantMessage = initState.elements.output.lastChild;
    const activeChat = document.querySelector('.active-chat');
    const { id } = activeChat;
    const messages = finderMessage(id, initState);

    let index = 0;
    const type = () => {
      const text = messages.getLast().content;
      if (index < text.length) {
        assistantMessage.innerHTML = `${text.slice(0, index)}<span class="blinking-cursor">|</span>`;
        // eslint-disable-next-line no-plusplus
        index++;
        setTimeout(type, 50);
      } else if (index === text.length) {
        assistantMessage.removeChild(assistantMessage.lastChild);
      } else {
        assistantMessage.innerHTML = `${text.slice(0, index)}<span class="blinking-cursor">|</span>`;
      }
    };

    switch (state) {
      case 'ready':
        break;
      case 'processing':
        // eslint-disable-next-line no-case-declarations
        const send = await sendMessage(messages);
        messages.add('assistant', send);
        type();
        break;
      case 'rendering':
        // eslint-disable-next-line no-case-declarations
        const cloneMessage = _.cloneDeep(messages);
        // eslint-disable-next-line no-case-declarations
        const messageForHTML = cloneMessage.parseToHTML();
        messageForHTML.forEach((message) => {
          initState.elements.output.appendChild(message.el);
        });
        break;
      case 'resetting':
        // eslint-disable-next-line no-case-declarations
        const send2 = await sendMessage(messages);
        messages.removeLast();
        messages.add('assistant', send2);
        type();
        break;
      default:
        throw new Error('Unknown state');
    }
  };
  const watchedState = onChange(initState, (path) => {
    switch (path) {
      case 'form.state':
        formHandler();
        // eslint-disable-next-line no-param-reassign
        initState.form.state = 'ready';
        break;
      default:
        break;
    }
  });
  return watchedState;
};
export default initWatchers;
