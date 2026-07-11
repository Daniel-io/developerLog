import { request } from './client.js'





export const postRows = async (payload) => {


  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  };

  const response = await request('http://localhost:3000/api/post/rows', options);
  console.log(response)
}

