let tasks = [];


let imgDone, imgEdit, imgTrash;

let form = document.querySelector('form')
const input = document.querySelector('#input')
const btnAdd = document.querySelector('#btnAdd')
const output = document.querySelector('#output')

imgDone = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
</svg>
`
imgEdit = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
`
imgTrash = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
`

const AddTodo = () => {
    if (input.value == '') {
        alert('Добавьте задачу')
    } else {
        const todo = {
            id: tasks.length + 1,
            completed: false,
            name: input.value,
        }

        tasks.push(todo)
        input.value = '';
        renderTodos()
        addToLocalStorage()
    }

}

const renderTodos = () => {
    output.innerHTML = '';
    tasks.forEach((element) => {

        const card = document.createElement('div');
        const title = document.createElement('h3');
        const btns = document.createElement('div');
        const done = document.createElement('button')
        const edit = document.createElement('button')
        const trash = document.createElement('button')

        if (element.completed == true) {
            card.classList.add('card-active')
        } else {
            card.classList.add('card')
        }

        title.innerHTML = element.name,
            done.innerHTML = imgDone,
            edit.innerHTML = imgEdit,
            trash.innerHTML = imgTrash,

            done.addEventListener('click', () => {

                element.completed = true;
                renderTodos()

            })

        edit.addEventListener('click', () => {
            let a = prompt("Введите новую задачу")
            element.name = a
            renderTodos()


        })

        trash.addEventListener('click', () => {

            tasks = tasks.filter((item) => item.id != element.id)


        })

        btns.append(done, edit, trash)
        card.append(title, btns)
        output.append(card);

    })

}

function name(params) {

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    AddTodo()

})


const addToLocalStorage = () => {

    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTodos()

}


const getFromLocalStorage = () => {

    const data = localStorage.getItem('tasks');
    if (data) {
        tasks = JSON.parse(data);
        renderTodos()
    }

}
getFromLocalStorage();