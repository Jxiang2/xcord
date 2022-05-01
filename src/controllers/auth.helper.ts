import jwt from "jsonwebtoken";

/**
 * create new JWT token
 * @param userId
 * @param mail
 */
const getJWTToken = (userId: string, mail: string) => {
  return jwt.sign(
    {userId, mail},
    process.env.TOKEN_KEY as string,
    {expiresIn: "4h"}
  );
};

export {getJWTToken};

