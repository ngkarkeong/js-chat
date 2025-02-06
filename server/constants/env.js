const getEnv = (key, defaultValue) => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
};

module.exports = {
  APP_ORIGIN: getEnv("APP_ORIGIN"),
  PORT: getEnv("PORT", "80"),
};
