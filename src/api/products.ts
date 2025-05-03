import { Product } from "@/components/ProductCard";

const API_BASE_URL = "http://127.0.0.1:2030";

/**
 * Fetch all products from the API.
 */
export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  const data = await response.json();
  return data.products || [];
}
