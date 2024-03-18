import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export async function getBPbyExerciseId(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/ebp/exercises/${id}`);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return null;
  }
}

export async function getEBPid(equipment_id, bp_id) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ebpid/${equipment_id}/${bp_id}`
    );
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return null;
  }
}

export async function createEbp(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/ebp`, data);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return null;
  }
}

export async function deleteEBPid(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/ebp/${id}`);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return null;
  }
}
