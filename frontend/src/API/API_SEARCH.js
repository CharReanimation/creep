import axios from "axios";

const API_CONFIG = {
  // URL: ECOM
  API_SEARCH_ECOM: "/ecom/search",
};

// Search Ecom
export async function searchEcom(q) {
  console.log("🔍 Request URL: ", API_CONFIG.API_SEARCH_ECOM);
  const payload = { q };
  const { data } = await axios.post(
    API_CONFIG.API_SEARCH_ECOM,
    payload,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return data;
}
