import _ from 'lodash';

import onChange from 'on-change';

import finderMessage from './utils/utils.js';

import { sendMessage } from './server.js';

const initWatchers = (initState) =>{
    const formHandler = async () =>{
        const { state } = initState.form;
        const output = document.querySelector('#output');
        const activeChat = document.querySelector('.active-chat');
        const { id } = activeChat;
        const messages = finderMessage(id, initState);
        const cloneMessage = _.cloneDeep(messages);
        console.log(messages);
        switch(state){
            case 'ready':
                break;
            case 'processing':
                const assistantMessage = output.lastChild;
                const send = await sendMessage(messages);
                messages.add('assistant',send);
                assistantMessage.textContent = send;
                break;
            case 'rendering':
                const messageForHTML = cloneMessage.parseToHTML();
                messageForHTML.forEach((message) => {
                    output.appendChild(message.el);
                  });
                break;
        }
    }
    const watchedState = onChange(initState, (path, current, previous) =>{
        switch(path){
            case 'form.state':
                formHandler();
                initState.form.state = 'ready'
                break;
            default:
              break;
        }
    })
    return watchedState;
}
export default initWatchers;