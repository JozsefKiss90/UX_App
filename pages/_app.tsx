import '../styles/globals.scss'
import { AppProps } from 'next/app';
import { CheckboxProvider } from '../context/checkboxcontext';
import { LikertProgress } from '../context/likertProgressContext';

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <CheckboxProvider>
      <LikertProgress>
        <Component {...pageProps} />
      </LikertProgress>
    </CheckboxProvider>
  );
}

export default MyApp
