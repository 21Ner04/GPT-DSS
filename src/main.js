const state = 
{

}
const submitButton = document.querySelector('.submit');
const addButton = document.querySelector('.add-chat');
const regenerateButton = document.querySelector('.response');
submitButton.addEventListener('click', (event) =>{
    alert('я отправляю запрос')
    console.log(event.target)
})
addButton.addEventListener('click', (event) =>{
    alert('Я добавляю чат')
    console.log(event.target)
})
regenerateButton.addEventListener('click', (event) =>{
    alert('Переделываю запрос')
    console.log(event.target);
})
