const button = document.getElementById("btn");
button.addEventListener("click", function () {
  const userInput = document.getElementById("user-input");
  const inputText = userInput.value;
  const inputPass = document.getElementById("input-pass");
  const passWord = inputPass.value;

  if (inputText == "admin" && passWord == "admin123") {
    alert("login is succesful");
    window.location.assign("index.html");
  } else {
    alert("please try again");
    return;
  }
});
