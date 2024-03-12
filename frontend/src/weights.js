import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export async function getWeights() {
  try {
    const response = await axios.get(`${API_BASE_URL}/dailyweights/users/1`);
    let weights = response.data;
    return weights;
  } catch (error) {
    console.error("Error fetching weights:", error);
    return [];
  }
}

export async function getWeight(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/dailyweights/${id}`);
    let weight = response.data;
    return weight;
  } catch (error) {
    console.error("Error fetching weight:", error);
    return [];
  }
}

export async function createWeight(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/dailyweights`, data);
    return response.data ?? null;
  } catch (error) {
    console.error("Error creating weight:", error);
    return null;
  }
}

export async function editWeight(data) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/dailyweights/${data.weight_id}`,
      data
    );
    return response.data ?? null;
  } catch (error) {
    console.error("Error creating weight:", error);
    return null;
  }
}

export async function deleteWeight(weight_id) {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/dailyweights/${weight_id}`
    );
    return response.data ?? null;
  } catch (error) {
    console.error("Error creating weight:", error);
    return null;
  }
}

export async function getAvgWeightsByWeek() {
  try {
    const response = await axios.get(`${API_BASE_URL}/dailyweights/avg/week`);
    let weights = response.data;
    return weights;
  } catch (error) {
    console.error("Error fetching average weights by week:", error);
    return [];
  }
}

export async function getAvgWeightsByMonth() {
  try {
    const response = await axios.get(`${API_BASE_URL}/dailyweights/avg/month`);
    let weights = response.data;
    return weights;
  } catch (error) {
    console.error("Error fetching average weights by month:", error);
    return [];
  }
}

export async function getLastXDays() {
  try {
    const response = await axios.get(`${API_BASE_URL}/dailyweights/avg/day`);
    let weights = response.data;
    return weights;
  } catch (error) {
    console.error("Error fetching average weights for last 7 days:", error);
    return [];
  }
}
