export const regex = {
  isValidEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|gob|com\.ar|gob\.ar)$/,
  containNumber: /\d/,
  containSpace: /\s/,
  containUppercase: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
  containLetter: /[a-zA-Z]/,
};

export function isValidSignIn({ email, password }) {
  const errs = {};

  if (!email) errs.email = "ingrese un email";
  else if (!regex.isValidEmail.test(email)) errs.email = "ingrese un email valido";

  if (password) {
    const getErr = validatePassword(password);
    getErr ? (errs.password = getErr) : null;
  }

  return errs;
}

export function validatePassword(password) {
  if (!password) return "ingrese una contraseña";
  //else if (password.length < 8 || password.length < 16) return "debe tener entre 8 y 16 caracteres";
  /* else if (!regex.containUppercase.test(password)) return "debe tener al menos una letra en mayuscula";
  else if (!regex.containNumber.test(password)) return "debe tener al menos un numero";
  else if (regex.containSpace.test(password)) return "no puede tener espacios"; */
  return false;
}

export function isValidPasswords({ password, confirmPassword }) {
  const errs = {};

  if (password) {
    const getErr = validatePassword(password);
    getErr ? (errs.password = getErr) : null;
  }

  if (confirmPassword) {
    const getErr = validatePassword(confirmPassword);
    getErr ? (errs.confirmPassword = getErr) : null;
  }

  if (password !== confirmPassword) {
    errs.submit = "las contraseñas no coinciden";
  }

  return errs;
}
