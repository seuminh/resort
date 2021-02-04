import { authConstant } from "./actionsTypes";

export const initialState = {
  token: "",
  user: "",
  expirationToken: "",
};

export const AuthReducer = (initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case authConstant.LOGIN_SUCCESS:
      return {
        token: payload.token,
        user: payload.user,
        expirationToken: payload.expireDate,
      };
    case authConstant.LOGIN_FAIL:
      console.log("hi");
      return {
        ...initialState,
        token: "",
        user: "",
        expirationToken: "",
      };
    default:
      initialState;
  }
};
