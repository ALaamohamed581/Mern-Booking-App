import jwt from "jsonwebtoken";

export const SingToken = (id: string) => {
  const token = jwt.sign({ userId: id }, process.env.JWT_SERCERT as string, {
    expiresIn: "10d",
  });
  return token;
};
