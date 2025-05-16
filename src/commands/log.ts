import * as core from '@actions/core';
import * as fs from 'fs';
import * as git from 'isomorphic-git';

export async function runLog() {
  const dir = core.getInput('directory');
  const commits = await git.log({ fs, dir });

  for (const c of commits) {
    core.info(`${c.oid.slice(0, 7)} ${c.commit.author.name}: ${c.commit.message}`);
  }
}
