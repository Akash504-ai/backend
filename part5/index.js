import express from "express";
import mongoose from "mongoose";
import User from "./models/user.model.js";

const app = express();
const port = 8000;

// ✅ Replace with your real MongoDB connection string
const mongoURL =
  "mongodb+srv://santraakash999_db_user:akash999@cluster0.or0caj9.mongodb.net/VirtualCode";

app.use(express.json());

// ✅ Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1); // stop server if DB fails
  }
};

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// CREATE
app.post("/create", async (req, res) => {
  try {
    const { name, age, email, userName } = req.body;
    const user = await User.create({ name, age, email, userName });
    return res.status(201).json({ message: "User created", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// READ ALL
app.get("/read", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// READ ONE
app.get("/read/:userName", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// UPDATE
app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted", user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// ✅ Start Server only after DB connection
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
};

startServer();
