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

// const todoList = JSON.parse(localStorage.getItem('todos')) || [];

// const generateID = () => new Date().getTime();

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
//       completed: false,
//       edit: false
//     });

//     input.value = '';

//     saveToLocalStorage();
//     counterTodo();
//     render();
//   }
// };

// const completedTodo = (todoCheckbox, todo) => {
//   todo.completed = todoCheckbox.checked;
//   saveToLocalStorage();
//   counterTodo();
//   render();
// };

// addTodoBtn.addEventListener('click', addTodoItem);
// input.addEventListener('keydown', (e) => {
//   if (e.key === 'Enter') {
//     addTodoItem();
//   }
// });

// const removeTodo = (id) => {
//   const element = todoList.findIndex((el) => el.id === id);

//   if (element < 0) {
//     alert('Your task is not found!');
//     return;
//   }

//   todoList.splice(element, 1);
//   saveToLocalStorage();
//   counterTodo();
//   render();
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
//     if (todo.completed) {
//       buttonEdit.disabled = true;
//     } else {
//       buttonEdit.disabled = false;
//     }

//     const todoCreateEditElement = () => {
//       const todoInputTextEdit = createElementTodo('input', 'content__text');
//       todoInputTextEdit.type = 'text';

//       const buttonSaveEdit = createElementTodo('button', 'button__save-edit');
//       buttonSaveEdit.textContent = 'Save';

//       // press Escape cancel edit input text
//       todoInputTextEdit.addEventListener('keydown', (e) => {
//         if (e.key === 'Escape' || e.key === 'Esc') {
//           todo.edit = false;
//           render();
//         }
//       });

//       // save
//       buttonSaveEdit.addEventListener('click', () => {
//         if (todoInputTextEdit.value.trim()) {
//           todo.text = todoInputTextEdit.value.trim().replace(/\s+/g, ' ');
//           todo.edit = false;
//           saveToLocalStorage();
//           render();
//         } else {
//           alert('You cannot save empty text! Please, write your tasks');
//           return;
//         }

//         // saveToLocalStorage();
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
//       const isEditing = todo.edit;

//       todoList.forEach((el) => {
//         if (el.id !== todo.id) {
//           el.edit = false;
//         } else {
//           el.edit = !isEditing;
//         }
//       });
//       render();
//     });

//     if (todo.edit) {
//       todoCreateEditElement();
//     } else {
//       todoCreateDefaultElement();
//     }
//   });
// };

// const changeCategoryState = (state, btn) => {
//   removeAddClassActiveArray(categoryListButton, btn);
//   stateTodo = state;
//   todoList.forEach((el) => {
//     el.edit = false;
//   });
//   render();
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

// render();
// counterTodo();

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
    counterTodo();
    render();
  }
};

const completedTodo = (todoCheckbox, todo) => {
  todo.completed = todoCheckbox.checked;

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

const removeTodo = (id) => {
  const element = todoList.findIndex((el) => el.id === id);

  if (element < 0) {
    alert('Your task is not found!');
    return;
  }

  todoList.splice(element, 1);
  editingTodoId = null;

  saveToLocalStorage();
  counterTodo();
  render();
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
      todoInputTextEdit.type = 'text';

      const buttonSaveEdit = createElementTodo('button', 'button__save-edit');
      buttonSaveEdit.textContent = 'Save';

      // press Escape cancel edit input text
      todoInputTextEdit.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
          editingTodoId = null;
          render();
        }
      });

      // save
      buttonSaveEdit.addEventListener('click', () => {
        if (todoInputTextEdit.value.trim()) {
          todo.text = todoInputTextEdit.value.trim().replace(/\s+/g, ' ');
          editingTodoId = null;
          saveToLocalStorage();
          render();
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

      buttonDelete.innerHTML = `
      <svg class="button__icon">
        <use href="src/assets/icons/sprites.svg#delete-icon"></use>
      </svg>
    `;

      buttonDelete.addEventListener('click', () => removeTodo(todo.id));

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

    // edit todo
    buttonEdit.addEventListener('click', () => {
      editingTodoId = todo.id;

      render();
    });

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
  render();
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

render();
counterTodo();
