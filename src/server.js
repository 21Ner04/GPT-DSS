/* eslint-disable no-console */
const tester = () => {
  const response = 0;
  return response + 1;
};
export default tester;

const API_KEY = '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';

async function getMessage() {
  console.log('clicked');
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: '2+2=?!' }],
      max_tokens: 100,
    }),

  };
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

console.log(getMessage());
