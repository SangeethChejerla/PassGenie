export function generateRandomPassword(length: number = 16): string {
  if (length !== 16) {
    length = 16;
  }

  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

  // Ensure the password contains at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol
  const allCharacters = lowercase + uppercase + digits + symbols;

  const getRandomCharacter = (chars: string) =>
    chars.charAt(Math.floor(Math.random() * chars.length));

  // Start by adding 1 character from each of the required categories
  let password = '';
  password += getRandomCharacter(lowercase); // 1 lowercase
  password += getRandomCharacter(uppercase); // 1 uppercase
  password += getRandomCharacter(digits); // 1 digit
  password += getRandomCharacter(symbols); // 1 symbol

  // Add random characters to fill the remaining length to 10 characters
  while (password.length < length) {
    password += getRandomCharacter(allCharacters);
  }

  // Shuffle the password to ensure randomness
  password = password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return password;
}
