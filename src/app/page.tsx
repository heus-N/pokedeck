import React, { Suspense } from 'react';
import ClientHome from './ClientHome';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>
      <Suspense fallback={
        <div style={{position: 'absolute', margin: 'auto', inset: '0', width: '100vw', height: '100vh', overflow: 'hidden'}}>
          <Typography variant='h4' color='#fff'>
            {t('page.loading')}
          </Typography>
        </div>}>
        <ClientHome />
      </Suspense>
    </>
  );
}
