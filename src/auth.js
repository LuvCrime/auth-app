export function getAuthForm() {
  return `
    <form class="mui-form" id="auth-form">
        <div class="mui-textfield mui-textfield--float-label">
            <input type="email" id="email"  >
            <label for="email">email</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
        <input type="password" id="password"  >
        <label for="password">password</label>
    </div>
        <button type="submit" class="mui-btn mui-btn--primary mui-btn--raised">Log in</button>
    </form>
    `;
}

export function authWithEmailAndPassword(email, password) {
  const key = "AIzaSyB-QXpPaw2FpK_KuojRsPlbk8m9B6zJxDk";

  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.idToken);
}
