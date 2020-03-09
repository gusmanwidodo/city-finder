import { searchCities } from '../openAPI/cities.swagger';

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'APIs Document',
    description:
      'City Finder (CF) is REST API application to find city in around the world using Elastic search.',
    termsOfService: '',
    contact: {
      name: 'Gusman Widodo',
      email: 'gusmanwidodo@gmail.com',
    },
  },
  tags: [
    {
      name: 'Cities',
    },
  ],
  paths: {
    '/api/search/cities': {
      get: searchCities,
    },
  },
};
