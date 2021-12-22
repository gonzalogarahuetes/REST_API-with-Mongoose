const dotenv = require("dotenv");
const logger = require("loglevel");

dotenv.config();
const {
  FB_TYPE,
  FB_PROJECT_ID,
  FB_PRIVATE_KEY_ID,
  FB_PRIVATE_KEY,
  FB_CLIENT_EMAIL,
  FB_CLIENT_ID,
  FB_AUTH_URI,
  FB_TOKEN_URI,
  FB_AUTH_PROVIDER_x509_CERT_URL,
  FB_CLIENT_x509_CERT_URL,
} = process.env;

const ENV = process.env.NODE_ENV || "development";

logger.enableAll();

const CONFIG = {
  production: {
    app: {
      PORT: process.env.PORT || 4000,
    },
    client: {
      URL: process.env.FB_CLIENT_URL || "http://localhost:3000",
    },
    logger: {
      warn: logger.warn,
      info: logger.info,
      error: logger.error,
      trace: logger.trace,
      debug: logger.debug,
    },
    db: {
      url: process.env.DB_URL,
    },
    firebase: {
      certConfig: {
        type: FB_TYPE,
        project_id: FB_PROJECT_ID,
        private_key_id: FB_PRIVATE_KEY_ID,
        private_key: FB_PRIVATE_KEY,
        client_email: FB_CLIENT_EMAIL,
        client_id: FB_CLIENT_ID,
        auth_uri: FB_AUTH_URI,
        token_uri: FB_TOKEN_URI,
        auth_provider_x509_cert_url: FB_AUTH_PROVIDER_x509_CERT_URL,
        client_x509_cert_url: FB_CLIENT_x509_CERT_URL,
      },
    },
  },
  development: {
    app: {
      PORT: process.env.PORT || 4000,
    },
    client: {
      URL: process.env.FB_CLIENT_URL || "http://localhost:3000",
    },
    logger: {
      warn: logger.warn,
      info: logger.info,
      error: logger.error,
      trace: logger.trace,
      debug: logger.debug,
    },
    db: {
      url: process.env.DB_URL,
    },
    firebase: {
      certConfig: {
        type: FB_TYPE,
        project_id: FB_PROJECT_ID,
        private_key_id: FB_PRIVATE_KEY_ID,
        private_key: FB_PRIVATE_KEY,
        client_email: FB_CLIENT_EMAIL,
        client_id: FB_CLIENT_ID,
        auth_uri: FB_AUTH_URI,
        token_uri: FB_TOKEN_URI,
        auth_provider_x509_cert_url: FB_AUTH_PROVIDER_x509_CERT_URL,
        client_x509_cert_url: FB_CLIENT_x509_CERT_URL,
      },
    },
  },
  test: {
    app: {
      PORT: process.env.PORT || 4000,
    },
    client: {
      URL: process.env.FB_CLIENT_URL || "http://localhost:3000",
    },
    logger: {
      warn: logger.warn,
      info: logger.info,
      error: logger.error,
      trace: logger.trace,
      debug: logger.debug,
    },
    db: {
      url: process.env.DB_URL,
    },
    firebase: {
      certConfig: {
        type: FB_TYPE,
        project_id: FB_PROJECT_ID,
        private_key_id: FB_PRIVATE_KEY_ID,
        private_key: FB_PRIVATE_KEY,
        client_email: FB_CLIENT_EMAIL,
        client_id: FB_CLIENT_ID,
        auth_uri: FB_AUTH_URI,
        token_uri: FB_TOKEN_URI,
        auth_provider_x509_cert_url: FB_AUTH_PROVIDER_x509_CERT_URL,
        client_x509_cert_url: FB_CLIENT_x509_CERT_URL,
      },
    },
  },
};

module.exports = CONFIG[ENV];
