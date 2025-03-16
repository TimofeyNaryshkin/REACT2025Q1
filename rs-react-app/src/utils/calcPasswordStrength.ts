const calcPasswordStrength = (password?: string) => {
  if (password) {
    let strength = 0;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  }
  return 0;
};

export default calcPasswordStrength;
