import EventEmitter from 'events';

const createChannel = () => {
  const eventName = 'message';
  const channel = new EventEmitter();

  const on = listener => {
    channel.on(eventName, listener);
  };

  const off = listener => {
    channel.off(eventName, listener);
  };

  const emit = message => {
    channel.emit(eventName, message);
  };

  return { on, off, emit };
};

const createAgent = ({ name }) => {
  let state = {};
  const emitter = new EventEmitter();

  const getState = () => state;

  const setState = newState => {
    state = { ...state, ...newState };
    emitter.emit('change', state);
  };

  const observe = listener => {
    listener(getState());
    emitter.on('change', listener);
    return () => emitter.off('change', listener);
  };

  return { name, getState, setState, observe };
};

const createNetwork = () => {
  const channel = createChannel();
  const alice = createAgent({ name: 'alice', channel });
  const bob = createAgent({ name: 'bob', channel });

  return { alice, bob, channel };
};

export default createNetwork;
