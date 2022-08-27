import { useQuery } from 'react-query';

import api from '../services/api';
import { Repository as RepositoryDTO } from '../types/interfaces';

async function fetchRepository(repoUrl: string): Promise<RepositoryDTO> {
  return api.get(`repos/${repoUrl}`).then(response => response.data);
}

export const useRepositoryQuery = (repoUrl: string) =>
  useQuery(['repo', repoUrl], () => fetchRepository(repoUrl));
