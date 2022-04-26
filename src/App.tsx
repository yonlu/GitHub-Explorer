import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import GlobalStyle from './styles/global';
import './index.css';
import Routes from './routes';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyle />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
