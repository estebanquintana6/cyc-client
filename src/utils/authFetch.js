import axios from "axios";

const authFetch = async (url, method, token, params = undefined) => {
  const response = await axios({
    url,
    method,
    headers: {
      Authorization: token,
    },
    data: params
  });

  return response;
};

export default authFetch;
