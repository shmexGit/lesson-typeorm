import capitalize from 'lodash/capitalize';
import chalk from 'chalk';
import { ValidationError } from 'class-validator';
import { Transaction } from '@lesson-typeorm/modules/transaction/entities/transaction.entity';
import { ITransactionIntervalDate, TransactionType } from '@lesson-typeorm/modules/transaction/types';
import { TransactionStatisticView } from '@lesson-typeorm/modules/transaction/transaction-statistic.view.entity';
import { Resource } from '@lesson-typeorm/modules/resource/resource.entity';

export const styledHelp = (key: string, info: string) => {
  const styledKey = chalk.green(key);
  const indent = ' '.repeat(4 - key.length);
  const styledInfo = chalk.blue(info);
  return `  ${styledKey}${indent} - ${styledInfo}`;
};

export const styledMessage = (color: string, message) => {
  return chalk[color](` ${message}`);
};

export const styledValidationErrors = (validationErrors: ValidationError[]) => {
  const errors = validationErrors
    .toString()
    .split(',')
    .map((message) => styledMessage('blue', message.trim().split('\n')[1]))
    .join('\n');

  return `${styledMessage('yellow', 'Failed validation')}:\n${errors}`;
}

export const styledTransaction = (transactions: Array<Transaction | ITransactionIntervalDate>) => {
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

export const styledTransactionStatistic = (statistics: Array<TransactionStatisticView>) => {
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

export const styledResources = (resources: Array<Resource>) => {
  return resources
    .map((resource) => styledMessage('blue', `${resource.id}. ${resource.name}`))
    .join('\n');
};