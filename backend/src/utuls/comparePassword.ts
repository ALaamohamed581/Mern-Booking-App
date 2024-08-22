import bcrypt, { compare } from "bcrypt";
export const comparePassword = async (
  password: string,
  userPassword: string
) => {
  const isMatch = await bcrypt.compare(password, userPassword);
  return isMatch;
};
