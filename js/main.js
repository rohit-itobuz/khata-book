// Accessing HTML elements
const borrowForm = document.getElementById("borrowForm");
const borrowList = document.getElementById("borrowList");

// For first entry- empty array or retrieve data from local storage
const borrowRecords = JSON.parse(localStorage.getItem("borrowRecords")) || [];

// Function to add a borrowing record
function addBorrowing(event) {
  event.preventDefault();

  // Get values from input fields
  const nameInput = document.getElementById("name");
  const amountInput = document.getElementById("amount");
  const customerName = nameInput.value.trim();
  const amount = amountInput.value.trim();

  // Check if name already exists
  const existingRecord = borrowRecords.find(
    (record) => record.customerName === customerName
  );
  if (existingRecord) {
    alert("Name already exists");
    return;
  } else if (!customerName || !amount || amount <= 0) {
    alert("Please enter a proper name and a proper amount.");
  } else {
    // Add record to the array
    borrowRecords.push({ customerName, amount });

    // Update borrowing list display status or show function
    updateBorrowingList();

    // Save borrowRecords array to local storage
    localStorage.setItem("borrowRecords", JSON.stringify(borrowRecords));
  }

  // Clear input fields when you click on add button
  nameInput.value = "";
  amountInput.value = "";
}

// Function to update borrowing list display
function updateBorrowingList() {
  borrowList.innerHTML = "";

  borrowRecords.forEach((record, index) => {
    const listItem = document.createElement("li");
    const nameSpan = document.createElement("span");
    const amountSpan = document.createElement("span");
    const removeButton = document.createElement("button");
    const updateButton = document.createElement("button");

    nameSpan.innerText =
      "Name:-" + " " + record.customerName + " " + "🔗🔗" + " ";
    amountSpan.innerText = "Amount:-" + " " + "₹" + record.amount;

    removeButton.innerText = "Remove";
    removeButton.style.paddingLeft = "2px";
    removeButton.style.paddingRight = "2px";
    removeButton.style.marginLeft = "1rem";
    removeButton.style.color = "red";
    removeButton.setAttribute("data-index", index);
    removeButton.addEventListener("click", removeData);

    updateButton.innerText = "Update";
    updateButton.style.paddingLeft = "2px";
    updateButton.style.paddingRight = "2px";
    updateButton.style.marginLeft = "1rem";
    updateButton.style.color = "green";
    updateButton.setAttribute("data-index", index);
    updateButton.addEventListener("click", updateBorrowing);

    listItem.appendChild(nameSpan);
    listItem.appendChild(amountSpan);
    listItem.appendChild(removeButton);
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
    addButton.addEventListener("click", addAmount);

    function addAmount() {
      const newAmount = updateInput.value;

      if (!isNaN(newAmount) && newAmount !== "") {
        borrowRecords[index].amount =
          Number(borrowRecords[index].amount) + Number(newAmount);
        updateInput.disabled = true; // Disable the input box after adding the amount
        addButton.disabled = true; // Disable the "Add" button after adding the amount
        updateBorrowingList();

        // when you update, then again update & Save borrowRecords array to local storage
        localStorage.setItem("borrowRecords", JSON.stringify(borrowRecords));
      } else {
        alert("Enter a valid amount");
      }
    }
    listItem.insertBefore(updateInput, event.target.nextSibling);
    listItem.insertBefore(addButton, updateInput.nextSibling);
  }
}

function removeData(event) {
  const index = event.target.getAttribute("data-index");
  borrowRecords.splice(index, 1);
  updateBorrowingList();

  localStorage.setItem("borrowRecords", JSON.stringify(borrowRecords));
}

// Delete all records(also from Local Storage)
function deleteAll() {
  borrowRecords.splice(0, borrowRecords.length);
  updateBorrowingList();
  localStorage.clear();
}

// Event listener for form submission
borrowForm.addEventListener("submit", addBorrowing);

// On page load- Update borrowing list display
updateBorrowingList();
