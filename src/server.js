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
      messages: [{ role: 'user', content: 'как сделать sidebar чтобы его можно было скрыить и открыть. Напиши html js css' }],
      max_tokens: 100,
    }),

  };
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json();
    console.log(data.choices[0]);
  } catch (error) {
    console.error(error);
  }
}

console.log(getMessage());
