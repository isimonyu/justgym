import axios from "axios";
import { matchSorter } from "match-sorter";

const API_BASE_URL = "http://localhost:3000";

export async function getEquipments(query) {
  try {
    const response = await axios.get(`${API_BASE_URL}/equipments`);
    let equipments = response.data;
    if (query) {
      equipments = matchSorter(equipments, query, { keys: ["name"] });
    }
    return equipments;
  } catch (error) {
    console.error("Error fetching equipments:", error);
    return [];
  }
}

export async function getEquipment(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/equipments/${id}`);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return null;
  }
}
