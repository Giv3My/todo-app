import React from 'react';
import { Toaster } from 'react-hot-toast';

import { PageTitle, AppHeader, AppContent } from './components';

import styles from './styles/modules/app.module.scss';

function App() {
  return (
    <>
      <div className='container'>
        <PageTitle>TODO LIST</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          }
        }}
      />
    </>
  );
}

export default App;