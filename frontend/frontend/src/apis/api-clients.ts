import { regsiterFormData, signInData } from "../types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const register = async (formData: regsiterFormData) => {
  const response = await fetch(`${API_BASE_URL}api/v1/user/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const reposneBody = await response.json();
  if (!response.ok) {
    throw new Error(reposneBody.message);
  }
};

export const SignIn = async (formData: signInData) => {
  const response = await fetch(`${API_BASE_URL}api/v1/user/sign-in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const reposneBody = await response.json();
  console.log(reposneBody);
  if (!response.ok) {
    throw new Error(reposneBody.message);
  }

  return reposneBody;
};

export const valdateToke = async () => {
  const response = await fetch(`${API_BASE_URL}api/v1/user/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("invalid token");
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}api/v1/user/sign-out`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) throw new Error("error during log out");
};
