import * as core from '@actions/core';
import * as fs from 'fs';
import * as git from 'isomorphic-git';

export async function runAdd() {
  const dir = core.getInput('directory');
  const fileList = core.getInput('files').split('\n').map(f => f.trim()).filter(f => f);

  for (const file of fileList) {
    await git.add({ fs, dir, filepath: file });
    core.info(`Added: ${file}`);
  }
}
