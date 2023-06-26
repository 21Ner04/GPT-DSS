import _ from 'lodash';

import onChange from 'on-change';

import finderMessage from './utils/utils.js';

import { sendMessage } from './server.js';

const initWatchers = (initState) => {
  const formHandler = async () => {
    const { state } = initState.form;
    const output = document.querySelector('#output');
    const assistantMessage = output.lastChild;
    const activeChat = document.querySelector('.active-chat');
    const { id } = activeChat;
    const messages = finderMessage(id, initState);
    const send = await sendMessage(messages);
    const cloneMessage = _.cloneDeep(messages);
    const messageForHTML = cloneMessage.parseToHTML();
    switch (state) {
      case 'ready':
        break;
      case 'processing':
        messages.add('assistant', send);
        assistantMessage.textContent = send;
        break;
      case 'rendering':
        messageForHTML.forEach((message) => {
          output.appendChild(message.el);
        });
        break;
      case 'resetting':
        if (messages === undefined) {
          return;
        }
        messages.removeLast();
        messages.add('assistant', send);
        assistantMessage.textContent = send;
        break;
      default:
        throw new Error('Unknown state');
    }
  };
  const watchedState = onChange(initState, (path) => {
    switch (path) {
      case 'form.state':
        formHandler();
        initState.form.state = 'ready';
        break;
      default:
        break;
    }
  });
  return watchedState;
};
export default initWatchers;
