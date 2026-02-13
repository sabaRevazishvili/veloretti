"use strict"

export function passwordMatch() {
  let passwordInputOne = document.getElementById("passwfield");

  function check() {
    let contain = document.getElementById("contain1");
    let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let passwordValue = passwordInputOne.value;

    if (!passwordPattern.test(passwordValue)) {
      contain.textContent = "Your password is weak";
    } else {
      contain.textContent = "Your password is strong";
    }
  }

  passwordInputOne.addEventListener("keyup", check);
}