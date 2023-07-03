// Accessing HTML elements
const borrowForm = document.getElementById("borrowForm");
const borrowList = document.getElementById("borrowList");
const addUpdateAmount = document.getElementById("addUpdateAmount");

// Array to store borrowing records
let borrowRecords = [];

// Event listener for form submission
borrowForm.addEventListener("submit", addBorrowing);

// Function to add a borrowing record
function addBorrowing(event) {
  event.preventDefault();

  // Get values from input fields
  const nameInput = document.getElementById("name");
  const amountInput = document.getElementById("amount");
  const name = nameInput.value.trim();
  const amount = amountInput.value.trim();

  // Clear input fields when you click on add button
  nameInput.value = "";
  amountInput.value = "";

  // Add record to the array
  if (name === "" || amount === "") {
    alert("please enter in logical way");
  } else {
    borrowRecords.push({ name, amount });

    // Update borrowing list display status or show function
    updateBorrowingList();
  }
}

// Function to update borrowing list display
function updateBorrowingList() {
  borrowList.innerHTML = "";
  addUpdateAmount.innerHTML = "";

  borrowRecords.forEach((record, index) => {
    // create container for storing borrowed records
    const listItem = document.createElement("li");
    const nameSpan = document.createElement("span");
    const amountSpan = document.createElement("span");
    const updateButton = document.createElement("button");

    nameSpan.innerText = "Name:-" + " " + record.name + " " + "🔗🔗" + " ";
    amountSpan.innerText = "Amount:-" + " " + "₹" + record.amount;
    updateButton.innerText = "Update";
    updateButton.setAttribute("data-index", index);
    updateButton.addEventListener("click", updateBorrowing);

    listItem.appendChild(nameSpan);
    listItem.appendChild(amountSpan);
    listItem.appendChild(updateButton);
    borrowList.appendChild(listItem);
  });
}

// Function to update a borrowing record
function updateBorrowing(event) {
  const index = event.target.getAttribute("data-index");

  if (index !== null) {
    let updateInput = document.createElement("INPUT");
    addUpdateAmount.appendChild(updateInput);

    const addButton = document.createElement("button");
    addButton.innerText = "add";
    addButton.addEventListener("click", add);
    addUpdateAmount.appendChild(addButton);

    function add() {
      const newAmount = updateInput.value;
      if (!isNaN(newAmount)) {
        borrowRecords[index].amount =
          Number(borrowRecords[index].amount) + Number(newAmount);
        updateBorrowingList();
      } else {
        alert("Enter Valid Amount");
      }
    }
  }
}
