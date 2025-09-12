"use strict";

// sample data - expanded Star Wars characters with varied ages
const users = [
  { id: 1, name: "Luke Skywalker", age: 23 },
  { id: 2, name: "Darth Vader", age: 45 },
  { id: 3, name: "Princess Leia", age: 23 },
  { id: 4, name: "Obi-Wan Kenobi", age: 57 },
  { id: 5, name: "Yoda", age: 900 },
  { id: 6, name: "Han Solo", age: 32 },
  { id: 7, name: "Chewbacca", age: 234 },
  { id: 8, name: "R2-D2", age: 33 },
  { id: 9, name: "C-3PO", age: 112 },
  { id: 10, name: "Padmé Amidala", age: 27 },
];

// broken test data for exercise 6

// 1. Print out the names of each character in the console, then render them in the HTML list with id "names-list"
function renderNames() {
  const list = document.getElementById("names-list");

  //loops through each users
  users.forEach(user => {
    console.log(user.name);
    const li = document.createElement("li");
    li.textContent = user.name;
    list.appendChild(li);

  });
}
// 2. Print out the names of characters whose age is less than 40 in the console, then render them in the HTML list with id "young-characters-list"
function youngCharacters() {
  const ul = document.getElementById("young-characters-list"); // find list

  users.filter(user => user.age < 40).forEach(user => {        // filter for under 40 and then loop
    if (!user.name) {
      showError(`User with id ${user.id} is missing name`, "error-messages");
      return;
    }
    console.log(user.name);
    const li = document.createElement("li");    // creates list item
    li.textContent = user.name;                 // put name inside
    ul.appendChild(li);                          // attach to list
  });
}

// 3. Create a reusable function that takes any array and uses logic to render a list of character names in the HTML. Use this function to populate the list with id "function-list"
function renderCharacterList(array, containerId, errorContainerId = "error-messages") {
  const ul = document.getElementById(containerId); // find target list
  array.forEach(user => {
    if (!user.name) {
      showError(`User with id ${user.id} missing name`, errorContainerId);
      return;
    }
    console.log(user.name);
    const li = document.createElement("li");  // create list item
    li.textContent = user.name;               // puts the name inside
    ul.appendChild(li);                        // attaches to list
  });
}

// 4. Create a function that takes an array and an age threshold parameter. The function should only display characters whose age is below the given number. Render results in the list with id "age-filter-list"
function renderByAge(characters, ageThreshold, listId) {
  const list = document.getElementById(listId);
  if (!list) return;

  list.innerHTML = ''; // clear previous results

  characters
    .filter(character => character.age < ageThreshold)
    .forEach(character => {
      const li = document.createElement('li');
      li.textContent = character.name;
      list.appendChild(li);
    });
}

// Add event listener to button
document.getElementById("age-submit").addEventListener("click", () => {
  const input = document.getElementById("age-input").value;
  const ageThreshold = parseInt(input, 10);

  if (!isNaN(ageThreshold)) {
    renderByAge(users, ageThreshold, "age-filter-list");
  } else {
    alert("Please enter a valid number!");
  }
});

// 5. Add error handling to your functions that will log an error message using console.error() if any object doesn't have a "name" property. Display any error messages in the div with id "error-messages"

// 6. Test your error handling by creating a second array that's intentionally broken (missing name properties) and passing it to your functions. Verify that your error handling works correctly and displays errors in the div with id "broken-array-errors