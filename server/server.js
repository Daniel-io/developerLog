import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// Creates your Express app instance
const app = express();

// Enable CORS for frontend (Webpack dev server)
app.use(cors({ origin: "http://localhost:9000" }));

// This line enables JSON body parsing for incoming requests.
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Sanity check
app.get("/", (req, res) => {
  res.json({
    message: 'Server is running'
  })
});



//Get rows
app.get("/get/rows", async (req, res) => {

  try {
    const token = process.env.TOKEN;
    const tableID = process.env.TABLE_ID;

    const url = `https://api.hubapi.com/cms/hubdb/2026-03/tables/${tableID}/rows`;

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error('Failed to fetch rows from hubspot');
    }

    const data = await response.json();

    res.json(data);   // ✅ THIS is what was missing

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
