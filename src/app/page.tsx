'use client'

import React, { Suspense, useEffect, useState } from 'react';
import ClientHome from './ClientHome';
import PokeballSvg from '../../public/utils/pokeballSvg';
import PokeballAnimation from '@/components/PokeballAnimation';
import { useTranslation } from 'react-i18next';

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
      <Suspense fallback={<div style={{position: 'absolute', left: 0, top: 0}}>{t('page.loading')}</div>}>
        <ClientHome shouldDisplay={shouldDisplay} mounted={mounted} />
      </Suspense>
    </>
  );
}
