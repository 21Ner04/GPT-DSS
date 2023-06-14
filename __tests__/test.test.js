import runPrompt from '../src/server.js';

// eslint-disable-next-line no-undef
test('test', () => {
  // eslint-disable-next-line no-undef
  expect('to').toEqual('to');
  // eslint-disable-next-line no-undef
  expect(runPrompt().length).toBe(undefined);
});
