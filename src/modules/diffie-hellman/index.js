import createDiffieHellman from './diffie-hellman';
import createNetwork from './network';
import createSimulator from './simulator';

export default () => {
  const network = createNetwork();
  const instance = createDiffieHellman({ network });
  const simulator = createSimulator({ instance });
  return { network: instance, simulator };
};
