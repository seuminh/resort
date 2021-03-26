import { authConstant } from "./actionsTypes";

export const initialState = {
   token: "",
   user: "",
   expirationToken: "",
   loading: false,
};

export const AuthReducer = (initialState, action) => {
   const { type, payload } = action;
   switch (type) {
      case authConstant.REQUEST_LOGIN:
         return {
            ...initialState,
            loading: true,
         };
      case authConstant.LOGIN_SUCCESS:
         return {
            token: payload.token,
            user: payload.user,
            expirationToken: payload.expireDate,
            loading: false,
         };
      case authConstant.LOGIN_FAIL:
         return {
            ...initialState,
            token: "",
            user: "",
            expirationToken: "",
            loading: false,
         };
      default:
         initialState;
   }
};
