







export const request = async (url, options = {}) => {

  const response = await fetch(url, options);

  if(!response.ok) {
    throw new Error(`Failed to fetch URL - ${url}`);
  }

  return response.json();

}