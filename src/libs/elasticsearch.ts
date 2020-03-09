import { Client } from '@elastic/elasticsearch';
import { Logger } from '@overnightjs/logger';
import { City } from 'src/types/City';

const client = new Client({ node: 'http://localhost:9200' });

export const searchCityByText = async (searchText: string) => {
  const result = await client.search({
    index: 'city-index',
    body: { foo: 'bar' },
  });

  return result;
};

export const checkHealth = async (): Promise<boolean> => {
  const result = await client.ping();
  return result.statusCode === 200;
};

export const indexBulk = async (index: string, data: any) => {
  const bulk = Array<any>();
  data.forEach((city: City) => {
    bulk.push({
      index: {
        _index: index,
        _type: index,
      },
    });
    bulk.push(city);
  });

  await client.bulk({ body: bulk });
};

export const createNewIndex = async (indexName: string, data?: any) => {
  if (data !== null) return await indexBulk(indexName, data);

  return await client.index({
    index: indexName,
    type: '_doc',
    body: {},
  });
};
