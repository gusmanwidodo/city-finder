import { Request, Response } from 'express';
import { Controller, Get, Post } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { checkHealth, searchCityByText, createNewIndex } from '../libs/elasticsearch';

@Controller('api/search')
export class SearchController {
  @Get('cities')
  private async getCities(req: Request, res: Response) {
    const searchText = req.query.searchText;
    const result = await searchCityByText(searchText);

    res.status(200).json(result);
  }

  @Get('health')
  private async getHealthStatus(req: Request, res: Response) {
    const status = await checkHealth();

    res.status(200).json({
      message: status ? 'Up' : 'Down',
    });
  }

  @Get('cities/index')
  private async indexCities(req: Request, res: Response) {
    const cities = await require('../../data/cities.json');
    const result = await createNewIndex('cities', cities);

    Logger.Info(result);

    res.status(200).json({
      message: 'success',
    });
  }
}
