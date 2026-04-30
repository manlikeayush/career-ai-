const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE (no AI yet)
app.post("/chat", (req, res) => {
    console.log("Message received:", req.body.message);
    res.json({ reply: "Backend is working!" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});