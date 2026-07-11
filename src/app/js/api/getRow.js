import { request } from './client.js'










export const getRows = async () => {
  const rows = await request('http://localhost:3000/api/get/rows');

  console.log(rows);
}

getRows();


export const postRows = async () => {
  const payload = {
    values: {
      question: 'Question Four',
      answer: 'Answer Four'
    }
  };

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

postRows();