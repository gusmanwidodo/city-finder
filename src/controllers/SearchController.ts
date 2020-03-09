import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

@Controller('api/search')
export class SearchController {
  @Get('cities')
  private getCities(req: Request, res: Response) {
    Logger.Info(`searchText=${req.query.searchText}`);
    res.status(200).json({
      message: req.query.searchText,
    });
  }
}
