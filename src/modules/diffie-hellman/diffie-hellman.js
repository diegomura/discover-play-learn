const INITIAL_STATE = {
  prime: null,
  rootModulo: null,
  otherPartialSecret: null,
  ownPartialSecret: null,
  sharedKey: null,
};

const createDiffieHellmanAgent = ({ agent, channel }) => {
  const secret = Math.floor(Math.random() * 10) + 1;

  agent.setState({ ...INITIAL_STATE, secret });

  channel.on(event => {
    const { message } = event;

    if (event.from === agent.name) return;

    if (message.type === 'public_parameters') {
      const { prime, rootModulo } = message.value;
      const { secret } = agent.getState();
      const ownPartialSecret = Math.pow(rootModulo, secret) % prime;

      agent.setState({ prime, rootModulo, ownPartialSecret });
    }

    if (message.type === 'partial_secret') {
      const otherPartialSecret = message.value;
      const { prime, secret } = agent.getState();
      const sharedKey = Math.pow(otherPartialSecret, secret) % prime;
      agent.setState({ sharedKey, otherPartialSecret });
    }
  });

  return {
    name: agent.name,
    getState: agent.getState,
    observe: agent.observe,
  };
};

const createDiffieHellman = ({ network }) => {
  const channel = network.channel;
  const alice = createDiffieHellmanAgent({ agent: network.alice, channel });
  const bob = createDiffieHellmanAgent({ agent: network.bob, channel });
  return { alice, bob, channel };
};

export default createDiffieHellman;
