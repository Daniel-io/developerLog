import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/routes.js"

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


app.use('/api', routes);





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
