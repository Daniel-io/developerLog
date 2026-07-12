import '../css/main.css'
import { postRows } from './api/postRow.js';
console.log(process.env.ENV);



const flashCardEditor = document.querySelector('#flashcardEditor');
flashCardEditor.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(flashCardEditor);

  const payload = {
    values: {
      question: formData.get('question'),
      answer: formData.get('answer'),
      tag: [
        { name: 'general', type: 'option' },
        { name: 'objects', type: 'option' }
      ]
    }
  };

  postRows(payload);

});

console.log(flashCardEditor);

