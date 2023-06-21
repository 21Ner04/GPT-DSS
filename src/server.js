// Импортируем библиотеку для работы с HTTP-запросами (например, axios
import axios from 'axios';

const API_KEY = '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';

const tester = () => {
  const response = 0;
  return response + 1;
};

async function sendMessage(messages) {
  const data = {
    model: 'gpt-3.5-turbo',
    messages: messages.getItems(),
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
    return responseData.message.content;
  } catch (error) {
    console.error(error);
  }
}

export { sendMessage, tester };
