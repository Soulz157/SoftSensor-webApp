import nextConfig from 'eslint-config-next';

const config = [
  ...nextConfig,
  {
    ignores: ['components/ui/**'],
  },
  {
    rules: {
      // Too aggressive: flags valid event-listener subscriptions and
      // the standard next-themes mounted-guard pattern (useEffect(() => setMounted(true), []))
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];

export default config;
