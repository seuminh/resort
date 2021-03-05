import { authConstant } from "./actionsTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = async (dispatch, data) => {
  const { username, password } = data;
  const returnData = await fetch(
    "http://resort-api.herokuapp.com/api/v1/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  ).then((res) => res.json());

  if (returnData.success) {
    const { user, token, expireDate } = returnData.data;

    const userPair = ["user", JSON.stringify(user)];
    const tokenPair = ["token", token];
    const expirationTokenPair = ["expirationToken", expireDate];
    await AsyncStorage.multiSet([userPair, tokenPair, expirationTokenPair]);
    dispatch({ type: authConstant.LOGIN_SUCCESS, payload: returnData.data });
  }
};

export const logout = async (dispatch) => {
  await AsyncStorage.clear();
  dispatch({ type: authConstant.LOGIN_FAIL });
};
