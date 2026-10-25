require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const server = app.listen(PORT, () => {
  console.log('====================================================');
  console.log('       🛡️  PERMISSIONLENS BACKEND & FRONTEND');
  console.log('    "Understand App Permissions. Protect Your Privacy."');
  console.log('====================================================');
  console.log(`🚀 Server running at: http://${HOST}:${PORT}`);
  console.log(`🗄️  Database:        ${process.env.SUPABASE_URL ? 'Connected to Supabase PostgreSQL (' + process.env.SUPABASE_URL + ')' : 'Local JSON files'}`);
  console.log(`📚 API Health Check:  http://${HOST}:${PORT}/api/health`);
  console.log(`🔍 Permissions API:   http://${HOST}:${PORT}/api/permissions`);
  console.log(`📱 Profiles API:      http://${HOST}:${PORT}/api/profiles`);
  console.log('====================================================');
});

// Graceful termination handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
