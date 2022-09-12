import Cryptr from 'cryptr';

export async function decryptPassword(credentials: any) {
  const CRYPTR_KEY = String(process.env.CRYPTR_SECRET)
  const cryptr = new Cryptr(CRYPTR_KEY);

  let decryptedData = credentials.map((credential: any) => {
    const { password } = credential;
    const decryptedPassword = cryptr.decrypt(password);
    return { ...credential, password: decryptedPassword };
  });
  
  return decryptedData;
};