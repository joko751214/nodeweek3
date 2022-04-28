const statusHandle = (res, status, data, message) => {
  if (status === 200) {
    res.status(status).json({
      status,
      data,
    });
  } else {
    res.status(status).json({
      status,
      message,
    });
  }
};

module.exports = statusHandle;
