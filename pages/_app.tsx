import '../styles/globals.scss'
import { AppProps } from 'next/app';
import { CheckboxProvider } from '../context/checkboxcontext';

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <CheckboxProvider>
      <Component {...pageProps} />
    </CheckboxProvider>
  );
}

export default MyApp
