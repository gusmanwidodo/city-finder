import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import * as swaggerUi from 'swagger-ui-express';
import * as cors from 'cors';

import { swaggerDocument } from './libs/swagger';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

class AppServer extends Server {
  private readonly SERVER_STARTED = 'API server started on port: ';

  constructor() {
    super(true);
    this.app.use(cors())
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.setupControllers();
  }

  private setupControllers(): void {
    const ctlrInstances = [];
    for (const name in controllers) {
      if (controllers.hasOwnProperty(name)) {
        const controller = (controllers as any)[name];
        ctlrInstances.push(new controller());
      }
    }
    super.addControllers(ctlrInstances);
  }

  public start(port: number): void {
    this.app.get('*', (req, res) => {
      res.send(this.SERVER_STARTED + port);
    });
    this.app.listen(port, () => {
      Logger.Imp(this.SERVER_STARTED + port);
    });
  }
}

export default AppServer;
