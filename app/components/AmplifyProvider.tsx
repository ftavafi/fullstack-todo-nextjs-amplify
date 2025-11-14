'use client';

import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { useEffect, useState } from 'react';

Amplify.configure(outputs, { ssr: true });

export function AmplifyProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}

