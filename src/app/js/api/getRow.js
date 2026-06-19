import { request } from './client.js'










export const getRows = async () => {
  const test = await request('http://localhost:3000/api/get/rows');

  console.log(test);
}

getRows();