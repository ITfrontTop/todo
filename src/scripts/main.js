// const input = document.querySelector('[data-text-field]');
// const addTodoBtn = document.querySelector('[data-add-todo-btn]');
// const container = document.querySelector('[data-todo-container]');
// const countTodo = document.querySelector('[data-count-todo]');

// // category !!!!!!!!!!!!!!!!!!!!!!!!
// const categoryListButton = document.querySelectorAll('.count__item');
// const btnAll = document.querySelector('[data-category-all]');
// const btnActive = document.querySelector('[data-category-active]');
// const btnCompleted = document.querySelector('[data-category-completed]');

// // category change counter
// let stateTodo = 'all';

// // edit state variable
// let editingTodoId = null;

// const todoList = JSON.parse(localStorage.getItem('todos')) || [];

// const generateID = () => crypto.randomUUID();

// const updateUI = () => {
//   counterTodo();
//   render();
// };

// const createElementTodo = (element, elementClass) => {
//   const item = document.createElement(element);
//   item.classList.add(elementClass);

//   return item;
// };

// const saveToLocalStorage = () => {
//   localStorage.setItem('todos', JSON.stringify(todoList));
// };

// const counterTodo = () => {
//   const countNumber = todoList.reduce((acc, item) => {
//     if (!item.completed) acc += 1;

//     return acc;
//   }, 0);

//   countNumber > 0
//     ? (countTodo.textContent = `${countNumber} tasks left`)
//     : (countTodo.textContent = 'no tasks left');
// };

// const addTodoItem = () => {
//   if (input.value.trim()) {
//     todoList.push({
//       id: generateID(),
//       text: input.value.trim().replace(/\s+/g, ' '),
//       completed: false
//     });

//     input.value = '';

//     saveToLocalStorage();
//     updateUI();
//   }
// };

// const completedTodo = (todoCheckbox, todo) => {
//   todo.completed = todoCheckbox.checked;

//   saveToLocalStorage();
//   updateUI();
// };

// addTodoBtn.addEventListener('click', addTodoItem);
// input.addEventListener('keydown', (e) => {
//   if (e.key === 'Enter') {
//     addTodoItem();
//   }
// });

// const removeTodo = (id) => {
//   const todoIndex = todoList.findIndex((el) => el.id === id);

//   if (todoIndex < 0) {
//     alert('Your task is not found!');
//     return;
//   }

//   todoList.splice(todoIndex, 1);

//   if (id === editingTodoId) editingTodoId = null;

//   saveToLocalStorage();
//   updateUI();
// };

// const removeAddClassActiveArray = (array, item) => {
//   array.forEach((el) => {
//     el.classList.remove('active');
//   });
//   item.classList.add('active');
// };

// const filteredTasks = (state) => {
//   return todoList.filter((el) => {
//     switch (state) {
//       case 'all':
//         return true;
//       case 'active':
//         return !el.completed;
//       case 'completed':
//         return el.completed;
//     }
//   });
// };

// // container.addEventListener('click', (e) => {
// //   console.log(e.target);
// // });

// // ----------------- main render function ---------------------
// const render = () => {
//   container.innerHTML = '';

//   // added tasks state
//   const renderTasks = filteredTasks(stateTodo);

//   if (renderTasks.length === 0) {
//     const messageEnterText = createElementTodo('h3', 'content__message');

//     switch (stateTodo) {
//       case 'all':
//         messageEnterText.textContent = 'Enter your tasks!';
//         break;
//       case 'active':
//         messageEnterText.textContent = 'No active tasks!';
//         break;
//       case 'completed':
//         messageEnterText.textContent = 'No completed tasks! Do something!';
//     }

//     container.append(messageEnterText);
//   }

//   renderTasks.forEach((todo) => {
//     // added container item
//     const todoWrapper = createElementTodo('div', 'content__item');

//     container.append(todoWrapper);

//     // added checkbox
//     const todoCheckbox = createElementTodo('input', 'content__checkbox');
//     todoCheckbox.type = 'checkbox';
//     todoCheckbox.checked = todo.completed;

//     // create todo text
//     const todoText = createElementTodo('p', 'content__text');
//     // added class completed
//     todo.completed
//       ? todoText.classList.add('completed')
//       : todoText.classList.remove('completed');
//     // add text task
//     todoText.textContent = todo.text;

//     // create buttons
//     const buttonWrapper = createElementTodo('div', 'button__wrapper');
//     const buttonEdit = createElementTodo('button', 'button__edit');

//     buttonEdit.innerHTML = `
//       <svg class="button__icon">
//         <use href="src/assets/icons/sprites.svg#edit-icon"></use>
//       </svg>
//     `;

//     // disable edit btn
//     buttonEdit.disabled = todo.completed;

//     const todoCreateEditElement = () => {
//       const todoInputTextEdit = createElementTodo('input', 'content__text');
//       todoInputTextEdit.type = 'text';

//       const buttonSaveEdit = createElementTodo('button', 'button__save-edit');
//       buttonSaveEdit.textContent = 'Save';

//       // press Escape cancel edit input text
//       todoInputTextEdit.addEventListener('keydown', (e) => {
//         if (e.key === 'Escape' || e.key === 'Esc') {
//           editingTodoId = null;
//           updateUI();
//         }
//       });

//       // save
//       buttonSaveEdit.addEventListener('click', () => {
//         if (todoInputTextEdit.value.trim()) {
//           todo.text = todoInputTextEdit.value.trim().replace(/\s+/g, ' ');
//           editingTodoId = null;
//           saveToLocalStorage();
//           updateUI();
//         } else {
//           alert('You cannot save empty text! Please, write your tasks');
//           return;
//         }
//       });

