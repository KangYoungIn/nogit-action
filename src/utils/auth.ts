import * as core from '@actions/core';

export function getAuthIfAvailable() {
  const token = core.getInput('token');
  const username = core.getInput('username');

  if (!token) return undefined;

  return () => ({
    username: username || 'oauth2',
    password: token
  });
}
