import { IUser } from "src/@types/user";

export const setLoggedUser = (user: IUser | null) => {
  if (user) {
    try {
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch (e) {}
  } else {
    localStorage.removeItem("loggedUser");
  }
};
