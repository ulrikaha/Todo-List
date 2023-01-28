
//Url to rest API                                 //query to limit todos to 7
const API_URL = "https://jsonplaceholder.typicode.com/todos?page=3&_limit=7";
const BASE_URL = "https://jsonplaceholder.typicode.com/todos";


//Get ref to elements 
const form = document.querySelector('#form')
const output = document.querySelector('#output');
const btnAdd = document.querySelector('#add');



//Empty array for todos
let listArray = [];



const getTodos = async () => {
  const res = await fetch(API_URL)
  const todos = await res.json()

  console.log(todos)


  //Loop tru todo
  todos.forEach(todo => {

    //Add a new element to output
    output.appendChild(createElement(todo))
  })


}

getTodos()


//Create a card with info from todo /database

const createElement = (todo) => {
  console.log(todo)
  const card = document.createElement('div')
  card.className = 'item'
  card.id = todo.id

  const title = document.createElement('p')
  title.innerText = todo.title


  const btnDone = document.createElement('button')
  btnDone.innerText = 'Done'

  if (todo.completed) {
    title.classList.add('line-over')
    btnDone.classList.add('completed')
  }


  btnDone.addEventListener('click', () => {
    title.classList.toggle('line-over')
    btnDone.classList.toggle('completed')
  })

  const btnUndo = document.createElement('button')
  btnUndo.innerText = 'Undo'

  btnUndo.addEventListener('click', () => {
    title.classList.remove('line-over')
    btnDone.classList.remove('completed') 
  })



  const btnDelete = document.createElement('button')
  btnDelete.innerText = 'Delete'

  
  btnDelete.addEventListener('click', () => { 

   if (btnDone.classList.contains('completed')) {                     
      btnDelete.parentElement.remove()
      
      
      fetch(BASE_URL + "/" + btnDelete.parentElement.id, {
        method: 'DELETE'
      })
        .then(res => {
          console.log(res)
        })



    } else {
      alert('Error modal goes here')
    }
  })




  card.appendChild(title)
  card.appendChild(btnDone)
  card.appendChild(btnUndo)
  card.appendChild(btnDelete)

  return card

}

//Add Eventlistner to form /Prevent form to load,
form.addEventListener('submit', e => {
  e.preventDefault()


  //Add a new todo
  const newTodo = {
    title: document.querySelector("#text").value,
    completed: false
  }


  // Send a post to url
  fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res) => res.json())
    .then((todo) => {


      //Create a new todo element to the list
      const card = createElement(todo)
      document.querySelector('#output').appendChild(card)

      console.log(todo)
    })
})


//Validation if the form is empty and not to submit a empty todo + alert message
function empty() {
  const input = document.querySelector('#text').value
  if (input.trim() == '') {
    alert("Todo can not be empty");
    return false;

  }
}




















