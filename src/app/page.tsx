import React, { Suspense } from 'react';
import ClientHome from './ClientHome';
import { Typography } from '@mui/material';

export default function Home() {

  return (
    <>
      <Suspense fallback={<></>}>
        <ClientHome />
      </Suspense>
    </>
  );
}
