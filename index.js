// Load expenses from local storage or create empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Add an expense to the expenses array and update the expense list
function addExpense() {
  let expenseAmountInput = document.getElementById('expenseAmount');
  let expenseDescriptionInput = document.getElementById('expenseDescription');
  let expenseCategoryInput = document.getElementById('expenseCategory');

  let expenseAmount = expenseAmountInput.value;
  let expenseDescription = expenseDescriptionInput.value;
  let expenseCategory = expenseCategoryInput.value;

  let expense = { amount: expenseAmount, description: expenseDescription, category: expenseCategory };
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  updateExpenseList();
  expenseAmountInput.value = '';
  expenseDescriptionInput.value = '';
  expenseCategoryInput.value = '';
}

// Update the expense list on the screen
function updateExpenseList() {
  let expenseList = document.getElementById('expenseList');
  expenseList.innerHTML = '';

  for (let i = 0; i < expenses.length; i++) {
    let expense = expenses[i];
    let listItem = document.createElement('li');
    listItem.innerHTML = `${expense.amount} - ${expense.description} - ${expense.category}`;

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', () => {
      expenses.splice(i, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      updateExpenseList();
    });
    listItem.appendChild(deleteButton);

    let editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click', () => {
      let newAmount = prompt('Enter the new amount:', expense.amount);
      let newDescription = prompt('Enter the new description:', expense.description);
      let newCategory = prompt('Enter the new category:', expense.category);
      
      expense.amount = newAmount;
      expense.description = newDescription;
      expense.category = newCategory;
      localStorage.setItem('expenses', JSON.stringify(expenses));
      updateExpenseList();
    });
    listItem.appendChild(editButton);

    expenseList.appendChild(listItem);
  }
}

// Set up event listener for add expense button
let addExpenseButton = document.getElementById('addExpenseButton');
addExpenseButton.addEventListener('click', addExpense);

// Update the expense list on page load
updateExpenseList();