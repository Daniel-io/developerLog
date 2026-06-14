import { request } from './client.js'









export const getRows = async () => {

  const rows = await request('http://localhost:3000/get/rows');
  
  console.log(rows);

}

getRows();