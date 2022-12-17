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
        <button type="submit" disabled class="mui-btn mui-btn--primary mui-btn--raised">Log in</button>
    </form>
    `;
}
