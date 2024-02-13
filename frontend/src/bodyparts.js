import axios from "axios";
import { matchSorter } from "match-sorter";

const API_BASE_URL = "http://localhost:3000";

export async function getBodyParts(query) {
  try {
    const response = await axios.get(`${API_BASE_URL}/bodyparts`);
    let bp = response.data;
    if (query) {
      bp = matchSorter(bp, query, { keys: ["name"] });
    }
    return bp;
  } catch (error) {
    console.error("Error fetching body parts:", error);
    return [];
  }
}

export async function getBodyPart(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/bodyparts/${id}`);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching body part:", error);
    return null;
  }
}
