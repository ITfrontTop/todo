// const inputTodo = document.querySelector('.add__input');
// const addBtn = document.querySelector('.add__btn');
// const itemList = document.querySelector('.content');

// const dataTodo = [];

// const createElementTodo = (tegName, tegClass) => {
//   const item = document.createElement(tegName);
//   item.classList.add(tegClass);

//   return item;
// };

// addBtn.addEventListener('click', () => {
//   dataTodo.push(inputTodo.value);
//   console.log(dataTodo);

//   const item = createElementTodo('div', 'content__item');
//   const checkboxItem = createElementTodo('div', 'content__checkbox');
//   const labelText = createElementTodo('p', 'content__text');

//   const btnWrapper = createElementTodo('div', 'button__wrapper');
//   const btnEdit = createElementTodo('button', 'button__edit');
//   const btnDelete = createElementTodo('button', 'button__delete');

//   btnEdit.innerHTML = `
//     <svg class="button__icon">
//       <use href="src/assets/icons/sprites.svg#edit-icon"></use>
//     </svg>
//   `;

//   btnDelete.innerHTML = `
//     <svg class="button__icon">
//       <use href="src/assets/icons/sprites.svg#delete-icon"></use>
//     </svg>
//   `;

//   labelText.textContent = inputTodo.value;
//   console.log(labelText.textContent);

//   itemList.append(item);

//   item.append(checkboxItem);
//   item.append(labelText);
//   item.append(btnWrapper);

//   // added button
//   btnWrapper.append(btnEdit);
//   btnWrapper.append(btnDelete);

//   // clean input
//   inputTodo.value = '';
//   render();
// });

// const render = () => {
//   dataTodo.forEach((todo) => {});
// };

const input = document.querySelector('[data-input-field]');
const addTodoBtn = document.querySelector('[data-add-todo-btn]');
const container = document.querySelector('[data-todo-container]');

addTodoBtn.addEventListener('click', () => {
  if (input.value.trim()) {
  }
});
