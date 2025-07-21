/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

let server: Server;

const bootstrap = async () => {
  const { connect_url, port } = config;

  try {
    await mongoose.connect(connect_url as string);
    console.log('🛢️  Database connection successful');
    app.connect(connect_url);
    server = app.listen(port, () => {
      console.log(`✅ App listening on port ${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to database:', err);
    process.exit(1); // Exit the process on failure to connect
  }

  process.on('unhandledRejection', error => {
    console.error('Unhandled Rejection:', error);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

bootstrap();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
