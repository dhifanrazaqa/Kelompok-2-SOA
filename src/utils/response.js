const sendSuccess = (res, message, data, statusCode = 200) => {
  const response = {
    message,
    content: data,
    errors: [],
  };

  res.status(statusCode).json(response);
};

const sendError = (res, message, errors = [], statusCode = 400) => {
  const response = {
    message,
    content: null,
    errors,
  };

  res.status(statusCode).json(response);
};

module.exports = {
  sendSuccess,
  sendError,
};
