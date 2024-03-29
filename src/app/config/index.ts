import convict from 'convict';
import convict_format_with_validator from 'convict-format-with-validator';
import dotenv from 'dotenv';   

dotenv.config();   
convict.addFormats(convict_format_with_validator);

const schema = {
  env: {
    doc: 'The application environment.',
    format: ['production', 'qa', 'development', 'local'],
    env: 'NODE_ENV',
    default: 'local'
  },
  apm: {
    serviceName: {
      doc: 'Service name for APM',
      format: String,
      env: 'ELASTIC_APM_SERVICE_NAME',
      default: 'default'
    },
    serverUrl: {
      doc: 'Server URL for APM ',
      format: 'url',
      env: 'ELASTIC_APM_SERVER_URL',
      default: 'http://localhost'
    },
    secretToken: {
      doc: 'Secret token for APM',
      format: String,
      env: 'ELASTIC_APM_SECRET_TOKEN',
      default: 'secret'
    },
    environment: {
      doc: 'Environment for APM',
      format: String,
      env: 'ELASTIC_APM_ENVIRONMENT',
      default: 'development'
    },
    captureHeaders: {
      doc: 'Check if capture headers for APM',
      format: Boolean,
      env: 'ELASTIC_APM_CAPTURE_HEADERS',
      default: true
    },
    errorAbortedRequests: {
      doc: 'Error on aborted requests for APM',
      format: Boolean,
      env: 'ELASTIC_APM_ERROR_ON_ABORTED_REQUESTS',
      default: true
    },
    maxQueueSize: {
      doc: 'Define the max queue size for logs to send to the APM server',
      format: Number,
      env: 'ELASTIC_APM_MAX_QUEUE_SIZE',
      default: 4096
    },
    enabled: {
      doc: 'Define if APM service is enabled',
      format: Number,
      env: 'APM_ENABLED',
      default: 0
    }
  },
  logLevel: {
    doc: 'Base path for the API',
    format: String,
    env: 'LOG_LEVEL',
    default: 'info'
  },
  http: {
    basePath: {
      doc: 'Base path for the API',
      format: String,
      env: 'BASE_PATH',
      default: ''
    },
    port: {
      doc: 'Api port',
      format: Number,
      env: 'PORT',
      default: 3908
    }
  },
  jwt: {
    secretKey: {
      doc: 'JWT encryption key (for routes without pin protection)',
      format: String,
      env: 'JWT_SECRET_KEY',
      default: 'testKey'
    },
    pinProtectedSecretKey: {
      doc: 'JWT encryption key (for routes with pin protection)',
      format: String,
      env: 'JWT_PIN_PROTECTED_SECRET_KEY',
      default: 'testKey2'
    }
  }
};

const config = convict(schema);
 
config.load(process.env);
 
export { config, schema };
