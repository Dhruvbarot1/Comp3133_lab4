const mongoose = require("mongoose");
const User = require("../models/User");
const fs = require("fs");
require("dotenv").config();

// Ensure the correct path for UsersData.json
const filePath = "./data/UsersData.json"; // Ensure the correct path


mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/lab4_users_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

const importData = async () => {
    try {
        // Check if file exists before reading
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        // Read and parse the JSON file
        const jsonData = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(jsonData);

        // Insert data into MongoDB
        await User.insertMany(data);
        console.log("✅ Data Imported Successfully");

        // Close MongoDB connection
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error Importing Data:", error.message);
        mongoose.connection.close();
    }
};

// Run import function
importData();
