import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  GoStar,
  GoRepoForked,
  GoIssueOpened,
  GoChevronLeft,
} from 'react-icons/go';

import logoImg from '../../assets/logo.svg';
import { RepositoryContainer, Header, RepositoryInfo, Issues } from './styles';
import { useIssuesQuery } from '../../hooks/useIssues';
import { useRepositoryQuery } from '../../hooks/useRepository';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const { data: repository, isLoading: isLoadingRepo } = useRepositoryQuery(
    params.repository,
  );

  const { data: issues, isLoading } = useIssuesQuery(params.repository);

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
        {issues?.map(issue => (
          <article className="issue" key={issue.id}>
            <a href={issue.html_url} className="flex gap-[1rem] items-center">
              <div>
                <img
                  className="inline-block h-[2rem] w-[2rem] rounded-full ring-2 ring-white"
                  src={issue.user.avatar_url}
                  alt={`${issue.user.login} profile`}
                />
              </div>
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>
            </a>
          </article>
        ))}
      </Issues>
    </RepositoryContainer>
  );
};

export default Repository;
