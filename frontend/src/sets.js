import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export async function createSet(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/sets`, data);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching sets by exerciseID:", error);
    return null;
  }
}

export async function updateSet(setID, data) {
  try {
    const response = await axios.put(`${API_BASE_URL}/sets/${setID}`, data);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching sets by exerciseID:", error);
    return null;
  }
}

export async function getSets(query) {
  try {
    const response = await axios.get(`${API_BASE_URL}/sets`);
    let exercises = response.data;
    if (query) {
      exercises = matchSorter(exercises, query, { keys: ["name"] });
    }
    return exercises;
  } catch (error) {
    console.error("Error fetching sets:", error);
    return [];
  }
}

export async function getSetsByExerciseID(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/sets/exercise/${id}`);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching sets by exerciseID:", error);
    return null;
  }
}

export async function getSetByID(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/sets/${id}`);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching sets by exerciseID:", error);
    return null;
  }
}

export async function getTotalByExerciseID(id) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/sets/total/exercise/${id}`
    );
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching total reps and weight by exerciseID:", error);
    return null;
  }
}

export async function getAvgByExerciseID(id) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/sets/average/exercise/${id}`
    );
    return response.data ?? null;
  } catch (error) {
    console.error(
      "Error fetching average reps and weight by exerciseID:",
      error
    );
    return null;
  }
}

export async function getTotalToday() {
  try {
    const response = await axios.get(`${API_BASE_URL}/sets/total/today`);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching total sets and weight for today:", error);
    return null;
  }
}

export async function getTotalLastDays() {
  try {
    const response = await axios.get(`${API_BASE_URL}/sets/total/days`);
    return response.data ?? null;
  } catch (error) {
    console.error(
      "Error fetching total sets and weight for last 7 days:",
      error
    );
    return null;
  }
}

export async function getTotalWeightLastDays() {
  try {
    const response = await axios.get(`${API_BASE_URL}/sets/total/weight/days`);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching total weight for last 7 days:", error);
    return null;
  }
}

export async function deleteSetid(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/sets/${id}`);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching sets by exerciseID:", error);
    return null;
  }
}
