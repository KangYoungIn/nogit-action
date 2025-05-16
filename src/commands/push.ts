import * as core from '@actions/core';
import * as fs from 'fs';
import * as git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

export async function runPush() {
  const dir = core.getInput('directory');
  const remote = core.getInput('remote') || 'origin';
  const ref = core.getInput('ref') || 'main';
  const username = core.getInput('username');
  const password = core.getInput('password');

  await git.push({
    fs,
    http,
    dir,
    remote,
    ref,
    onAuth: () => ({ username: username || 'oauth2', password })
  });

  core.info(`Pushed to ${remote}/${ref}`);
}
