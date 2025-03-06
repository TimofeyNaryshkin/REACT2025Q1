'use client';

import { ThemeProvider } from 'hooks/useTheme';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';

const store = setupStore();

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
