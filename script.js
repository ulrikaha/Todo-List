//Url to rest API      //query to limit todos to 7
const API_URL = "https://jsonplaceholder.typicode.com/todos?page=3&_limit=7";
const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

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

  //Loop through todos
  todos.forEach(todo => {
    arrayTodos.push(todo)


    listTodos()
  
  //Add a new element to output
    //output.appendChild(createElement(todo))
  })

 //console.log(arrayTodos)

}

getTodos()



const listTodos = () => {
  output.innerHTML = '';
  arrayTodos.forEach(todo => {

      const todoElement = createTodoElement(todo)
      output.appendChild(todoElement)
  })
}




//Create a card with info from todo /database
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


      // Fetch Delete 
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


  //Validation if the form is empty and not to submit a empty todo + alert message
  if (inputValue == '') {
    alert('Your input can not be empty')
    return false

  } else {
    //Add a new todo
    const newTodo = {
      title: inputValue,
      completed: false
    }

    // Send a post to url
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

        //Create a new todo element to the list
        const todoElement = createTodoElement(todo)
        output.appendChild(todoElement)
      
      });

    //Clear the form after input    
    form.reset()
  }
});


