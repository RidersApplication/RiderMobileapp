import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function SendPackageAlias() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/send-package' as any);
  }, [router]);

  return null;
}
