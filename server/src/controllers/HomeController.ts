import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';

@Controller('/')
export class HomeController {
  @Get('/')
  private async index(req: Request, res: Response) {
    res.status(200).json('ok');
  }
}
