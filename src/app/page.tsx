'use client'

import React, { Suspense } from 'react';
import ClientHome from './ClientHome';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <Suspense fallback={<p>{t('page.loading')}</p>}>
      <ClientHome />
    </Suspense>
  );
}
