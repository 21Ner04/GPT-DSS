export default class Messages {
  constructor() {
    this.messages = [];
    this.id = 'none';
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

  generateId(id) {
    this.id = id;
  }
}
