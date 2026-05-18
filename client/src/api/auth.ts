import axios from "./axios";

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await axios.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return response.data;
};

export const registerUser =
  async (
    name: string,
    email: string,
    password: string
  ) => {
    const response = await axios.post(
      "/auth/register",
      {
        name,
        email,
        password,
      }
    );

    return response.data;
  };