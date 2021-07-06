import Head from 'next/head';
import * as React from 'react';

const User = props => {
  // console.log('Props',props);
  const { user } = props;
  return (
    <section className="page-section">
      <Head>
        <title>{user.username || 'Nikolas'}</title>
      </Head>

      <h1>Hello World from {user.username || 'Nikolas'}</h1>
      <div className="container mx-auto">
        <p>
            <span>
                {user.id || 'Sheesh'}
            </span>
        </p>
      </div>
    </section>
  );
};

User.getInitialProps = res => {
  const { query } = res;
  return { ...query };
};

export default User;
