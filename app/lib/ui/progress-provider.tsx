"use client";

import { AppProgressProvider } from '@bprogress/next';

export default function ProgressProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProgressProvider
      height="4px"
      color="#000"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </AppProgressProvider>
  );
}
