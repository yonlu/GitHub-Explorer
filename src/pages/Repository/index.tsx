import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  GoStar,
  GoRepoForked,
  GoIssueOpened,
  GoChevronLeft,
} from 'react-icons/go';
import { useQuery } from 'react-query';
import api from '../../services/api';
import Label from '../../components/Label';

import logoImg from '../../assets/logo.svg';

import { RepositoryContainer, Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

interface RepositoryDTO {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
  };
  labels: Array<{
    id: string;
    url: string;
    name: string;
    color: string;
  }>;
}

const Repository: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1450);

  const { params } = useRouteMatch<RepositoryParams>();

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 1450);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  async function fetchRepository(): Promise<RepositoryDTO> {
    return api
      .get(`repos/${params.repository}`)
      .then(response => response.data);
  }

  async function fetchIssues(): Promise<Issue[]> {
    return api
      .get(`repos/${params.repository}/issues`)
      .then(response => response.data);
  }

  const { data: repository, isLoading: isLoadingRepo } = useQuery(
    'repo',
    fetchRepository,
  );
  const { data: issues, isLoading } = useQuery('issues', fetchIssues);

  if (isLoading && isLoadingRepo) {
    return <span>Loading...</span>;
  }

  return (
    <RepositoryContainer>
      <Header>
        <img src={logoImg} alt="GitHub Explorer" />
        <Link to="/">
          <GoChevronLeft size={16} />
          Back
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <GoStar size={40} />
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <GoRepoForked size={40} />
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <GoIssueOpened size={40} />
              <strong>{repository.open_issues_count}</strong>
              <span>Issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {issues.map(issue => (
          <article className="issue" key={issue.id}>
            <div>
              <img
                src={issue.user.avatar_url}
                alt={`${issue.user.login} profile`}
              />
            </div>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            {isDesktop
              ? issue.labels.map(label => (
                  <Label
                    key={label.id}
                    url={`https://github.com/${params.repository}/labels/${label.name}`}
                    name={label.name}
                    color={label.color}
                  />
                ))
              : null}
          </article>
        ))}
      </Issues>
    </RepositoryContainer>
  );
};

export default Repository;
