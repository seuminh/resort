import { authConstant } from "./constants";

export const loginUser = async (dispatch, data) => {
  const { username, password } = data;
  const returnData = await fetch("http://10.0.2.2:5000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }, 
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());

  if (returnData.success) {
    dispatch({ type: authConstant.LOGIN, payload: returnData.data });
  }
};
