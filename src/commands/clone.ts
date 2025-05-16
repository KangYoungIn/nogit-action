import * as core from '@actions/core';
import * as fse from 'fs-extra';
import * as fs from 'fs';
import * as git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import { getAuthIfAvailable } from '../utils/auth';

export async function runClone() {
  const repoUrl = core.getInput('repo-url');
  const dir = core.getInput('directory');

  await fse.ensureDir(dir);

  const onAuth = getAuthIfAvailable();

  await git.clone({
    fs,
    http,
    dir,
    url: repoUrl,
    singleBranch: true,
    depth: 1,
    ...(onAuth ? { onAuth } : {})
  });

  core.info(`Cloned ${repoUrl} into ${dir}`);
}
