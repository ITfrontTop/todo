const inputTodo = document.querySelector('.add__input');
const addBtn = document.querySelector('.add__btn');
const itemList = document.querySelector('.content');
const checkboxInput = document.querySelector('.content__checkbox');
const textTodo = document.querySelector('.content__text');

const dataTodo = [];

addBtn.addEventListener('click', () => {
  console.log(inputTodo.value);

  const item = document.createElement('div');
  item.classList.add('content__item');

  const checkboxItem = document.createElement('input');
  checkboxItem.classList.add('content__checkbox');
  checkboxItem.type = 'checkbox';
  checkboxItem.name = 'add';
  checkboxItem.id = 'add-item';

  const labelText = document.createElement('label');
  labelText.classList.add('content__text');
  labelText.setAttribute('for', 'add-item');
  labelText.textContent = inputTodo.value;

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('button__wrapper');

  // button edit and delete
  const btnEdit = document.createElement('button');
  btnEdit.classList.add('button__edit');

  const btnDelete = document.createElement('button');
  btnDelete.classList.add('button__delete');

  itemList.append(item);

  item.append(checkboxItem);
  item.append(labelText);
  item.append(btnWrapper);

  // added button
  btnWrapper.append(btnEdit);
  btnWrapper.append(btnDelete);

  inputTodo.value = '';
});

// продовжити з svg button
