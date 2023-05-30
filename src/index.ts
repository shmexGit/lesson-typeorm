import * as repl from 'node:repl';
import { connection } from '@lesson-typeorm/utils/data-source';
import { getCommander } from '@lesson-typeorm/utils/repl-commander';
import { commands } from '@lesson-typeorm//utils/repl-commands';

function modifyOutput(output: string) {
  return output;
}

async function main() {
  const connect = await connection();
  const commander = getCommander(connect, commands);

  repl.start({
    prompt: "lesson-typeorm => ",
    eval: commander,
    writer: modifyOutput
  });
}

main();
