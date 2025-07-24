'use client'

import React, { Suspense, useEffect, useState } from 'react';
import ClientHome from './ClientHome';
import PokeballSvg from '../../public/utils/pokeballSvg';

export default function Home() {
  const [ shouldDisplay, setShouldDisplay ] = useState(false)
  const [ mounted, setMounted ] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShouldDisplay(true)
      }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={            
      <PokeballSvg shouldDisplay={shouldDisplay}/>
    }>
      <ClientHome shouldDisplay={shouldDisplay} mounted={mounted} />
    </Suspense>
  );
}
