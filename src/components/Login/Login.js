function login() {
  window.visualize.config({
    server: "http://localhost:8710/jasperserver-pro",
    auth: {
        name : "superuser",
        password: "superuser"
    }
  });
}

export { login };
