export const searchCities = {
  tags: ['Cities'],
  description: 'Returns all cities',
  operationId: 'searchCities',
  responses: {
    '200': {
      description: 'A list of cities.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              country: {
                type: 'string',
                description: '',
              },
              name: {
                type: 'string',
                description: '',
              },
              lat: {
                type: 'string',
                description: '',
              },
              lng: {
                type: 'string',
                description: '',
              },
            },
          },
        },
      },
    },
  },
  parameters: [
    {
      in: 'query',
      name: 'searchText',
      value: 'jakrta',
      required: true,
      description: 'Free text to search',
    },
  ],
};
