import * as repl from 'node:repl';
import { DataSource } from 'typeorm';
import isNaN from 'lodash/isNaN';
import isArray from 'lodash/isArray';
import capitalize from 'lodash/capitalize';
import chalk from 'chalk';
import { ValidationError } from 'class-validator';
import { AnyClass, ReplNameCommand } from '@lesson-typeorm/types';
import { TransactionService } from '@lesson-typeorm/modules/transaction/transaction.service';
import { CreateTransactionDto, UpdateTransactionDto } from '@lesson-typeorm/modules/transaction/dto/transaction.dto';
import { DateRangeDto } from '@lesson-typeorm/modules/transaction/dto/date-range.dto';
import { CreateResourceDto, UpdateResourceDto } from '@lesson-typeorm/modules/resource/resource.dto';
import { ResourceService } from '@lesson-typeorm/modules/resource/resource.service';
import { PaginationDto } from '@lesson-typeorm/modules/transaction/dto/pagination.dto';
import { validatorDto } from '@lesson-typeorm/utils/validator-dto';
import { Transaction } from '@lesson-typeorm/modules/transaction/entities/transaction.entity';
import { Resource } from '@lesson-typeorm/modules/resource/resource.entity';
import { ITransactionIntervalDate, TransactionType } from '@lesson-typeorm/modules/transaction/types';
import { TransactionStatisticView } from '@lesson-typeorm/modules/transaction/transaction-statistic.view.entity';

const helpCommands = {
  [ReplNameCommand.HELP]: 'List commands.',
  [ReplNameCommand.EXIT]: 'Exit repl.',
  [ReplNameCommand.TRANSACTION_CREATE]: 'Create Transaction by dto (JSON)',
  [ReplNameCommand.TRANSACTION_FIND_ALL]: 'Get list Transactions',
  [ReplNameCommand.TRANSACTION_FIND_PAGINATION]: 'Get list Transactions by pagination dto (JSON)',
  [ReplNameCommand.TRANSACTION_FIND_RANGE]: 'Get list Transactions by date range dto (JSON)',
  [ReplNameCommand.TRANSACTION_REMOVE]: 'Remove Transaction by id',
  [ReplNameCommand.TRANSACTION_STATISTIC]: 'Get sum amount group by type, create date',
  [ReplNameCommand.TRANSACTION_UPDATE]: 'Update Transaction by dto (JSON)',
  [ReplNameCommand.RESOURCE_CREATE]: 'Create Resource by dto (JSON)',
  [ReplNameCommand.RESOURCE_FIND_ALL]: 'Get list Resources',
  [ReplNameCommand.RESOURCE_REMOVE]: 'Remove Resource by id',
  [ReplNameCommand.RESOURCE_UPDATE]: 'Update Resource by dto (JSON)',
};

const useDto = (dto: AnyClass, userDto: string) => {
  if (!dto) {
    throw new Error(`Dto not found!`);
  }
  return validatorDto(dto, JSON.parse(userDto));
};

const useId = (dto: string) => {
  const id = Number(dto);
  if (isNaN(id)) {
    throw new Error(`ID not found!`);
  }

  return id;
}

const styledHelp = (key: string, info: string) => {
  const styledKey = chalk.green(key);
  const indent = ' '.repeat(4 - key.length);
  const styledInfo = chalk.blue(info);
  return `  ${styledKey}${indent} - ${styledInfo}`;
};

const styledMessage = (color: string, message) => {
  return chalk[color](` ${message}`);
};

const styledValidationErrors = (validationErrors: ValidationError[]) => {
  const errors = validationErrors
    .toString()
    .split(',')
    .map((message) => styledMessage('blue', message.trim().split('\n')[1]))
    .join('\n');

  return `${styledMessage('yellow', 'Failed validation')}:\n${errors}`;
}

const styledTransaction = (transactions: Array<Transaction | ITransactionIntervalDate>) => {
  return transactions
    .map((transaction) => {
      let resourceName: string;
      if (transaction instanceof Transaction) {
        resourceName = transaction.resource.name;
      } else {
        resourceName = transaction.resourceName;
      }

      const createdAt = new Date(transaction.createdAt);
      const title = styledMessage(
        transaction.type === TransactionType.REPLENISHMENT ? 'green' : 'yellow',
        `${transaction.id}. ${capitalize(transaction.type)}`
      );
      const info = [
        styledMessage('grey', `Currency:         ${transaction.currency}`),
        styledMessage('grey', `Calculation Type: ${transaction.calculationType}`),
        styledMessage('blue', `Resource:         ${resourceName}`),
        styledMessage('green', `Amount:           ${transaction.amount}`),
      ];

      return `${title} - ${createdAt.toDateString()}\n ${info.join('\n ')}`;
    })
    .join('\n\n');
};

