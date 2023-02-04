//Url to rest API      
const API_URL = "https://jsonplaceholder.typicode.com/todos?page=3&_limit=7";  //query to limit todos to 7
const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

//Array to store data from the api
const arrayTodos = [];

//Get ref to elements 
const form = document.querySelector('#form');
const output = document.querySelector('#output');
const btnAdd = document.querySelector('#add');
const modal = document.getElementById("modal");
const modalBtnX = document.querySelector(".close-button");


//Fetch 
const getTodos = async () => {
  const res = await fetch(API_URL)
  const todos = await res.json()

  //console.log(todos)

  //Loop through todos & push them to the array
  todos.forEach(todo => {
    arrayTodos.push(todo)


    listTodos()

  })

  //console.log(arrayTodos)

}

getTodos()


//Function to list todos and create a todo-element to each todo in the list
const listTodos = () => {
  output.innerHTML = '';
  arrayTodos.forEach(todo => {

    const todoElement = createTodoElement(todo)
    output.appendChild(todoElement)
  })
}


//Function to create all elements for the todos
const createTodoElement = (todo) => {

  const card = document.createElement('div')
  card.className = 'item'
  card.id = todo.id

  const title = document.createElement('p')
  title.innerText = todo.title


  // Button Done
  const btnDone = document.createElement('button')
  btnDone.innerText = 'Done'
  btnDone.className = 'btnStyle'

  if (todo.completed) {
    title.classList.add('line-over')
    btnDone.classList.add('completed')
  }

  btnDone.addEventListener('click', () => {
    title.classList.toggle('line-over')
    btnDone.classList.toggle('completed')
  })


  // Button Undo
  const btnUndo = document.createElement('button')
  btnUndo.innerText = 'Undo'
  btnUndo.className = 'btnStyle'

  btnUndo.addEventListener('click', () => {
    title.classList.remove('line-over')
    btnDone.classList.remove('completed')
  })


  // Button Delete
  const btnDelete = document.createElement('button')
  btnDelete.innerText = 'Delete'
  btnDelete.className = 'btnStyle'

  btnDelete.addEventListener('click', () => {

    if (btnDone.classList.contains('completed')) {
      btnDelete.parentElement.remove()


      // Fetch Delete remove from database and array
      fetch(BASE_URL + "/" + btnDelete.parentElement.id, {
        method: 'DELETE'
      })
        .then(res => {

          if (res.ok) {
            btnDelete.parentElement.remove()

            const index = arrayTodos.findIndex((todo) => todo.id == todo);
            arrayTodos.splice(index, 1);

            console.log(arrayTodos)
          }

        })

      //Show modal with error message
    } else {
      modal.style.display = "block";

    }
  });


  // Modal X-button - close
  modalBtnX.addEventListener("click", () => {
    modal.style.display = "none";
  });


  // Click outside modal - modal close
  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });


  card.appendChild(title)
  card.appendChild(btnDone)
  card.appendChild(btnUndo)
  card.appendChild(btnDelete)

  return card

};


//Add eventlistner to form and submit ,Prevent to load,
form.addEventListener("submit", e => {
  e.preventDefault()

  let inputValue = document.querySelector('input[type="text"]').value


  //Validation if the form is empty, not to submit a empty todo + alert message
  if (inputValue == '') {
    alert('Your input can not be empty! Please type your text and click add')
    return false

  } else {
    //Add a new todo from input
    const newTodo = {
      title: inputValue,
      completed: false
    }


    // Send a post to url and to array
    fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((todo) => {

        arrayTodos.push(todo)


        //Create a new todo element to the list, prepend add it first in the list.
        const todoElement = createTodoElement(todo)
        output.prepend(todoElement)

      });
      

    //Clear the form after input    
    form.reset()
  }
});


