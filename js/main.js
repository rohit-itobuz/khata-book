// Accessing HTML elements
const borrowForm = document.getElementById("borrowForm");
const borrowList = document.getElementById("borrowList");

// Array to store borrowing records
const borrowRecords = [];


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
  if (!name || !amount || amount <= 0) {
    alert("please enter proper name and proper amount");
  } else {
    borrowRecords.push({ name, amount });

  // Update borrowing list display status or show function
    updateBorrowingList();
  }
}

// Function to update borrowing list display
function updateBorrowingList() {
  borrowList.innerHTML = "";

  borrowRecords.forEach((record, index) => {
    const listItem = document.createElement("li");
    const nameSpan = document.createElement("span");
    const amountSpan = document.createElement("span");
    const updateButton = document.createElement("button");

    nameSpan.innerText = "Name:-" + " " + record.name + " " + "🔗🔗" + " ";
    amountSpan.innerText = "Amount:-" + " " + "₹" + record.amount;
    updateButton.innerText = "Update";
    updateButton.style.paddingLeft = "2px";
    updateButton.style.paddingRight = "2px";
    updateButton.style.marginLeft = "1rem";
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
    const listItem = event.target.parentNode;
    const updateInput = document.createElement("input");
    const addButton = document.createElement("button");

    updateInput.type = "number";
    updateInput.setAttribute("data-index", index);
    updateInput.placeholder = "Additional amount";
    updateInput.style.marginLeft = "2rem";
    updateInput.style.paddingLeft = "2px";

    addButton.innerText = "Add";
    addButton.style.paddingLeft = "2px";
    addButton.style.paddingRight = "2px";
    addButton.addEventListener("click", add);

    function add() {
      const newAmount = updateInput.value;

      if (!isNaN(newAmount) && newAmount !== "") {
        borrowRecords[index].amount =
          Number(borrowRecords[index].amount) + Number(newAmount);
        updateInput.disabled = true; // Disable the input box after adding the amount
        addButton.disabled = true; // Disable the "Add" button after adding the amount
        updateBorrowingList();
      } else {
        alert("Enter a valid amount");
      }
    }
    listItem.insertBefore(updateInput, event.target.nextSibling);
    listItem.insertBefore(addButton, updateInput.nextSibling);
  }
}

// Event listener for form submission
borrowForm.addEventListener("submit", addBorrowing);
