import * as core from '@actions/core';
import * as fs from 'fs';
import * as git from 'isomorphic-git';

export async function runCommit() {
  const dir = core.getInput('directory');
  const message = core.getInput('message');
  const name = core.getInput('username') || 'nogit-action';
  const email = core.getInput('email') || 'nogit@example.com';

  const sha = await git.commit({
    fs,
    dir,
    message,
    author: { name, email }
  });

  core.info(`Committed: ${sha}`);
}
