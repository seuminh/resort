import { authConstant } from "./constants";

export const initialState = {
  token: "",
  user: "",
  expirationToken: "",
};

export const AuthReducer = (initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case authConstant.LOGIN:
      return {
        token: payload.token,
        user: payload.user,
        expirationToken: payload.expireDate,
      };
    default:
      initialState;
  }
};
