import express from "express";
import { getTableRows } from "../services/hubdbTableRoutes.js";



const router = express.Router();




router.get('/get/rows', async (req, res) => {

  try {

    const rows = await getTableRows();
    res.json(rows);

  } catch(err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }

})





export default router;