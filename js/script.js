"use strict";

// accordion

import { accordion } from "./accordion.js";

accordion();
// slider

import { slider } from "./slider.js";

slider();

// burger-bar

let burger = document.getElementById("burgerBar");
let menu = document.getElementById("menu");

burger.addEventListener("click", function () {
  burger.classList.toggle("isactive");
  menu.classList.toggle("isactive");
});

// registration

let registration = document.getElementById("log-in");
let registrationDiv = document.getElementById("form-container");

registration.addEventListener("click", function () {
  registrationDiv.classList.toggle("reg");
  if (!registration.classList.contains("reg")) {
    registration.innerText = "x";
    registration.classList.add("reg");
  } else {
    registration.innerText = "register ";
    registration.classList.remove("reg");
  }
});

// validation

const form = document.getElementById("login");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let errors = {};

  let username = document.getElementById("userfield").value;

  if (username === "") {
    errors.username = "Username field can not be empty";
  }

  let passw1 = document.getElementById("passwfield").value;
  let passw2 = document.getElementById("passw2field").value;

  if (passw1 === "") {
    errors.passw = "password field can not be empty";
  }

  if (passw1 != passw2) {
    errors.passw2 = "Passwords do not match";
  }

  let gender = false;
  this.querySelectorAll(".radio-gender").forEach((item) => {
    if (item.checked) {
      gender = true;
    }
  });

  if (!gender) {
    errors.gender = "Select your gender";
  }

  let agree = document.getElementById("checkagree").checked;
  if (!agree) {
    errors.agree = "You must agree our terms and conditions";
  }

  this.querySelectorAll(".error-text").forEach((el) => {
    el.innerHTML = " ";
  });

  for (let item in errors) {
    let errorElement = document.getElementById("error-" + item);

    if (errorElement) {
      errorElement.innerText = errors[item];
    }
  }

  if (Object.keys(errors).length === 0) {
    this.submit();
  }
});

let showPass = document.getElementById("show");
let passw = document.getElementById("passwfield");

showPass.addEventListener("click", function (e) {
  e.preventDefault();
  if (passw.type === "password") {
    passw.type = "text";
    showPass.textContent = "Hide";
  } else {
    passw.type = "password";
    showPass.textContent = "Show";
  }
});


// scroll to

function scrollToSection(sectionId) {
  const sectionElement = document.getElementById(sectionId);

  if (sectionElement) {
    const sectionOffset = sectionElement.offsetTop;

    window.scrollTo({
      top: sectionOffset,
      behavior: "smooth",
    });
  }
}

const navLinks = document.querySelectorAll(".atag");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const sectionId = link.getAttribute("href").slice(1);
    scrollToSection(sectionId);

    let menu = document.getElementById("menu");
    menu.classList.toggle("isactive");
    let burger = document.getElementById("burgerBar");
    burger.classList.toggle("isactive");

    let filterInput = document.getElementById("search");
    filterInput.value = "";

    const resultList = document.getElementById("list");
    const listItems = resultList.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      listItem.style.display = "block";
    }
  });
});

// filter

let filterInput = document.getElementById("search");

filterInput.addEventListener("keyup", function () {
  const resultList = document.getElementById("list");
  const filterValue = filterInput.value.toLowerCase().trim();

  const listItems = resultList.getElementsByTagName("li");

  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    const itemText = listItem.textContent.toLowerCase().trim();
    if (itemText.startsWith(filterValue)) {
      listItem.style.display = "block";
    } else {
      listItem.style.display = "none";
    }
  }
});

// regax;

import { passwordMatch } from "./regax.js";

passwordMatch();

//  fetch

function getUsers() {
  fetch(
    "https://bikeindex.org/api/v3/search?page=1&per_page=25&location=IP&distance=10&stolenness=stolen",
    {
      method: "GET",
    }
  )
    .then(function (item) {
      if (!item.ok) {
        throw "Server Error";
      }
      return item.json();
    })
    .then(function (response) {
      console.log(response);
      const containers = document.querySelectorAll(".manufacturer-container"); // Assuming container class

      for (let i = 0; i < containers.length && i < response.bikes.length; i++) {
        const currentContainer = containers[i];

        const manufacturerPara = document.createElement("p");
        manufacturerPara.textContent = `Manufacturer: ${response.bikes[i].manufacturer_name}`;

        const frameModelPara = document.createElement("p");
        frameModelPara.textContent = `Frame Model: ${response.bikes[i].frame_model}`;

        currentContainer.appendChild(manufacturerPara);
        currentContainer.appendChild(frameModelPara);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

getUsers();

// cookies

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  let usernameInfo = document.getElementById("userfield").value;
  let checkbox = document.getElementById("checkagree"); // Use consistent element name

  // Logic for saving username based on checkbox
  if (checkbox.checked) {
    Cookies.set("usernamesaved", usernameInfo);
  } else {
    Cookies.remove("usernamesaved");
  }

  // Handle form submission logic here (e.g., send data to server)
  // You can implement logic to send username (and potentially a hashed password) securely to your server for registration
});

document.addEventListener("DOMContentLoaded", function () {
  let savedUsername = Cookies.get("usernamesaved");

  if (savedUsername) {
    document.getElementById("userfield").value = savedUsername;
    let checkbox = document.getElementById("checkagree"); // Check if checkbox exists before accessing its checked property
    if (checkbox) {
      checkbox.checked = true;
    }
  }

  let cookiesNotification = document.getElementById("cookies");
  let acceptBtn = document.getElementById("accept");
  let declineBtn = document.getElementById("decline");

  // Attach event listeners to buttons (corrected)
  acceptBtn.addEventListener("click", function () {
    cookiesNotification.classList.add("hidden");
  });

  declineBtn.addEventListener("click", function () {
    cookiesNotification.classList.add("hidden");
  });
});
