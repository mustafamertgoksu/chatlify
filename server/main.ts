import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import config from 'config';

import socket from './src/socket';

const port = config.get<number>('port');
const host = config.get<string>('host');
const corsOrigin = config.get<string>('corsOrigin');

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get('/', (_, res) =>
  res.send(`Application runnin`)
);

httpServer.listen(port, host, () => {
  console.log(`Server is listening`);
  console.log(`http://${host}:${port}`);

  socket({ io });
});
