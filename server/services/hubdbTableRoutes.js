



export const getTableRows = async () => {
  
const token = process.env.TOKEN;
const tableID = 323606951;
const url = `https://api.hubapi.com/cms/hubdb/2026-03/tables/${tableID}/rows`
  const options = {
    methods: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await fetch(url, options);

  if(!response.ok) {
    throw new Error('Failed to fetch rows');
  }

  const data = await response.json();
  console.log(data)
  return data.results
}

