import * as core from '@actions/core';
import { runClone } from './commands/clone';
import { runStatus } from './commands/status';
import { runAdd } from './commands/add';
import { runCommit } from './commands/commit';
import { runLog } from './commands/log';
import { runPush } from './commands/push';
import { runCheckout } from './commands/checkout';
import { runFetch } from './commands/fetch';

async function run(): Promise<void> {
  const action = core.getInput('action');
  try {
    switch (action) {
      case 'clone':
        await runClone();
        break;
      case 'status':
        await runStatus();
        break;
      case 'add':
        await runAdd();
        break;
      case 'commit':
        await runCommit();
        break;
      case 'log':
        await runLog();
        break;
      case 'push':
        await runPush();
        break;
      case 'checkout':
        await runCheckout();
        break;
      case 'fetch':
        await runFetch();
        break;
      default:
        throw new Error(`Unsupported action: ${action}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
