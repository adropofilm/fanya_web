type Task = {
  task: {
    status: string;
    id: number;
  };
};

export const sendRequestToApi = async (
  axiosRequest: any,
  expectedStatus: number,
  url = "",
  body: Task | null = null
) => {
  return await axiosRequest(
    `${process.env.REACT_APP_API_HOST}/tasks${url}`,
    body
  ).then((response: any) => {
    if (response.status === expectedStatus) return response.data;
    else throw new Error(`HTTP response: ${response.status}`);
  });
};

export const tryApiRequestCatchError = async (
  getAllTasks: () => Promise<void>,
  axiosRequest: any,
  expectedStatus: number,
  url = "",
  body: any = null
) => {
  try {
    await sendRequestToApi(axiosRequest, expectedStatus, url, body);
    getAllTasks();
  } catch (error) {
    console.log(`Error occured ${error}`);
  }
};
