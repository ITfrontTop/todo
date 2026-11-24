const input = document.querySelector('[data-text-field]');
const addTodoBtn = document.querySelector('[data-add-todo-btn]');
const container = document.querySelector('[data-todo-container]');
const countTodo = document.querySelector('[data-count-todo]');
// search
const searchInput = document.querySelector('[data-search-field]');
const searchDeleteBtn = document.querySelector('[data-search-delete-btn]');
// clear btn
const clearCompletedBtn = document.querySelector('[data-clear-completed-btn]');

// category !!!!!!!!!!!!!!!!!!!!!!!!
const categoryListButton = document.querySelectorAll('.count__item');
const btnAll = document.querySelector('[data-category-all]');
const btnActive = document.querySelector('[data-category-active]');
const btnCompleted = document.querySelector('[data-category-completed]');

// category change counter
let stateTodo = 'all';

// edit state variables
let editingTodo = {
  id: null,
  text: ''
};

const resetEditingTodo = () => {
  editingTodo.id = null;
  editingTodo.text = '';
};

// search
let searchQuery = '';

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  if (searchQuery) {
    searchDeleteBtn.style.display = 'block';
  } else {
    searchDeleteBtn.style.display = 'none';
  }

  render();
});

searchDeleteBtn.addEventListener('click', () => {
  searchQuery = '';
  searchInput.value = '';
  searchDeleteBtn.style.display = 'none';

  render();
});

const searchTodo = (todoList) => {
  return todoList.filter(({ text }) =>
    text.toLowerCase().includes(searchQuery)
  );
};

const todoList = JSON.parse(localStorage.getItem('todos')) || [];

const generateID = () => crypto.randomUUID();

const updateUI = () => {
  counterTodo();
  render();
};

const saveAndUpdate = () => {
  saveToLocalStorage();
  updateUI();
};

// --------- event delegation (delete, edit, save) ----------
container.addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.button__delete');
  const editBtn = e.target.closest('.button__edit');
  const saveBtn = e.target.closest('.button__save-edit');

  if (deleteBtn || editBtn || saveBtn) {
    // data-id container
    const todoItemContainer = e.target.closest('.content__item');
    if (!todoItemContainer) return;

    const todoId = todoItemContainer.dataset.id;

    if (deleteBtn) {
      removeTodo(todoId);
    }

    if (editBtn) {
      const editingTodoItem = todoList.find(({ id }) => todoId === id);
      if (!editingTodoItem) return;

      editingTodo.text = editingTodoItem.text;
      editingTodo.id = todoId;

      render();
    }

    if (saveBtn) {
      const todoSaveItem = todoList.find((item) => item.id === todoId);
      if (!todoSaveItem) return;

      if (editingTodo.text.trim()) {
        todoSaveItem.text = editingTodo.text.trim().replace(/\s+/g, ' ');
        resetEditingTodo();

        saveAndUpdate();
      } else {
        alert('You cannot save empty text! Please, write your tasks');
        return;
      }
    }
  }
});

container.addEventListener('change', (e) => {
  const checkboxBtn = e.target.closest('.content__checkbox');
  if (!checkboxBtn) return;

  const todoItemContainer = checkboxBtn.closest('.content__item');
  if (!todoItemContainer) return;
  const todoId = todoItemContainer.dataset.id;

  const todoItemCheckbox = todoList.find((item) => item.id === todoId);
  if (!todoItemCheckbox) return;

  completedTodo(checkboxBtn, todoItemCheckbox);
});

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

    input.value = '';

    saveAndUpdate();
  }
};

const completedTodo = (todoCheckbox, todo) => {
  todo.completed = todoCheckbox.checked;

  saveAndUpdate();
};

addTodoBtn.addEventListener('click', addTodoItem);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTodoItem();
  }
});

const removeTodo = (id) => {
  const todoIndex = todoList.findIndex((el) => el.id === id);

  if (todoIndex < 0) {
    alert('Your task is not found!');
    return;
  }

  todoList.splice(todoIndex, 1);

  if (id === editingTodo.id) {
    resetEditingTodo();
  }

  saveAndUpdate();
};

const removeAddClassActiveArray = (array, item) => {
  array.forEach((el) => {
    el.classList.remove('active');
  });
  item.classList.add('active');
};

const filteredTasks = (state) => {
  return todoList.filter((el) => {
    switch (state) {
      case 'all':
        return true;
      case 'active':
        return !el.completed;
      case 'completed':
        return el.completed;
      default:
        return true;
    }
  });
};

// ------------------------------------
const clearCompletedTodo = () => {
  const isHaveCompletedTasks = todoList.some(({ completed }) => completed);

  if (!isHaveCompletedTasks) return;

  // filter active todo
  const activeTodo = todoList.filter(({ completed }) => !completed);

  // delete and added active todo
  todoList.splice(0);
  todoList.push(...activeTodo);

  saveAndUpdate();
};

clearCompletedBtn.addEventListener('click', clearCompletedTodo);

// ----------------- main render function ---------------------
const render = () => {
  container.innerHTML = '';

  // added tasks state
  const renderTasks = searchTodo(filteredTasks(stateTodo)).toSorted(
    (a, b) => a.completed - b.completed
  );

  if (renderTasks.length === 0) {
    const emptyMessage = createElementTodo('h3', 'content__message');

    if (searchQuery.length) {
      emptyMessage.textContent = 'No matching tasks!';
    } else {
      switch (stateTodo) {
        case 'all':
          emptyMessage.textContent = 'Enter your tasks!';
          break;
        case 'active':
          emptyMessage.textContent = 'No active tasks!';
          break;
        case 'completed':
          emptyMessage.textContent = 'No completed tasks! Do something!';
      }
    }

    container.append(emptyMessage);
  }

  renderTasks.forEach((todo) => {
    // added container item
    const todoWrapper = createElementTodo('div', 'content__item');
    // added data-id
    todoWrapper.dataset.id = todo.id;
    container.append(todoWrapper);

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
    buttonEdit.disabled = todo.completed;

    const todoCreateEditElement = () => {
      const todoInputTextEdit = createElementTodo('input', 'content__text');
      todoInputTextEdit.name = 'editText';
      todoInputTextEdit.type = 'text';

      const buttonSaveEdit = createElementTodo('button', 'button__save-edit');
      buttonSaveEdit.textContent = 'Save';

      // change editingTodoText
      todoInputTextEdit.addEventListener('input', (e) => {
        editingTodo.text = e.target.value;
      });

      // press Escape cancel edit input text
      todoInputTextEdit.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
          resetEditingTodo();
          updateUI();
        }
      });

      todoWrapper.prepend(todoInputTextEdit);
      todoInputTextEdit.value = editingTodo.text;
      todoInputTextEdit.after(buttonSaveEdit);
    };

    const todoCreateDefaultElement = () => {
      const buttonDelete = createElementTodo('button', 'button__delete');

      buttonDelete.innerHTML = `
      <svg class="button__icon">
        <use href="src/assets/icons/sprites.svg#delete-icon"></use>
      </svg>
    `;

      // added count
      todoWrapper.append(todoCheckbox);
      todoWrapper.append(todoText);

      // added buttons
      todoWrapper.append(buttonWrapper);
      buttonWrapper.append(buttonEdit);
      buttonWrapper.append(buttonDelete);
    };

    if (editingTodo.id === todo.id) {
      todoCreateEditElement();
    } else {
      todoCreateDefaultElement();
    }
  });
};

const changeCategoryState = (state, btn) => {
  removeAddClassActiveArray(categoryListButton, btn);
  stateTodo = state;
  resetEditingTodo();
  updateUI();
};

btnAll.addEventListener('click', () => {
  changeCategoryState('all', btnAll);
});

btnActive.addEventListener('click', () => {
  changeCategoryState('active', btnActive);
});

btnCompleted.addEventListener('click', () => {
  changeCategoryState('completed', btnCompleted);
});

updateUI();
