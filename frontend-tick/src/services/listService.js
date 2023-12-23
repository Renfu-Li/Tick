import axios from "axios";

const baseURL = "http://localhost:3003/api/lists";

const generateConfig = (token) => {
  return {
    headers: {
      authorization: `bearer ${token}`,
    },
  };
};

const getAllList = async (token) => {
  const response = await axios.get(baseURL, generateConfig(token));
  return response.data;
};

// return all lists
const createList = async (token, listName) => {
  const response = await axios.post(
    baseURL,
    { listName },
    generateConfig(token)
  );
  return response.data;
};

// delete a list and return all lists
const deleteList = async (token, listId, listName) => {
  const response = await axios.post(
    `${baseURL}/${listId}`,
    { listName },
    generateConfig(token)
  );

  return response.data;
};

export default { getAllList, createList, deleteList };
