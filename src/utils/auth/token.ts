export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("userId");
};

export const setTokenToLocalStorage = (token: number) => {
  console.log("storing ...", token);
  localStorage.setItem("userId", token.toString());
  console.log("stored", localStorage.getItem("userId"));
};

export const deleteTokenFromLocalStorage = async () => {
  console.log("removing...");
  localStorage.removeItem("userId");
};
