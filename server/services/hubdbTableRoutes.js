import dotenv from "dotenv";

dotenv.config();


export const getTableRows = async () => {
  
const token = process.env.TOKEN;
const tableID = 323606951;
const url = `https://api.hubapi.com/cms/hubdb/2026-03/tables/${tableID}/rows`
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await fetch(url, options);

  if(!response.ok) {
    throw new Error('Failed to fetch rows');
  }

  const data = await response.json();
  console.log(data);
  return data.results
}

 


export const postTableRows = async (payload = {}) => {

  const token = process.env.TOKEN;
  if (!token) {
    throw new Error('Missing HUBSPOT_TOKEN in environment');
  }

  const tableID =  323606951;
  const url = `https://api.hubapi.com/cms/hubdb/2026-03/tables/${tableID}/rows`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to post rows: ${response.status} ${text}`);
  }

  const data = await response.json();
  return { success: true, data, payload };
}