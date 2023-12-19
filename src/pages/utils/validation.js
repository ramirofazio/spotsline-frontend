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

  if (!password) errs.password = "ingrese una contraseña";
  else if (password.length < 8) errs.password = "debe tener al menos 8 caracteres";
  /* else if (!regex.containUppercase.test(password)) errs.password = "debe tener al menos una letra en mayuscula";
  else if (!regex.containNumber.test(password)) errs.password = "debe tener al menos un numero";
  else if (regex.containSpace.test(password)) errs.password = "no puede tener espacios"; */
  return errs;
}
