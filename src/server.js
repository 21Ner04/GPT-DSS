// eslint-disable-next-line import/no-unresolved
import { marked } from 'marked';

// Импортируем библиотеку axios для работы с HTTP-запросами
import axios from 'axios';
// Функция tester, которая возвращает 1 больше нуля
const tester = () => {
  const response = 0;
  return response + 1;
};

// eslint-disable-next-line consistent-return
// Функция sendMessage для отправки сообщения через API OpenAI
// eslint-disable-next-line consistent-return
async function sendMessage(messages) {
  // API-ключ для доступа к API OpenAI
  const API_KEY = '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';

  // Объект с данными для отправки запроса
  const data = {
    model: 'gpt-3.5-turbo',
    messages: messages.getItems(),
    max_tokens: 2000,
    temperature: 0.5,
  };

  // Объект с настройками для отправки запроса
  const config = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    // Отправляем POST-запрос на API OpenAI и получаем ответ
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, config);
    // Извлекаем текст ответа из данных ответа
    const responseData = response.data.choices[0];

    return marked.parse(responseData.message.content);
    // Если произошла ошибка, выводим ее в консоль
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}
// Экспортируем функции sendMessage и tester
export { sendMessage, tester };
