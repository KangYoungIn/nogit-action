import * as core from '@actions/core';
import * as fs from 'fs';
import * as git from 'isomorphic-git';

export async function runStatus() {
  const dir = core.getInput('directory');
  const files = await git.statusMatrix({ fs, dir });

  for (const [file, head, workdir, stage] of files) {
    if (head !== workdir || workdir !== stage) {
      core.info(`Modified: ${file}`);
    }
  }
}
