import { auth } from "../firebase/init";

export const getUser = () => {
  return auth.currentUser;
};

export const getAccessToken = async () => {
  const user = getUser();

  if (user === null) {
    return undefined;
  }

  try {
    return await user.getIdToken();
  } catch (e) {
    console.error('Failed to fetch access token');
    console.error(e);
    return undefined;
  }
};