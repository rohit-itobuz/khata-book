
// Accessing HTML elements
const borrowForm = document.getElementById('borrowForm');
const borrowList = document.getElementById('borrowList');

// Array to store borrowing records
let borrowRecords = [];

// Event listener for form submission
borrowForm.addEventListener('submit', addBorrowing);

// Function to add a borrowing record
function addBorrowing(event) {
  event.preventDefault();

  // Get values from input fields
  const nameInput = document.getElementById('name');
  const amountInput = document.getElementById('amount');
  const name = nameInput.value;
  const amount = parseFloat(amountInput.value);

  // Clear input fields when you click on add button
  nameInput.value = '';
  amountInput.value = '';
  
  let person = {
    Name : name,
    Amount : amount
  
};

  // Add record to the array
    //  borrowRecords.push(person.Name, person.Amount);
    borrowRecords.push({ name, amount });

  // Update borrowing list display status or show function 
  updateBorrowingList();
}

// Function to update borrowing list display
function updateBorrowingList() {
  borrowList.innerHTML = '' 

  borrowRecords.forEach((record, index) => {
    // create container for storing borrowed records 
    const listItem = document.createElement('li');
    const nameSpan = document.createElement('span');
    const amountSpan = document.createElement('span');
    let totalAmountSpan = document.createElement('span');
    const updateButton = document.createElement('button');

    nameSpan.innerText = record.name + " " + "=>"+ " ";
    amountSpan.innerText = ' ' +'₹' + record.amount;
    updateButton.innerText = 'Update';
    updateButton.setAttribute('data-index', index);
    updateButton.addEventListener('click', updateBorrowing);

    listItem.appendChild(nameSpan);
    listItem.appendChild(amountSpan);
    listItem.appendChild(updateButton);
    borrowList.appendChild(listItem);
    borrowList.appendChild(totalAmountSpan);
  });
}

// Function to update a borrowing record
function updateBorrowing(event) {
  const index = event.target.getAttribute('data-index');

  if (index !== null) {
    const newAmount = prompt('Enter the updated amount of that person:', borrowRecords[index].amount);
    
    if (!isNaN(newAmount)) {
      borrowRecords[index].amount += " " + "+" + " " + "₹" + newAmount;
    //   console.log(borrowRecords);
    //   totalAmountSpan = (amount + newAmount);
    //   console.log(totalAmountSpan);

      updateBorrowingList();
    }
  }
}



