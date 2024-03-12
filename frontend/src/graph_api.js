import axios from "axios";

export async function getUrl(data, options) {
  try {
    const response = await axios.post(`http://localhost:5500/data`, {
      data: data,
      options: options,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching graph:", error);
    return [];
  }
}
