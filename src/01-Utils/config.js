class Config {
  loginExpiresIn;
  port;
  mongoUser = process.env.MONGO_USER;
  mongoPassword = process.env.MONGO_PASSWORD;
  mongoCluster = process.env.MONGO_CLUSTER;
  mongoDBName = process.env.MONGO_DB_NAME;
};

class DevelopmentConfig extends Config {
  constructor() {
    super();
    this.loginExpiresIn = "3h";
    this.port = 5002;
  };
};

class ProductionConfig extends Config {
  constructor() {
    super();
    this.loginExpiresIn = "30m";
    this.port = process.env.PORT;
  };
};

const config = process.env.NODE_ENV !== "production" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
