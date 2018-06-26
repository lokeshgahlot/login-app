import uuid from "uuid-v4";

// Read registered users from local storage
const LOCAL_STORAGE_KEY = "login-demo-app-users";
const TOKEN = "jwt-fake-token";

const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
const save = users => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    // Can't save users
  }
};

const originalFetch = window.fetch;
// Fake fetch
window.fetch = (url, options) => new Promise((resolve, reject) => {
  const {method, body, headers} = options;
  const randomTime = Math.floor(500 * Math.random());

  setTimeout( _  => {

    // register user
    if (url.endsWith("/users/register") && method === "POST") {
      const user = JSON.parse(body);
      if (users[user.email]) { // duplicate user
        return reject(`Email ${user.email} is already taken`);
      }
      user.id = uuid();
      users[user.email] = user;
      save(users);
      return resolve({ ok: true, json: () => Promise.resolve({}) });
    }

    // authenticate
    if (url.endsWith("/users/authenticate") && method === "POST") {
      const user = JSON.parse(body);
      if (users[user.email] && users[user.email].password ===  user.password) {
        return (
          resolve({ ok: true, json: () => Promise.resolve({
            ...users[user.email],
            token: TOKEN,
            password: undefined
          })})
        );
      }
      return reject("Username or password is incorrect");
    }

    // get user
    const regex = /\/user\/([A-Z0-9a-z-]+)$/;
    if (regex.test(url) && method === "GET") {
      const id = url.match(regex)[1];
      if (id && headers && headers.Authorization === TOKEN) {
        for (const user in users) {
          if (users[user].id === id ) {
            return resolve({ ok: true, json: () => Promise.resolve({
              ...users[user],
              token: TOKEN,
              password: undefined
            })});
          }
        }
      }
      return reject("User doesn't exist.");
    }

    //default 
    return originalFetch(url, options);
  }, randomTime);

});

export default window.fetch;