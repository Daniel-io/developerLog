import '../css/main.css'
console.log(process.env.ENV);



const flashCardEditor = document.querySelector('#flashcardEditor');
flashCardEditor.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(flashCardEditor);
  console.log(formData.get('question'));
  console.log(formData.get('answer'));

});

console.log(flashCardEditor);

