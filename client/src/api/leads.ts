import API from "./axios";

export const createLead = async (
  data: any,
  token: string
) => {
  const response = await API.post(
    "/leads",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getLeads = async (
  token: string
) => {
  const response = await API.get(
    "/leads",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getLeadStats =
  async (token: string) => {
    const response = await API.get(
      "/leads/stats",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

export const deleteLead = async (
  id: string,
  token: string
) => {
  const response = await API.delete(
    `/leads/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateLeadStatus =
  async (
    id: string,
    status: string,
    token: string
  ) => {
    const response = await API.put(
      `/leads/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };