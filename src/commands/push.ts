import * as core from '@actions/core';
import * as fs from 'fs';
import * as git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import { getAuthIfAvailable } from '../utils/auth';

export async function runPush() {
  const dir = core.getInput('directory');
  const remote = core.getInput('remote') || 'origin';
  const ref = core.getInput('ref') || 'main';

  const onAuth = getAuthIfAvailable();

  if (!onAuth) {
    throw new Error(`Push requires authentication — please provide a token`);
  }

  await git.push({
    fs,
    http,
    dir,
    remote,
    ref,
    onAuth
  });

  core.info(`Pushed to ${remote}/${ref}`);
}
