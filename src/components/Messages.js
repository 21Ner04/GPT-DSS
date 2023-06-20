export default class Messages {
  constructor() {
    this.messages = [{ role: 'system', content: 'You-user' }];
  }

  add(role, content) {
    this.messages.push({ role, content });
  }

  getItems() {
    return this.messages;
  }

  removeLast() {
    this.messages.pop();
  }

  removeFirst() {
    this.messages.shift();
  }

  reset() {
    this.messages = [];
  }
}
