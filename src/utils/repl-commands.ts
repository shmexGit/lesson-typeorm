import isNaN from 'lodash/isNaN';
import { AnyClass, IReplCommand, ReplNameCommand } from '@lesson-typeorm/types';
import { CreateTransactionDto, UpdateTransactionDto } from '@lesson-typeorm/modules/transaction/dto/transaction.dto';
import { DateRangeDto } from '@lesson-typeorm/modules/transaction/dto/date-range.dto';
import { CreateResourceDto, UpdateResourceDto } from '@lesson-typeorm/modules/resource/resource.dto';
import { PaginationDto } from '@lesson-typeorm/modules/transaction/dto/pagination.dto';

import { validatorDto } from './validator-dto';
import {
  styledHelp,
  styledMessage,
  styledTransaction,
  styledTransactionStatistic,
  styledResources
} from './repl-styled';

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

export const commands = new Map<ReplNameCommand, IReplCommand>();

commands.set(ReplNameCommand.HELP, {
  help: 'List commands.',
  action: (_, callback) => {
    const info = Array.from(commands)
      .map(([key, value]) => styledHelp(key, value.help))
      .join('\n');

    callback(null, info);
  }
});

commands.set(ReplNameCommand.EXIT, {
  help: 'Exit repl.',
  action: () => {
    process.exit(0);
  },
});

commands.set(ReplNameCommand.TRANSACTION_CREATE, {
  help: 'Create Transaction by dto (JSON)',
  action: async (services, callback, dto) => {
    const createDto = await useDto(CreateTransactionDto, dto);
    await services.transaction.create(createDto as CreateTransactionDto);
    callback(null, styledMessage('green', 'Successful transaction creation!'));
  },
});

commands.set(ReplNameCommand.TRANSACTION_FIND_ALL, {
  help: 'Get list Transactions',
  action: async (services, callback) => {
    const transactions = await services.transaction.find();
    callback(null, styledTransaction(transactions));
  },
});

commands.set(ReplNameCommand.TRANSACTION_FIND_PAGINATION, {
  help: 'Get list Transactions by pagination dto (JSON).',
  action: async (services, callback, dto) => {
    const paginationDto = await useDto(PaginationDto, dto);
    const transactions = await services.transaction.findByPagination(
      paginationDto as PaginationDto
    );
    callback(null, styledTransaction(transactions));
  },
});

commands.set(ReplNameCommand.TRANSACTION_FIND_RANGE, {
  help: 'Get list Transactions by date range dto (JSON).',
  action: async (services, callback, dto) => {
    const dateRangeDto = await useDto(DateRangeDto, dto);
    const transactions = await services.transaction.findByDateRange(
      dateRangeDto as DateRangeDto
    );
    callback(null, styledTransaction(transactions));
  },
});

commands.set(ReplNameCommand.TRANSACTION_REMOVE, {
  help: 'Remove Transaction by id.',
  action: async (services, callback, dto) => {
    await services.transaction.remove(useId(dto));
    callback(null, styledMessage('green', 'Successfully deleting a transaction!'));
  },
});

commands.set(ReplNameCommand.TRANSACTION_STATISTIC, {
  help: 'Get sum amount group by type, create date.',
  action: async (services, callback) => {
    const statisticData = await services.transaction.getStatistic();
    callback(null, styledTransactionStatistic(statisticData));
  },
});

commands.set(ReplNameCommand.TRANSACTION_UPDATE, {
  help: 'Update Transaction by dto (JSON).',
  action: async (services, callback, dto) => {
    const updateDto = await useDto(UpdateTransactionDto, dto);
    await services.transaction.update(updateDto as UpdateTransactionDto);
    callback(null, styledMessage('green', 'Successful transaction update!'));
  },
});

commands.set(ReplNameCommand.RESOURCE_CREATE, {
  help: 'Create Resource by dto (JSON).',
  action: async (services, callback, dto) => {
    const createDto = await useDto(CreateResourceDto, dto);
    await services.resource.create(createDto as CreateResourceDto);
    callback(null, styledMessage('green', 'Successful resource creation!'));
  },
});

commands.set(ReplNameCommand.RESOURCE_FIND_ALL, {
  help: 'Get list Resources.',
  action: async (services, callback) => {
    const resources = await services.resource.find();
    callback(null, styledResources(resources));
  },
});

commands.set(ReplNameCommand.RESOURCE_REMOVE, {
  help: 'Remove Resource by id.',
  action: async (services, callback, dto) => {
    await services.resource.remove(useId(dto));
    callback(null, styledMessage('green', 'Successfully deleting a resource!'));
  },
});

commands.set(ReplNameCommand.RESOURCE_UPDATE, {
  help: 'Update Resource by dto (JSON).',
  action: async (services, callback, dto) => {
    const updateDto = await useDto(UpdateResourceDto, dto);
    await services.resource.update(updateDto as UpdateResourceDto);
    callback(null, styledMessage('green', 'Successful resource update!'));
  },
});