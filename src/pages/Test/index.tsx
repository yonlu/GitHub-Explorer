import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';
import api from '../../services/api';

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

const Test: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState('');
  const [query, setQuery] = useState('');
  const [value] = useDebounce(query, 400);

  function searchRepos(term: string) {
    return api
      .get<Repositories>(`search/repositories?q=${term}&per_page=5`)
      .then(response => response.data);
  }

  const { data, isFetched } = useQuery([value], () => searchRepos(value), {
    enabled: value.length > 2,
    staleTime: 10 * 1000,
  });

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input
        onChange={event => setQuery(event.target.value)}
        displayValue={(foo: string) => foo}
      />
      <Combobox.Options>
        {isFetched &&
          data.items.map(repository => (
            <Combobox.Option key={repository.id} value={repository.full_name}>
              {repository.full_name}
            </Combobox.Option>
          ))}
      </Combobox.Options>
    </Combobox>
  );
};

export default Test;
