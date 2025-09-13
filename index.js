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
const brokenUsers = [
  { id: 3, name: "Pricess Leia" }, //missing age
  { id: 5, name: "Yoda" }, //missing age
  { id: 6, name: "", age: 32 }, //missing name
  { id: 4 }
];

// 1. Print out the names of each character in the console, then render them in the HTML list with id "names-list"
function renderNames() {
  const list = document.getElementById("names-list");
  list.innerHTML = "";
  users.forEach(user => {
    if (!user.name || user.name.trim() === "") {
      console.warn(`User with id ${user.id} missing name - skipping`);
      return;
    }
    console.log(user.name);
    const li = document.createElement("li");
    li.textContent = user.name;
    list.appendChild(li);
  });
}

// 2. Print out the names of characters whose age is less than 40 in the console, then render them in the HTML list with id "young-characters-list"
function youngCharacters() {
  const list = document.getElementById("young-characters-list");
  list.innerHTML = "";
  users.filter(user => user.age < 40).forEach(user => {
    if (!user.name || user.name.trim() === "") {
      console.warn(`User with id ${user.id} missing name - skipping`);
      return;
    }
    console.log(user.name);
    const li = document.createElement("li");
    li.textContent = user.name;
    list.appendChild(li);
  });
}

// 3. Create a reusable function that takes any array and uses logic to render a list of character names in the HTML. Use this function to populate the list with id "function-list"
function renderCharacterList(array, containerId) {
  const list = document.getElementById(containerId);
  list.innerHTML = "";
  array.forEach(user => {
    if (!user.name || user.name.trim() === "") {
      console.warn(`User with id ${user.id} missing name - skipping`);
      return;
    }
    console.log(user.name);
    const li = document.createElement("li");
    li.textContent = user.name;
    list.appendChild(li);
  });
}

// 4. Create a function that takes an array and an age threshold parameter. The function should only display characters whose age is below the given number. Render results in the list with id "age-filter-list"
function renderByAge(array, threshold, containerId) {
  const list = document.getElementById(containerId);
  list.innerHTML = "";
  if (isNaN(threshold) || threshold <= 0) {
    alert("Please enter a valid positive number for age threshold.");
    return;
  }
  array.filter(user => user.age < threshold).forEach(user => {
    if (!user.name || user.name.trim() === "") {
      console.warn(`User with id ${user.id} missing name - skipping`);
      return;
    }
    console.log(user.name);
    const li = document.createElement("li");
    li.textContent = user.name;
    list.appendChild(li);
  });
}

// 5. Add error handling to your functions that will log an error message using console.error() if any object doesn't have a "name" property. Display any error messages in the div with id "error-messages"
// Generic error handling function
function handleErrors(array, containerId) {
  const div = document.getElementById(containerId);
  if (!div) return;

  div.innerHTML = ""; // clears out the previous errors

  array.forEach(user => {
    let errors = [];

    if (!user.name || user.name.trim() === "") errors.push("missing name"); //checks for broken names (missing or empty)

    if (typeof user.age === "undefined" || isNaN(user.age)) errors.push("missing or invalid age"); //checks for broken ages (missing or not a number)

    if (errors.length > 0) {
      showError(`User with id ${user.id} has errors: ${errors.join(", ")}`, containerId);
    }
  });
}

// display error messages in the page
function showError(message, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const p = document.createElement("p");
  p.textContent = message;
  p.classList.add("error-message");
  container.appendChild(p);

  console.error(message);  // logs to console as well
}

function testUsersForErrors() {
  const list = document.getElementById("error-handling-list");
  if (!list) return;
  list.innerHTML = "";

  // handle the errors first
  handleErrors(users, "error-messages");

  // then render valid users afterwards
  users.forEach(user => {
    if (user.name && user.name.trim() !== "" &&
      typeof user.age !== "undefined" && !isNaN(user.age)) {
      const li = document.createElement("li");
      li.textContent = user.name;
      list.appendChild(li);
    }
  });
}

// 6. Test your error handling by creating a second array that's intentionally broken (missing name properties) and passing it to your functions. Verify that your error handling works correctly and displays errors in the div with id "broken-array-errors"
function testBrokenUsers() {
  const brokenList = document.getElementById("broken-array-list");
  if (!brokenList) return;
  brokenList.innerHTML = "";

  handleErrors(brokenUsers, "broken-array-errors");

  brokenUsers.forEach(user => {
    if (user.name && user.name.trim() !== "" &&
      typeof user.age !== "undefined" && !isNaN(user.age)) {
      const li = document.createElement("li");
      li.textContent = user.name;
      brokenList.appendChild(li);
    }
  });
}

// runs both exercises
document.addEventListener("DOMContentLoaded", () => {
  renderNames();
  youngCharacters();
  renderCharacterList(users, "function-list");

  testUsersForErrors();   // for exercise 5
  testBrokenUsers();      // for excercise 6

  const btn = document.getElementById("age-submit");
  if (btn) {
    btn.addEventListener("click", () => {
      const input = document.getElementById("age-threshold");
      const threshold = parseInt(input.value);
      renderByAge(users, threshold, "age-filter-list");
    });
  }
  btn.addEventListener("click", () => {
    const input = document.getElementById("age-threshold");
    const threshold = parseInt(input.value);
    renderByAge(users, threshold, "age-filter-list");
  });
});