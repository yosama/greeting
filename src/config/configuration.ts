export default () => ({
  api: {
    host: process.env.API_HOST || '0.0.0.0',
    port: parseInt(process.env.API_PORT, 10) || 3000,
    context: process.env.ENDPOINT_ROUTE
  },
  logger: {
    level: process.env.LOG_LEVEL || process.env.LOGGING_LEVEL || 'INFO'
  },
  jsonbin: {
    api: process.env.JSONBIN_API || 'https://api.jsonbin.io/b/5f69afbe65b18913fc510ce8'
  },
  greeting: {
    simpleArray: process.env.SIMPLE_ARRAY || 'hallo,hola,ciao,bonjour,oi'
  },
});