import jwt from "jsonwebtoken";

interface IUserDetails {
  mail: string;
  token: string;
  username: string;
}

// create JWT token
const getJWTToken = (userId: string, mail: string) => {
  return jwt.sign(
    {userId, mail},
    process.env.TOKEN_KEY as string,
    {expiresIn: "24h"}
  );
}

export type {IUserDetails}
export  {
  getJWTToken
}

