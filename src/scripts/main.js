const inputTodo = document.querySelector('.add__input');
const addBtn = document.querySelector('.add__btn');
const itemList = document.querySelector('.content');
const checkboxItem = document.querySelector('.content__checkbox');
const textTodo = document.querySelector('.content__text');

const dataTodo = [];

checkboxItem.addEventListener('click', () => {
  if (
    checkboxItem.innerHTML ===
    `               
    <svg class="content__checkbox-icon">
      <use href="src/assets/icons/sprites.svg#checkbox-on"></use>
    </svg>`
  ) {
    checkboxItem.innerHTML = `               
    <svg class="content__checkbox-icon">
      <use href="src/assets/icons/sprites.svg#checkbox-off"></use>
    </svg>`;
  } else {
    checkboxItem.innerHTML = `               
    <svg class="content__checkbox-icon">
      <use href="src/assets/icons/sprites.svg#checkbox-on"></use>
    </svg>`;
  }
});

addBtn.addEventListener('click', () => {
  console.log(inputTodo.value);

  const item = document.createElement('div');
  item.classList.add('content__item');

  // const checkboxItem = document.createElement('input');
  // checkboxItem.classList.add('content__checkbox');
  // checkboxItem.type = 'checkbox';
  // checkboxItem.name = 'add';
  // checkboxItem.id = 'add-item';
  const checkboxItem = document.createElement('div');
  checkboxItem.classList.add('content__checkbox');

  // const labelText = document.createElement('label');
  // labelText.classList.add('content__text');
  // labelText.setAttribute('for', 'add-item');
  // labelText.textContent = inputTodo.value;
  const labelText = document.createElement('p');
  labelText.classList.add('content__text');
  labelText.textContent = inputTodo.value;

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('button__wrapper');

  // button edit and delete
  const btnEdit = document.createElement('button');
  btnEdit.classList.add('button__edit');

  const btnDelete = document.createElement('button');
  btnDelete.classList.add('button__delete');

  btnEdit.innerHTML = `
    <svg class="button__icon">
      <use href="src/assets/icons/sprites.svg#edit-icon"></use>
    </svg>
  `;

  btnDelete.innerHTML = `
    <svg class="button__icon">
      <use href="src/assets/icons/sprites.svg#delete-icon"></use>
    </svg>
  `;

  itemList.append(item);

  item.append(checkboxItem);
  item.append(labelText);
  item.append(btnWrapper);

  // added button
  btnWrapper.append(btnEdit);
  btnWrapper.append(btnDelete);

  // clean input
  inputTodo.value = '';
});
