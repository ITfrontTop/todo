const input = document.querySelector('[data-text-field]');
const addTodoBtn = document.querySelector('[data-add-todo-btn]');
const container = document.querySelector('[data-todo-container]');

const todoList = JSON.parse(localStorage.getItem('todos')) || [];

const saveToLocalStorage = (key = 'todos') => {
  localStorage.setItem('todos', JSON.stringify(todoList));
};

const addTodoItem = () => {
  if (input.value.trim()) {
    // added in todoList
    todoList.push(input.value);
    input.value = '';

    saveToLocalStorage();
    render();
  }
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
    const messageEnterText = document.createElement('h3');
    messageEnterText.classList.add('content__message');
    messageEnterText.textContent = 'Enter your tasks!';

    container.append(messageEnterText);
  }

  todoList.forEach((todo, index) => {
    // added container item
    const todoWrapper = document.createElement('div');
    todoWrapper.classList.add('content__item');

    // create todo text
    const todoText = document.createElement('p');
    todoText.classList.add('content__text');
    todoText.textContent = todo;

    // create buttons
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button__wrapper');
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('button__edit');
    buttonEdit.innerHTML = `
      <svg class="button__icon">
        <use href="src/assets/icons/sprites.svg#edit-icon"></use>
      </svg>
    `;
    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('button__delete');
    buttonDelete.innerHTML = `
      <svg class="button__icon">
        <use href="src/assets/icons/sprites.svg#delete-icon"></use>
      </svg>
    `;

    buttonDelete.addEventListener('click', (index) => removeTodo(index));

    container.append(todoWrapper);
    todoWrapper.append(todoText);

    // added buttons
    todoWrapper.append(buttonWrapper);
    buttonWrapper.append(buttonEdit);
    buttonWrapper.append(buttonDelete);
  });
};

render();