//       todoWrapper.prepend(todoInputTextEdit);
//       todoInputTextEdit.value = todo.text;
//       todoInputTextEdit.after(buttonSaveEdit);
//     };

//     const todoCreateDefaultElement = () => {
//       const buttonDelete = createElementTodo('button', 'button__delete');

//       buttonDelete.innerHTML = `
//       <svg class="button__icon">
//         <use href="src/assets/icons/sprites.svg#delete-icon"></use>
//       </svg>
//     `;

//       buttonDelete.addEventListener('click', () => removeTodo(todo.id));

//       todoCheckbox.addEventListener('change', () =>
//         completedTodo(todoCheckbox, todo)
//       );

//       // added count
//       todoWrapper.append(todoCheckbox);
//       todoWrapper.append(todoText);

//       // added buttons
//       todoWrapper.append(buttonWrapper);
//       buttonWrapper.append(buttonEdit);
//       buttonWrapper.append(buttonDelete);
//     };

//     // edit todo
//     buttonEdit.addEventListener('click', () => {
//       editingTodoId = todo.id;

//       render();
//     });

//     if (editingTodoId === todo.id) {
//       todoCreateEditElement();
//     } else {
//       todoCreateDefaultElement();
//     }
//   });
// };

// const changeCategoryState = (state, btn) => {
//   removeAddClassActiveArray(categoryListButton, btn);
//   stateTodo = state;
//   editingTodoId = null;
//   updateUI();
// };

// btnAll.addEventListener('click', () => {
//   changeCategoryState('all', btnAll);
// });

// btnActive.addEventListener('click', () => {
//   changeCategoryState('active', btnActive);
// });

// btnCompleted.addEventListener('click', () => {
//   changeCategoryState('completed', btnCompleted);
// });

// updateUI();

const input = document.querySelector('[data-text-field]');
const addTodoBtn = document.querySelector('[data-add-todo-btn]');
const container = document.querySelector('[data-todo-container]');
const countTodo = document.querySelector('[data-count-todo]');

// category !!!!!!!!!!!!!!!!!!!!!!!!
const categoryListButton = document.querySelectorAll('.count__item');
const btnAll = document.querySelector('[data-category-all]');
const btnActive = document.querySelector('[data-category-active]');
const btnCompleted = document.querySelector('[data-category-completed]');

// category change counter
let stateTodo = 'all';

// edit state variable
let editingTodoId = null;

const todoList = JSON.parse(localStorage.getItem('todos')) || [];

const generateID = () => crypto.randomUUID();

const updateUI = () => {
  counterTodo();
  render();
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
      editingTodoId = todoId;
      render();
    }
  }

  // if (saveBtn) {
  // }
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

    saveToLocalStorage();
    updateUI();
  }
};

const completedTodo = (todoCheckbox, todo) => {
  todo.completed = todoCheckbox.checked;

  saveToLocalStorage();
  updateUI();
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

  if (id === editingTodoId) editingTodoId = null;

  saveToLocalStorage();
  updateUI();
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
    }
  });
};

// ----------------- main render function ---------------------
const render = () => {
  container.innerHTML = '';

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

    container.append(messageEnterText);
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
    buttonEdit.dataset.action = 'edit';

    buttonEdit.innerHTML = `
      <svg class="button__icon">
        <use href="src/assets/icons/sprites.svg#edit-icon"></use>
      </svg>
    `;

    // disable edit btn
    buttonEdit.disabled = todo.completed;

    const todoCreateEditElement = () => {
      const todoInputTextEdit = createElementTodo('input', 'content__text');
      todoInputTextEdit.type = 'text';

      const buttonSaveEdit = createElementTodo('button', 'button__save-edit');
      buttonSaveEdit.textContent = 'Save';

      // press Escape cancel edit input text
      todoInputTextEdit.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
          editingTodoId = null;
          updateUI();
        }
      });

      // save
      buttonSaveEdit.addEventListener('click', () => {
        if (todoInputTextEdit.value.trim()) {
          todo.text = todoInputTextEdit.value.trim().replace(/\s+/g, ' ');
          editingTodoId = null;
          saveToLocalStorage();
          updateUI();
        } else {
          alert('You cannot save empty text! Please, write your tasks');
          return;
        }
      });

      todoWrapper.prepend(todoInputTextEdit);
      todoInputTextEdit.value = todo.text;
      todoInputTextEdit.after(buttonSaveEdit);
    };

    const todoCreateDefaultElement = () => {
      const buttonDelete = createElementTodo('button', 'button__delete');
      buttonDelete.dataset.action = 'delete';

      buttonDelete.innerHTML = `
      <svg class="button__icon">
        <use href="src/assets/icons/sprites.svg#delete-icon"></use>
      </svg>
    `;

      todoCheckbox.addEventListener('change', () =>
        completedTodo(todoCheckbox, todo)
      );

      // added count
      todoWrapper.append(todoCheckbox);
      todoWrapper.append(todoText);

      // added buttons
      todoWrapper.append(buttonWrapper);
      buttonWrapper.append(buttonEdit);
      buttonWrapper.append(buttonDelete);
    };

    if (editingTodoId === todo.id) {
      todoCreateEditElement();
    } else {
      todoCreateDefaultElement();
    }
  });
};

const changeCategoryState = (state, btn) => {
  removeAddClassActiveArray(categoryListButton, btn);
  stateTodo = state;
  editingTodoId = null;
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
