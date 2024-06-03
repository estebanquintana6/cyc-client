import axios from "axios";

const authFetch = async (url, method, token, params = undefined, contentType = "application/json") => {
  const response = await axios({
    url,
    method,
    headers: {
      Authorization: token,
      "Content-Type": contentType
    },
    data: params
  });

  return response;
};

export default authFetch;
