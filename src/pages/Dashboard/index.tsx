import React, { useState } from 'react';
import { GoChevronRight } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useQueries } from 'react-query';
import api from '../../services/api';
import 'react-toastify/dist/ReactToastify.css';

import logoImg from '../../assets/logo.svg';

import { Title, Repositories } from './styles';
import { SearchBox } from '../../components/SearchBox';
import { Repository } from '../../types/interfaces';

const Dashboard: React.FC = () => {
  async function fetchRepository(repoUrl: string): Promise<Repository> {
    return api.get(repoUrl).then(response => response.data);
  }

  const [queries] = useState([
    {
      queryKey: ['foo', 1],
      queryFn: () => fetchRepository('repos/torvalds/linux'),
    },
    {
      queryKey: ['foo', 2],
      queryFn: () => fetchRepository('repos/nodejs/node'),
    },
    {
      queryKey: ['foo', 3],
      queryFn: () => fetchRepository('repos/microsoft/typescript'),
    },
  ]);

  const results = useQueries(queries);

  const isLoading = results.some(result => result.isLoading);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <img src={logoImg} alt="GitHub Explorer" />
      <Title>Explore GitHub repositories</Title>

      <SearchBox />

      <Repositories>
        {results?.map(result => (
          <Link
            key={result?.data?.full_name}
            to={`/repositories/${result?.data?.full_name}`}
          >
            <img
              alt={result?.data?.owner.login}
              src={result?.data?.owner.avatar_url}
            />
            <div>
              <strong>{result?.data?.full_name}</strong>
              <p>{result?.data?.description}</p>
            </div>

            <GoChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