const styledTransactionStatistic = (statistics: Array<TransactionStatisticView>) => {
  return statistics
    .map((statistic) => {
      const title = styledMessage(
        statistic.type === TransactionType.REPLENISHMENT ? 'green' : 'yellow',
        capitalize(statistic.type)
      );
      const date = styledMessage('blue', statistic.date);
      const total = styledMessage('green', statistic.total);
      return `${title}:\n  Date: ${date}\n  Total:${total}`;
    })
    .join('\n\n');
};

const styledResources = (resources: Array<Resource>) => {
  return resources
    .map((resource) => styledMessage('blue', `${resource.id}. ${resource.name}`))
    .join('\n');
};

export const getCommander = (connection: DataSource) => {
  const transactionService = new TransactionService(connection);
  const resourceService = new ResourceService(connection);

  const commander: repl.REPLEval = async (inputCommand, _context, _filename, callback) => {
    const splitIndex = inputCommand.indexOf(' ');
    const isSplit = splitIndex !== -1;
    const command = isSplit ? inputCommand.slice(0, splitIndex).trim() : inputCommand.trim();
    const dto = isSplit ? inputCommand.slice(splitIndex + 1).trim() : null;

    try {
      switch (command) {
        case ReplNameCommand.EXIT: {
          process.exit(0);
        }
        case ReplNameCommand.HELP: {
          const info = Object.keys(helpCommands)
            .map((key) => styledHelp(key, helpCommands[key]))
            .join('\n');

          callback(null, info);
          break;
        }
        case ReplNameCommand.TRANSACTION_CREATE: {
          const createDto = await useDto(CreateTransactionDto, dto);
          await transactionService.create(createDto as CreateTransactionDto);
          callback(null, styledMessage('green', 'Successful transaction creation!'));
          break;
        }
        case ReplNameCommand.TRANSACTION_FIND_ALL: {
          const transactions = await transactionService.find();
          callback(null, styledTransaction(transactions));
          break;
        }
        case ReplNameCommand.TRANSACTION_FIND_PAGINATION: {
          const paginationDto = await useDto(PaginationDto, dto);
          const transactions = await transactionService.findByPagination(
            paginationDto as PaginationDto
          );
          callback(null, styledTransaction(transactions));
          break;
        }
        case ReplNameCommand.TRANSACTION_FIND_RANGE: {
          const dateRangeDto = await useDto(DateRangeDto, dto);
          const transactions = await transactionService.findByDateRange(
            dateRangeDto as DateRangeDto
          );
          callback(null, styledTransaction(transactions));
          break;
        }
        case ReplNameCommand.TRANSACTION_REMOVE: {
          await transactionService.remove(useId(dto));
          callback(null, styledMessage('green', 'Successfully deleting a transaction!'));
          break;
        }
        case ReplNameCommand.TRANSACTION_STATISTIC: {
          const statisticData = await transactionService.getStatistic();
          callback(null, styledTransactionStatistic(statisticData));
          break;
        }
        case ReplNameCommand.TRANSACTION_UPDATE: {
          const updateDto = await useDto(UpdateTransactionDto, dto);
          await transactionService.update(updateDto as UpdateTransactionDto);
          callback(null, styledMessage('green', 'Successful transaction update!'));
          break;
        }
        case ReplNameCommand.RESOURCE_CREATE: {
          const createDto = await useDto(CreateResourceDto, dto);
          await resourceService.create(createDto as CreateResourceDto);
          callback(null, styledMessage('green', 'Successful resource creation!'));
          break;
        }
        case ReplNameCommand.RESOURCE_FIND_ALL: {
          const resources = await resourceService.find();
          callback(null, styledResources(resources));
          break;
        }
        case ReplNameCommand.RESOURCE_REMOVE: {
          await resourceService.remove(useId(dto));
          callback(null, styledMessage('green', 'Successfully deleting a resource!'));
          break;
        }
        case ReplNameCommand.RESOURCE_UPDATE: {
          const updateDto = await useDto(UpdateResourceDto, dto);
          await resourceService.update(updateDto as UpdateResourceDto);
          callback(null, styledMessage('green', 'Successful resource update!'));
          break;
        }
        default: {
          callback(null, styledMessage('yellow', 'Command not found!'));
          break;
        }
      }
    } catch (error: unknown) {
      if (isArray(error) && error[0] instanceof ValidationError) {
        callback(null, styledValidationErrors(error));
      } else {
        callback(null, styledMessage('red', error));
      }
    }
  };

  return commander;
}
