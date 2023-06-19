/* eslint-disable no-console */
/* eslint-disable no-shadow */
// Импортируем библиотеку для работы с HTTP-запросами (например, axios
import axios from 'axios';

// Переменная для хранения истории сообщений

const tester = () => {
  const response = 0;
  return response + 1;
};
export default tester;

let messages = [{
  role: 'system',
  content: 'You-user',
}];

const API_KEY = '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';

// eslint-disable-next-line no-unused-vars
const update = (messages, role, content) => {
  messages.push({ role, content });
};

// eslint-disable-next-line no-unused-vars
const resetMessages = () => {
  messages = [];
  messages.push({
    role: 'system',
    content: 'You-user',
  });
};

async function sendMessage(message) {
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: 'You-user' }, { role: 'user', content: message }],
    max_tokens: 4000,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, config);
    const responseData = response.data.choices[0];
    console.log(responseData);
  } catch (error) {
    console.error(error);
  }
}
sendMessage('Сколько будет 2+4?');
