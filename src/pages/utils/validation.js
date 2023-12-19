export const regex = {
  isValidEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|gob|com\.ar|gob\.ar)$/,
  containNumber: /\d/,
  containSpace: /\s/,
  containUppercase: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
  containLetter: /[a-zA-Z]/,
};

export function isValidSignIn({ email, password }) {
  const errs = {};

  if (!email) errs.email = "ingreese un email";
  else if (!regex.isValidEmail.test(email)) errs.email = "ingrese un email valido";

  if (!password) errs.password = "ingrese una contraseña";

  return errs;
}
