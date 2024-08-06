import { FetchProductsResponse, Product } from "@/types";


// paramsaar heden limit, skiptei mon hereglegchees irsen input medeelliin daguu tohirson baraag avah function
const fetchProducts = async (skip = 0, limit = 20, searchQuery: string = ''): Promise<FetchProductsResponse> => {
  try {
    const encodedSearchQuery = encodeURIComponent(searchQuery);
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${encodedSearchQuery}&limit=${limit}&skip=${skip}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");

    }
    const data: FetchProductsResponse = await response.json();
    // console.log(data)
    return data
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


  

export default fetchProducts
