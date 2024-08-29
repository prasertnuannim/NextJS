import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /login
    router.push('/iotDevices');
  }, [router]);

  return null; // or a loading indicator if you prefer
};

export default Index;
