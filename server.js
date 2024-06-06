const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const usersFilePath = path.join(__dirname, "data", "users.json");

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Helper function to read users.json
const readUsersFile = () => {
  const usersData = fs.readFileSync(usersFilePath);
  return JSON.parse(usersData);
};

// Helper function to write to users.json
const writeUsersFile = (data) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
};

// Serve the HTML files
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "user.html")));
app.get("/signup.html", (req, res) =>
  res.sendFile(path.join(__dirname, "signup.html"))
);
app.get("/login.html", (req, res) =>
  res.sendFile(path.join(__dirname, "user.html"))
);

// API endpoint for login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsersFile();

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// API endpoint for signup
app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;
  const users = readUsersFile();

  if (users.find((user) => user.email === email)) {
    res.status(409).json({ message: "Email already exists" });
  } else {
    users.push({ email, password });
    writeUsersFile(users);
    res.status(201).json({ message: "Signup successful" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
