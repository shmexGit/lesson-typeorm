import { DataSource, Repository } from 'typeorm';
import { Resource } from '@lesson-typeorm/modules/resource/resource.entity';
import { PaginationDto } from '@lesson-typeorm/modules/transaction/dto/pagination.dto';

import { TransactionRepository } from './types';
import { Transaction } from './entities/transaction.entity';
import { getTransactionCustomRepository } from './transaction.repository';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
import { TransactionStatisticView } from './transaction-statistic.view.entity';
import { DateRangeDto } from './dto/date-range.dto';
import { TransactionUpdate } from './entities/transaction-update.entity';

export class TransactionService {
  private customRepository: TransactionRepository;
  private transactionRepository: Repository<Transaction>;
  private transactionUpdateRepository: Repository<TransactionUpdate>;

  constructor(readonly dataSource: DataSource) {
    this.customRepository = getTransactionCustomRepository(dataSource);
    this.transactionRepository = dataSource.getRepository(Transaction);
    this.transactionUpdateRepository = dataSource.getRepository(TransactionUpdate);
  }

  getStatistic() {
    return this.dataSource.getRepository(TransactionStatisticView).find();
  }

  findByDateRange(dateRangeDto: DateRangeDto) {
    const { begin, end } = dateRangeDto;
    return this.customRepository.findByDateRange(new Date(begin), new Date(end));
  }

  findByPagination(paginationDto: PaginationDto) {
    return this.transactionRepository.find({
      relations: { resource: true },
      ...paginationDto
    });
  }

  find() {
    return this.transactionRepository.find({ relations: { resource: true } });
  }

  async create(createTransactionDto: CreateTransactionDto) {
    const { resourceId, ...parameters } = createTransactionDto;
    const resource = await this.dataSource
      .getRepository(Resource)
      .findOneBy({ id: resourceId });

    if (!resource) {
      throw new Error(`Not found Resource by id.`);
    }

    const newTransaction = this.transactionRepository.create({
      ...parameters,
      resource
    });

    return this.transactionRepository.save(newTransaction);
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOneBy({ id });

    if (!transaction) {
      throw new Error(`Not found Transaction by id.`);
    }

    await this.transactionRepository.delete(id);
  }

  async update(updateTransactionDto: UpdateTransactionDto) {
    const { id, resourceId, ...parameters } = updateTransactionDto;
    const transaction = await this.transactionRepository.findOneBy({ id });

    if (!transaction) {
      throw new Error(`Not found Transaction by id.`);
    }

    let resource: Resource;

    if (resourceId) {
      resource = await this.dataSource
        .getRepository(Resource)
        .findOneBy({ id: resourceId });

      if (!resource) {
        throw new Error(`Not found Resource by id.`);
      }
    }

    const transactionUpdate = await this.transactionUpdateRepository.findOne({
      relations: { transaction: true },
      where: { transaction: { id } },
    });

    await this.dataSource.transaction(async (manager) => {
      await manager.getRepository(Transaction).save({ id, resource, ...parameters });

      const transactionUpdateRepository = manager.getRepository(TransactionUpdate);
      const updatedAt = new Date();

      if (transactionUpdate) {
        transactionUpdate.updatedAt = updatedAt;
        await transactionUpdateRepository.save(transactionUpdate);
      } else {
        const newTransactionUpdate = manager
          .getRepository(TransactionUpdate)
          .create({ updatedAt, transaction });
        await transactionUpdateRepository.save(newTransactionUpdate);
      }
    });
  }
}