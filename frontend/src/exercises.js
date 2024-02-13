import axios from "axios";
import { matchSorter } from "match-sorter";

const API_BASE_URL = "http://localhost:3000";

export async function createExercise(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/exercises`, data);
    return response.data ?? null;
  } catch (error) {
    console.error("Error creating exercise:", error);
    return null;
  }
}

export async function getExercises(query) {
  try {
    const response = await axios.get(`${API_BASE_URL}/exercises`);
    let exercises = response.data;
    if (query) {
      exercises = matchSorter(exercises, query, { keys: ["name"] });
    }
    return exercises;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
}

export async function getExercise(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/exercises/${id}`);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching exercise:", error);
    return null;
  }
}

export async function getExerciseName(name) {
  try {
    const response = await axios.get(`${API_BASE_URL}/exercises/name/${name}`);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching exercise:", error);
    return null;
  }
}

export async function updateExercise(id, data) {
  try {
    const response = await axios.put(`${API_BASE_URL}/exercises/${id}`, data);
    return response.data ?? null;
  } catch (error) {
    console.error("Error updating exercise:", error);
    return null;
  }
}

export async function deleteExercise(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/exercises/${id}`);
    return response.data ?? null;
  } catch (error) {
    console.error("Error deleting exercise:", error);
    return null;
  }
}
