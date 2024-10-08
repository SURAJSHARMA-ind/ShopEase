
export const fetchApi = async () => {
  const url = "http://localhost:3000/products";
  try {
    const res = await fetch(url);
    if (res.status!=200) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data
  } catch (error) {
    console.log(error);
  }
};


