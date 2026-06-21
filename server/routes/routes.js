import express from "express";
import { getTableRows, postTableRows } from "../services/hubdbTableRoutes.js";



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


router.post('/post/rows', async (req, res) => {

  try {
    // console.log('REQUEST', req.method, req.headers, req.body);
    console.log('REQUEST: METHOD', req.method);
    console.log('REQUEST: HEADERS', req.headers);
    console.log('REQUEST: BODY',  req.body);

    const response = await postTableRows(req.body);
    console.log(response);
    res.json(response)

  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message  });
  }

})


export default router;