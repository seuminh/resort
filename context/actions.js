import { authConstant } from "./constants";

export const loginUser = async (dispatch, data) => {
  const { username, password } = data;
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());
  console.log(res);
  if (res.success) {
    dispatch({ type: authConstant.LOGIN, payload: res.data });
  }
};
