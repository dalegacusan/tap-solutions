// pages/_error.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Error({ statusCode }) {
  const router = useRouter();

  useEffect(() => {
    if (statusCode === 404) {
      router.replace('/'); // Redirect to homepage if 404 error
    }
  }, [statusCode, router]);

  return null; // or you can render a custom error message or component here
}

Error.getInitialProps = async (ctx) => {
  const { res, err } = ctx;
  const statusCode = res ? res.statusCode : (err ? err.statusCode : 404);

  return { statusCode };
};

export default Error;
