import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { Resource } from './resource.entity';

export class ResourceSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Resource);
    const data = ResourcesStub;

    await repository.upsert(data, ['id']);
  }
}

export default ResourceSeeder;

const ResourcesStub = [
  {
    id: 1,
    name: 'Квартира',
  },
  {
    id: 2,
    name: 'Кофе',
  },
];
