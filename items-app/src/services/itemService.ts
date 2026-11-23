import axios from "axios";
import type { Item } from "../types/Item";
 
export type ItemService = {
  getAll: () => Promise<Item[]>;
  get: (id: string) => Promise<Item>;
  put: (item: Item) => Promise<Item>;
  delete: (id: string) => Promise<void>;
};
 
const DEFAULT_BASE_URL =
  "https://3m547weewl.execute-api.us-east-1.amazonaws.com";
 
const createItemService = (
  baseURL: string = DEFAULT_BASE_URL
): ItemService => {
  const client = axios.create({ baseURL });
 
  const getAll = async (): Promise<Item[]> => {
    try {
      const response = await client.get<Item[]>("/items");
      return response.data;
    } catch (error) {
      console.error("Error fetching items", error);
      throw error;
    }
  };
 
  const get = async (id: string): Promise<Item> => {
    try {
      const response = await client.get<Item>(`/items/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item with id ${id}`, error);
      throw error;
    }
  };
 
  const put = async (item: Item): Promise<Item> => {
    try {
      const response = await client.put<Item>("/items", item);
      return response.data;
    } catch (error) {
      console.error("Error saving item", error);
      throw error;
    }
  };
 
  const remove = async (id: string): Promise<void> => {
    try {
      await client.delete<void>(`/items/${id}`);
    } catch (error) {
      console.error(`Error deleting item with id ${id}`, error);
      throw error;
    }
  };
 
  return { getAll, get, put, delete: remove };
};
 
const itemService = createItemService();
export default itemService;
