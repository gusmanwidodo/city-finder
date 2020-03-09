import { Client } from '@elastic/elasticsearch';
import { Logger } from '@overnightjs/logger';
import { City } from 'src/types/City';

const client = new Client({ node: 'http://localhost:9200' });

export const searchCityByText = async (indexName: string, searchText: string) => {
  // query and scoring here
  const body = {
    size: 200,
    from: 0,
    query: {
      match: {
        name: {
          query: searchText,
          fuzziness: 'AUTO',
        },
      },
    },
  };

  const result = await client.search({ index: indexName, type: indexName, body });

  return result.body.hits.hits.map((item: any) => item._source);
};

export const checkHealth = async () => {
  try {
    const result = await client.ping({}, { requestTimeout: 20000 });
    return result.statusCode;
  } catch {
    return 500;
  }
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
