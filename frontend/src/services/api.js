const API = import.meta.env.VITE_API_URL;

export const getProducts = async (category) => {

  const res = await fetch(`${API}/products?category=${category}`);

  return res.json();
};

export const getFeaturedProducts = async () => {

  const res = await fetch(`${API}/products/featured`);

  return res.json();
};