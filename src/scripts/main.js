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

const saveToLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todoList));
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
    todoList.push({
      id: generateID(),
      text: input.value.trim().replace(/\s+/g, ' '),
      completed: false
    });

    console.log(todoList);
    input.value = '';

    saveToLocalStorage();
    counterTodo();
    render();
  }
};

const completedTodo = (todoCheckbox, todoText, todo) => {
  todoText.classList.toggle('completed');

  todoCheckbox.checked ? (todo.completed = true) : (todo.completed = false);

  saveToLocalStorage();
  counterTodo();
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
  counterTodo();
  render();
};

// category !!!!!!!!!!!!!!!!!!!!!!!!
const categoryListButton = document.querySelectorAll('.count__item');
console.log(categoryListButton);

const btnAll = document.querySelector('[data-category-all]');
const btnActive = document.querySelector('[data-category-active]');
const btnCompleted = document.querySelector('[data-category-completed]');

let stateTodo = 'all';

const removeAddClassActiveArray = (array, item) => {
  array.forEach((el) => {
    el.classList.remove('active');
  });
  item.classList.add('active');
};

btnAll.addEventListener('click', () => {
  removeAddClassActiveArray(categoryListButton, btnAll);
  stateTodo = 'all';
  // filteredTasks(stateTodo);
  // console.log(filteredTasks(stateTodo));
  render();
});

btnActive.addEventListener('click', () => {
  removeAddClassActiveArray(categoryListButton, btnActive);
  stateTodo = 'active';
  // filteredTasks(stateTodo);
  // console.log(filteredTasks(stateTodo));
  render();
});

btnCompleted.addEventListener('click', () => {
  removeAddClassActiveArray(categoryListButton, btnCompleted);
  stateTodo = 'completed';
  // filteredTasks(stateTodo);
  // console.log(filteredTasks(stateTodo));
  render();
});

const filteredTasks = (state) => {
  return todoList.filter((el) => {
    switch (state) {
      case 'all':
        return el;
      case 'active':
        return el.completed === false;
      case 'completed':
        return el.completed === true;
    }
  });
};

// !!!!!!!!!!!!!!!!!!!
const render = () => {
  container.innerHTML = '';

  // if (todoList.length === 0) {
  //   const messageEnterText = createElementTodo('h3', 'content__message');
  //   messageEnterText.textContent = 'Enter your tasks!';

  //   container.append(messageEnterText);
  // }

  // added tasks state
  const renderTasks = filteredTasks(stateTodo);

  if (renderTasks.length === 0) {
    const messageEnterText = createElementTodo('h3', 'content__message');

    switch (stateTodo) {
      case 'all':
        messageEnterText.textContent = 'Enter your tasks!';
        break;
      case 'active':
        messageEnterText.textContent = 'No active tasks!';
        break;
      case 'completed':
        messageEnterText.textContent = 'No completed tasks! Do something!';
    }

    // messageEnterText.textContent = 'Enter your tasks!';

    container.append(messageEnterText);
  }

  renderTasks.forEach((todo, index) => {
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

    // edit todo
    buttonEdit.addEventListener('click', () => {
      todoText.style.display = 'none';
      todoCheckbox.style.display = 'none';
      buttonEdit.style.display = 'none';

      const todoInputTextEdit = createElementTodo('input', 'content__text');
      todoInputTextEdit.type = 'text';

      const buttonSaveEdit = createElementTodo('button', 'button__save-edit');
      buttonSaveEdit.textContent = 'Save';

      // save
      buttonSaveEdit.addEventListener('click', () => {
        if (todoInputTextEdit.value.trim()) {
          todoText.style.display = 'flex';
          todoCheckbox.style.display = 'flex';
          buttonEdit.style.display = 'flex';

          todo.text = todoInputTextEdit.value.trim().replace(/\s+/g, ' ');
        } else {
          alert('You cannot save empty text! Please, write your tasks');
          todo.text = todo.text.trim().replace(/\s+/g, ' ');
        }

        render();
        saveToLocalStorage();
      });

      todoWrapper.prepend(todoInputTextEdit);
      todoInputTextEdit.value = todo.text;
      todoInputTextEdit.after(buttonSaveEdit);
    });

    const buttonDelete = createElementTodo('button', 'button__delete');

    buttonDelete.innerHTML = `
      <svg class="button__icon">
        <use href="src/assets/icons/sprites.svg#delete-icon"></use>
      </svg>
    `;

    buttonDelete.addEventListener('click', () => removeTodo(index));

    todoCheckbox.addEventListener('change', () =>
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

  // counterTodo();
};

render();
