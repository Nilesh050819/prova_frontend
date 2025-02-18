export const generateRandomString = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
  
    let password = '';
  
    // Ensure at least one special character
    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  
    // Fill the rest of the password with random alphanumeric characters
    for (let i = 1; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    // Shuffle the password to distribute the special character randomly
    return password.split('').sort(() => 0.5 - Math.random()).join('');
  };