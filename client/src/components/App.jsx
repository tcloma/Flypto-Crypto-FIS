import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from "react";
import Homepage from './Homepage';
import Layout from './Layout';
import CoinPage from './CoinPage'
import '../styles/App.scss';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/coin' element={<CoinPage />}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
