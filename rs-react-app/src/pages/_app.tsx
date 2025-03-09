import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../hooks/useTheme';
import { setupStore } from '../store/store';
import '@/styles/App.css';

const store = setupStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
