'use client'

import React, { Suspense, useEffect, useState } from 'react';
import ClientHome from './ClientHome';
import PokeballAnimation from '@/components/PokeballAnimation';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

export default function Home() {
  const [ shouldDisplay, setShouldDisplay ] = useState(false)
  const [ mounted, setMounted ] = useState(false);
  const { t } = useTranslation('common');
  
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShouldDisplay(true)
      }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PokeballAnimation />
      <Suspense fallback={
        <div style={{position: 'absolute', margin: 'auto', inset: '0'}}>
          <Typography variant='h4' color='#fff'>
            {t('page.loading')}
          </Typography>
        </div>}>
        <ClientHome shouldDisplay={shouldDisplay} mounted={mounted} />
      </Suspense>
    </>
  );
}
