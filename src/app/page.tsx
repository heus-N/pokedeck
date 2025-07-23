'use client'

import React, { Suspense } from 'react';
import ClientHome from './ClientHome';

export default function Home() {

  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <ClientHome />
    </Suspense>
  );
}
