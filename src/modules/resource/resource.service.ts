import { DataSource, Repository } from 'typeorm';
import { OrderDirection } from '@lesson-typeorm/types';

import { Resource } from './resource.entity';
import { CreateResourceDto, UpdateResourceDto } from './resource.dto';

export class ResourceService {
  private resourceRepository: Repository<Resource>;

  constructor(readonly dataSource: DataSource) {
    this.resourceRepository = dataSource.getRepository(Resource);
  }

  find() {
    return this.resourceRepository.find({ order: {
      id: OrderDirection.ASC,
    } });
  }

  async create(createResourceDto: CreateResourceDto) {
    const newTransaction = this.resourceRepository.create(createResourceDto);
    return this.resourceRepository.save(newTransaction);
  }

  async remove(id: number) {
    const resource = await this.resourceRepository.findOneBy({ id });

    if (!resource) {
      throw new Error(`Not found Resource by id.`);
    }

    await this.resourceRepository.delete(id);
  }

  async update(updateResourceDto: UpdateResourceDto) {
    const { id } = updateResourceDto;
    const resource = await this.resourceRepository.findOneBy({ id });

    if (!resource) {
      throw new Error(`Not found Resource by id.`);
    }

    return this.resourceRepository.save(updateResourceDto);
  }
}