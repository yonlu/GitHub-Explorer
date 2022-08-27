import { useQuery } from 'react-query';

import api from '../services/api';
import { Issue } from '../types/interfaces';

async function fetchIssues(repository: string): Promise<Issue[]> {
  return api.get(`repos/${repository}/issues`).then(response => response.data);
}

export const useIssuesQuery = (repoUrl: string) =>
  useQuery(['issues', repoUrl], () => fetchIssues(repoUrl));
