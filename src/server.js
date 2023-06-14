import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(config);

const runPrompt = async () => {
  const prompt = 'Tell me a joke about a cat eating pasta';

  const response = await openai.createCompletion({
    model: 'gpt 3.5 turbo',
    prompt,
    max_tokens: 2048,
    temperature: 1,
  });

  const parsableJSONresponse = response.data.choices[0].text;
  return parsableJSONresponse;
};
export default runPrompt;
