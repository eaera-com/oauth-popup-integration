document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const oauthBtn = document.getElementById("oauthLogin");

  loginForm.addEventListener("submit", handleNormalLogin);
  oauthBtn.addEventListener("click", handleOauthLogin);
  window.addEventListener("message", handleEaeraMessage);
});

function handleNormalLogin(e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if (email && password) {
    alert("Login successful!");
  } else {
    alert("Please check your email and password.");
  }
}

function handleOauthLogin() {
  const url = "http://localhost:3000/user-auth/login?isEmbedded&Oauth&parent_origin=" + window.location.hostname;
  window.open(url, "oauthPopup", "width=425,height=700");
}

function handleEaeraMessage(event) {
  if (event.origin !== "http://localhost:3000") return;
  const { user, access_token } = event.data?.data || {};
  if (user && access_token) {
    alert(`Login successful!`);
    console.log("User:", user);
    console.log("Token:", access_token);
  } else {
    alert("Login failed or cancelled.");
  }
}
