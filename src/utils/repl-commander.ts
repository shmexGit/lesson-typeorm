import * as repl from 'node:repl';
import { DataSource } from 'typeorm';
import isArray from 'lodash/isArray';
import { ValidationError } from 'class-validator';
import { TransactionService } from '@lesson-typeorm/modules/transaction/transaction.service';
import { ResourceService } from '@lesson-typeorm/modules/resource/resource.service';
import { IReplCommand, ReplNameCommand } from '@lesson-typeorm/types';

import { styledMessage, styledValidationErrors } from './repl-styled';

export const getCommander = (connection: DataSource, commands: Map<ReplNameCommand, IReplCommand>) => {
  const transactionService = new TransactionService(connection);
  const resourceService = new ResourceService(connection);

  const commander: repl.REPLEval = async (inputCommand, _context, _filename, callback) => {
    const splitIndex = inputCommand.indexOf(' ');
    const isSplit = splitIndex !== -1;
    const commandName = isSplit ? inputCommand.slice(0, splitIndex).trim() : inputCommand.trim();
    const dto = isSplit ? inputCommand.slice(splitIndex + 1).trim() : null;

    try {
      const command = commands.get(commandName as ReplNameCommand);

      if (command) {
        await command.action(
          { transaction: transactionService, resource: resourceService },
          callback,
          dto
        );
      } else {
        callback(null, styledMessage('yellow', 'Command not found!'));
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
