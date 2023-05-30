import * as repl from 'node:repl';
import { connection } from '@lesson-typeorm/utils/data-source';
import { getCommander } from '@lesson-typeorm/utils/commander';

function modifyOutput(output: string) {
  return output;
}

async function main() {
  const connect = await connection();
  const commander = getCommander(connect);

  repl.start({
    prompt: "lesson-typeorm => ",
    eval: commander,
    writer: modifyOutput
  });
}

main();
