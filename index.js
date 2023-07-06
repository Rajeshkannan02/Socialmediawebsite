import Fetch from "./utils/fetchLogin.js";

const login = document.querySelector(".login");
const signup = document.querySelector(".signup");
var loginForm = document.querySelector("#logform");
var signupForm = document.querySelector(".sign");
const url = "http://192.168.191.5:5000";
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); //autosubmission suppress
  const inputs = loginForm.elements;

  const userInfo = {
    email: inputs["curremail"].value,
    password: inputs["password"].value,
  };

  let d = Fetch(url, "/login", userInfo);
  d.then((data) => {
    console.log(data["token"]);
    localStorage.setItem("token", data["token"]);
    localStorage.setItem("name", data["name"]);
    if (data["status"] == "Success") {
      //add login successful
      alert("login successful");
      window.location.href = "/home.html";
    } else {
      //no user exists
      document.querySelector(".error").classList.remove("disable");
      document.querySelector(".error").innerHTML = data["status"];
    }
  });
});
login.addEventListener("click", () => {
  login.classList.remove("ac");
  signup.classList.add("ac");

  loginForm.classList.remove("disable");
  signupForm.classList.add("disable");
});
signup.addEventListener("click", () => {
  signup.classList.remove("ac");
  login.classList.add("ac");
  loginForm.classList.add("disable");
  signupForm.classList.remove("disable");
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault(); //autosubmission suppress
    const inputs = signupForm.elements;
    const userINfo = {
      name: inputs["newusername"].value,
      password: inputs["newpassword"].value,
      email: inputs["email"].value,
    };
    let d = Fetch(url, "/signup", userINfo);
    d.then((data) => {
      if (data["status"] == "Success") {
        alert("Signup is successful Please login");
        window.location.href = "/index.html";
      }
      console.log(data);
    });
  });
});
