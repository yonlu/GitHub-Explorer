import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Repository {
  id: number;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Repositories {
  items: Repository[];
}

export const SearchBox: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState('');
  const [query, setQuery] = useState('');
  const [value] = useDebounce(query, 400);

  const searchRepos = async (term: string) => {
    return api
      .get<Repositories>(`search/repositories?q=${term}&per_page=5`)
      .then(response => response.data);
  };

  const { data } = useQuery([value], () => searchRepos(value), {
    enabled: value.length > 2,
    staleTime: 10 * 1000,
  });

  return (
    <div className="mt-10 max-w-[700px]">
      <Combobox value={selectedQuery} onChange={setSelectedQuery}>
        <Combobox.Input
          onChange={event => setQuery(event.target.value)}
          displayValue={(repo: Repository) => repo.full_name}
          placeholder="Enter a repository name, e.g., react"
          className="w-full h-16 rounded-md px-6"
        />
        <Combobox.Options>
          {data &&
            data.items.map(repository => (
              <Link
                key={repository.full_name}
                to={`/repositories/${repository.full_name}`}
              >
                <Combobox.Option
                  key={repository.id}
                  value={repository}
                  className={({
                    active,
                  }) => `flex items-center gap-3 bg-white border-solid border-[1px] border-gray-300 relative cursor-pointer select-none py-2 pl-10 pr-4
                  ${active ? 'bg-blue-600 text-white' : 'text-gray-900'}`}
                >
                  <img
                    alt={repository.owner.login}
                    src={repository.owner.avatar_url}
                    className="w-[32px] h-[32px] rounded-[999px]"
                  />
                  {repository.full_name}
                </Combobox.Option>
              </Link>
            ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};
