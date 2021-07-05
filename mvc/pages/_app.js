import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './views/theme';
import NavigationBar from './components/NavigationBar';
import { useRouter } from 'next/dist/client/router';

export async function getServerSideProps (context){
  const res =  await axios.get('/auth/user',{withCredentials: true})
  const username = res.data.username
  return {
      props: {
          username: username
      }
  }
}

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();
  console.log(router.pathname)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Ask Me Anything</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {router.pathname === '/views/login' || router.pathname === '/views/signup' ? null : <NavigationBar username={props.username}/>}
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};