const finderMessage = (id, initalState) => {
  const result = initalState.history.find((message) => message.id === id);
  return result;
};
export default finderMessage;
