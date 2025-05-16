import * as core from '@actions/core';
import * as fs from 'fs';
import * as git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import { getAuthIfAvailable } from '../utils/auth';

export async function runFetch() {
  const dir = core.getInput('directory');
  const onAuth = getAuthIfAvailable();

  await git.fetch({
    fs,
    http,
    dir,
    ...(onAuth ? { onAuth } : {})
  });

  core.info('Fetch completed');
}
