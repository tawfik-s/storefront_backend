import bcrypt from 'bcrypt';

export const checkPlainPassword = (
  passwordPlain: string,
  hash: string
): boolean => {
  const pepper = process.env.BCRYPT_PASSWORD as string;
  const saltRounds = process.env.SALT_ROUNDS as string;
  return bcrypt.compareSync(passwordPlain + pepper, hash);
};
