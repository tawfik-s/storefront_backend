import bcrypt from 'bcrypt';

export const incrypt = (password: string): string => {
  const pepper = process.env.BCRYPT_PASSWORD as string;
  const saltRounds = process.env.SALT_ROUNDS as string;
  const hash = bcrypt.hashSync(password + pepper, parseInt(saltRounds));
  return hash;
};
