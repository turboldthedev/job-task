import {  Product } from "@/types";

// paramsaar id-g n avaad neg baraanii medeelel avah action function
const fetchProduct = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data: Product = await response.json();
    console.log('Product details:', data)

    return data
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default fetchProduct;
