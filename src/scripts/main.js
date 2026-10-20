// const input = document.querySelector('[data-text-field]');
// const addTodoBtn = document.querySelector('[data-add-todo-btn]');
// const container = document.querySelector('[data-todo-container]');

// const todoList = JSON.parse(localStorage.getItem('todos')) || [];

// const saveToLocalStorage = (key = 'todos') => {
//   localStorage.setItem(key, JSON.stringify(todoList));
// };

// const addTodoItem = () => {
//   if (input.value.trim()) {
//     // added in todoList
//     todoList.push(input.value);
//     input.value = '';

//     saveToLocalStorage();
//     render();
//   }
// };

// addTodoBtn.addEventListener('click', addTodoItem);
// input.addEventListener('keydown', (e) => {
//   if (e.key === 'Enter') {
//     addTodoItem();
//   }
// });

// const removeTodo = (index) => {
//   todoList.splice(index, 1);
//   saveToLocalStorage();
//   render();
// };

// const render = () => {
//   container.innerHTML = '';

//   if (todoList.length === 0) {
//     const messageEnterText = document.createElement('h3');
//     messageEnterText.classList.add('content__message');
//     messageEnterText.textContent = 'Enter your tasks!';

//     container.append(messageEnterText);
//   }

//   todoList.forEach((todo, index) => {
//     // added container item
//     const todoWrapper = document.createElement('div');
//     todoWrapper.classList.add('content__item');

//     // added checkbox
//     const todoCheckbox = document.querySelector('input');

//     // create todo text
//     const todoText = document.createElement('p');
//     todoText.classList.add('content__text');
//     todoText.textContent = todo;

//     // create buttons
//     const buttonWrapper = document.createElement('div');
//     buttonWrapper.classList.add('button__wrapper');
//     const buttonEdit = document.createElement('button');
//     buttonEdit.classList.add('button__edit');
//     buttonEdit.innerHTML = `
//       <svg class="button__icon">
//         <use href="src/assets/icons/sprites.svg#edit-icon"></use>
//       </svg>
//     `;
//     const buttonDelete = document.createElement('button');
//     buttonDelete.classList.add('button__delete');
//     buttonDelete.innerHTML = `
//       <svg class="button__icon">
//         <use href="src/assets/icons/sprites.svg#delete-icon"></use>
//       </svg>
//     `;

//     buttonDelete.addEventListener('click', () => removeTodo(index));

//     container.append(todoWrapper);
//     todoWrapper.append(todoText);

//     // added buttons
//     todoWrapper.append(buttonWrapper);
//     buttonWrapper.append(buttonEdit);
//     buttonWrapper.append(buttonDelete);
//   });
// };

// render();

const input = document.querySelector('[data-text-field]');
const addTodoBtn = document.querySelector('[data-add-todo-btn]');
const container = document.querySelector('[data-todo-container]');
const countTodo = document.querySelector('[data-count-todo]');

const todoList = JSON.parse(localStorage.getItem('todos')) || [];

const generateID = () => new Date().getTime();

const createElementTodo = (element, elementClass) => {
  const item = document.createElement(element);
  item.classList.add(elementClass);

  return item;
};

const saveToLocalStorage = (key = 'todos') => {
  localStorage.setItem(key, JSON.stringify(todoList));
};

const counterTodo = () => {
  const countNumber = todoList.reduce((acc, item) => {
    if (!item.completed) acc += 1;

    return acc;
  }, 0);

  countNumber > 0
    ? (countTodo.textContent = `${countNumber} tasks left`)
    : (countTodo.textContent = 'no tasks left');
};

const addTodoItem = () => {
  if (input.value.trim()) {
    // added in todoList
    todoList.push({
      id: generateID(),
      text: input.value,
      completed: false
    });

    input.value = '';

    console.log(todoList);

    saveToLocalStorage();
    render();
  }
};

const completedTodo = (todoCheckbox, todoText, todo) => {
  if (todoCheckbox.checked) {
    todoText.classList.add('completed');
    todo.completed = true;
  } else {
    todoText.classList.remove('completed');
    todo.completed = false;
  }

  saveToLocalStorage();
  render();
};

addTodoBtn.addEventListener('click', addTodoItem);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTodoItem();
  }
});

const removeTodo = (index) => {
  todoList.splice(index, 1);
  saveToLocalStorage();
  render();
};

const render = () => {
  container.innerHTML = '';

  if (todoList.length === 0) {
    const messageEnterText = createElementTodo('h3', 'content__message');
    messageEnterText.textContent = 'Enter your tasks!';

    container.append(messageEnterText);
  }

  todoList.forEach((todo, index) => {
    // added container item
    const todoWrapper = createElementTodo('div', 'content__item');

    // added checkbox
    const todoCheckbox = createElementTodo('input', 'content__checkbox');
    todoCheckbox.type = 'checkbox';
    todoCheckbox.checked = todo.completed;

    // create todo text
    const todoText = createElementTodo('p', 'content__text');
    // added class completed
    todo.completed
      ? todoText.classList.add('completed')
      : todoText.classList.remove('completed');
    // add text task
    todoText.textContent = todo.text;

    // create buttons
    const buttonWrapper = createElementTodo('div', 'button__wrapper');
    const buttonEdit = createElementTodo('button', 'button__edit');

    buttonEdit.innerHTML = `
      <svg class="button__icon">
        <use href="src/assets/icons/sprites.svg#edit-icon"></use>
      </svg>
    `;

    // disable edit btn
    if (todo.completed) {
      buttonEdit.disabled = true;
    } else {
      buttonEdit.disabled = false;
    }

    const buttonDelete = createElementTodo('button', 'button__delete');

    buttonDelete.innerHTML = `
      <svg class="button__icon">
        <use href="src/assets/icons/sprites.svg#delete-icon"></use>
      </svg>
    `;

    buttonDelete.addEventListener('click', () => removeTodo(index));

    todoCheckbox.addEventListener('click', () =>
      completedTodo(todoCheckbox, todoText, todo)
    );

    // added count

    container.append(todoWrapper);
    todoWrapper.append(todoCheckbox);
    todoWrapper.append(todoText);

    // added buttons
    todoWrapper.append(buttonWrapper);
    buttonWrapper.append(buttonEdit);
    buttonWrapper.append(buttonDelete);
  });

  counterTodo();
};

render();
