// Get values from input fields
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const borrowForm = document.getElementById("borrowForm");
const borrowList = document.getElementById("borrowList");

// For first entry - empty array or retrieve data from local storage
const borrowRecords = JSON.parse(localStorage.getItem("borrowRecords")) || [];


// Function to add a borrowing record
function addBorrowing(event) {
  event.preventDefault();

  const customerName = nameInput.value.trim();
  const amount = amountInput.value.trim();

  // Check if name already exists
  const existingRecord = borrowRecords.find(
    (record) => record.customerName.toLowerCase() === customerName.toLowerCase()
  );
  if (existingRecord) {
    alert("Name already exists...");
    return;
  } else if (!customerName || !amount || amount <= 0) {
    alert("Please enter a proper name and a proper amount.");
  } else {
    const id = new Date().getTime(); //Generate random number
    // Add record to the array
    borrowRecords.push({ customerName, amount, id});

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
  let totalAmount = 0;

  borrowRecords.forEach((record) => {
    const listItem = document.createElement("li");
    const nameSpan = document.createElement("span");
    const amountSpan = document.createElement("span");
    const removeButton = document.createElement("button");
    const updateButton = document.createElement("button");

    nameSpan.innerText = "🧍" + "Name:" + " " + record.customerName + " ";
    amountSpan.innerText = " " + "💵💰" + " " + "Amount:" + " " + "₹" + record.amount;

    listItem.setAttribute("data-id", record.id);

    removeButton.innerText = "Remove";
    removeButton.style.padding = "2px";
    removeButton.style.marginLeft = "1rem";
    removeButton.style.color = "red";
    removeButton.addEventListener("click", removeData);

    updateButton.innerText = "Update";
    updateButton.style.padding = "2px";
    updateButton.style.marginLeft = "1rem";
    updateButton.style.color = "green";
    updateButton.addEventListener("click", updateBorrowing);

    listItem.appendChild(nameSpan);
    listItem.appendChild(amountSpan);
    listItem.appendChild(removeButton);
    listItem.appendChild(updateButton);
    borrowList.appendChild(listItem);

    totalAmount += Number(record.amount);
  });
  document.getElementById("totalAmountValue").innerHTML = totalAmount;
}

// Function to update a borrowing record
function updateBorrowing(event) {
  const listItem = event.target.parentNode;
  const id = Number(listItem.getAttribute("data-id")); // Retrieve data-id from the li-tag

  if (id !== null) {
    const listItem = event.target.parentNode;
    const updateInput = document.createElement("input");
    const addButton = document.createElement("button");

    updateInput.type = "number";
    updateInput.setAttribute("data-id", id);
    updateInput.placeholder = "Additional amount";
    updateInput.style.marginLeft = "2rem";
    updateInput.style.padding = "2px";

    addButton.innerText = "Add";
    addButton.style.padding = "2px";
    addButton.addEventListener("click", addAmount);

    function addAmount() {
      const newAmount = updateInput.value;

      if (!isNaN(newAmount) && newAmount !== "") {
        const index = borrowRecords.findIndex((record) => record.id === id);
        borrowRecords[index].amount =
          Number(borrowRecords[index].amount) + Number(newAmount);
        updateInput.disabled = true; // Disable the input box after adding the amount
        addButton.disabled = true; // Disable the "Add" button after adding the amount
        updateBorrowingList();

        // when you update, then again update & Save borrowRecords array to local storage
        localStorage.setItem("borrowRecords", JSON.stringify(borrowRecords));
      }
       else {
        alert("Enter a valid amount");
      }
    }
    listItem.insertBefore(updateInput, event.target.nextSibling);
    listItem.insertBefore(addButton, updateInput.nextSibling);

    event.target.style.display = "none"; // Hide the update button
  }
}

function removeData(event) {
  const listItem = event.target.parentNode;
  const id = Number(listItem.getAttribute("data-id")); // Retrieve data-id from the li-tag
  const index = borrowRecords.findIndex((record) => record.id === id);
    borrowRecords.splice(index, 1);
    updateBorrowingList();

    // Save borrowRecords array to local storage
    localStorage.setItem("borrowRecords", JSON.stringify(borrowRecords));
}

// Delete all records (also from Local Storage)
function deleteAll() {
  borrowRecords.splice(0, borrowRecords.length);
  updateBorrowingList();
  localStorage.clear();
}

// Press ENTER to add Data
borrowForm.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("save-button").click();
  }
});

// Event listener for form submission
borrowForm.addEventListener("submit", addBorrowing);

// On page load - Update borrowing list display
updateBorrowingList();