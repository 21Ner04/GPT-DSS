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
  parseToHTML(){
    const items = this.getItems();
    items.map((item) =>{
      const div = document.createElement('div');
      const p = document.createElement('p');
      div.classList.add('user-message');
      p.classList.add('assistant-message');
        if(item.role === 'user'){
          div.textContent = item.content
          item.el = div;
        }
        else if(item.role === 'assistant'){
          p.textContent = item.content;
          item.el = p;
        }
    })
    return items;
  }
}
