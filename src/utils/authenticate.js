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
    return "";
  }
};

export const authenticateField = (password, fieldName) => {
  console.log(fieldName);
  if (!password) {
    return `${fieldName} Required`;
  } else {
    return "";
  }
};
