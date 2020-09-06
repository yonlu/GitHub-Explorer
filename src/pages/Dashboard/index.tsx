import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="GitHub Explorer" />
      <Title>Explore GitHub repositories</Title>

      <Form action="">
        <input placeholder="Type a repository name here" type="text" />
        <button type="submit">Search</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/18669601?s=460&u=a705767b2ca06918c43df751dd761738d1fdc526&v=4"
            alt="Lucas"
          />
          <div>
            <strong>rocketseat/unform</strong>
            <p>Easy peasy highly scalabe ReactJS & React Native forms!</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/18669601?s=460&u=a705767b2ca06918c43df751dd761738d1fdc526&v=4"
            alt="Lucas"
          />
          <div>
            <strong>rocketseat/unform</strong>
            <p>Easy peasy highly scalabe ReactJS & React Native forms!</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars2.githubusercontent.com/u/18669601?s=460&u=a705767b2ca06918c43df751dd761738d1fdc526&v=4"
            alt="Lucas"
          />
          <div>
            <strong>rocketseat/unform</strong>
            <p>Easy peasy highly scalabe ReactJS & React Native forms!</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
