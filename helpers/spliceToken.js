const spliceToken = access_token => {
  return access_token.substring(
    access_token.indexOf("=") + 1,
    access_token.indexOf("&")
  );
};

module.exports = spliceToken;
