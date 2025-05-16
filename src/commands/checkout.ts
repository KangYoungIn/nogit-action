import * as core from '@actions/core';
import * as fs from 'fs';
import * as git from 'isomorphic-git';

export async function runCheckout() {
  const dir = core.getInput('directory');
  const ref = core.getInput('ref');

  await git.checkout({ fs, dir, ref });
  core.info(`Checked out to ${ref}`);
}
