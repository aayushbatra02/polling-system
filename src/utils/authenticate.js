export const checkEmailRegex = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const authenticateEmail = (email) => {
  if (!email) {
    return "Email Required";
  } else if (!checkEmailRegex(email)) {
    return "Invalid Email";
  } else {
    return null;
  }
};

export const authenticateField = (value, fieldName, page) => {
  if (!value && value !== 0) {
    return `${fieldName} Required`;
  } else if(page === 'minFourChar' && value.length < 4){
    return `${fieldName} must contain 4 characters`;
  } else {
    return null;
  }
};

export const authenticatePassword = (password) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 8) {
    return `password must be contain 8 character`;
  } else {
    return null;
  }
};
