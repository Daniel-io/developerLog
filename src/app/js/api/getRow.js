import { request } from './client.js'










export const getRows = async () => {
  const rows = await request('http://localhost:3000/api/get/rows');

  console.log(rows[0].values.tag);
}

getRows();

