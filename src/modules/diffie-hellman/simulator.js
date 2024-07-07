const MESSAGE_TYPES = {
  PUBLIC_PARAMETERS: 'public_parameters',
  PARTIAL_SECRET: 'partial_secret',
};

const createSimulator = ({ instance }) => {
  let step = 0;

  const setupPublicParameters = () => {
    instance.channel.emit({
      from: 'channel',
      message: {
        type: MESSAGE_TYPES.PUBLIC_PARAMETERS,
        value: { prime: 23, rootModulo: 5 },
      },
    });
  };

  const aliceSendsComputedSecret = () => {
    instance.channel.emit({
      from: 'alice',
      message: {
        type: MESSAGE_TYPES.PARTIAL_SECRET,
        value: instance.alice.getState().ownPartialSecret,
      },
    });
  };

  const bobSendsComputedSecret = () => {
    instance.channel.emit({
      from: 'bob',
      message: {
        type: MESSAGE_TYPES.PARTIAL_SECRET,
        value: instance.bob.getState().ownPartialSecret,
      },
    });
  };

  const steps = [
    setupPublicParameters,
    aliceSendsComputedSecret,
    bobSendsComputedSecret,
  ];

  const next = () => {
    const stepFn = steps[step];

    if (stepFn) {
      stepFn();
      step += 1;
    }
  };

  return { next };
};

export default createSimulator;
