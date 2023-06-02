import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const Loss = ({ value }) => {
  const [data, setData] = useState(value.data);

  useEffect(() => {
    const handleLossChange = loss => setData(loss);
    value.addListener('update', handleLossChange);
    return () => value.removeListener('update', handleLossChange);
  }, [setData, value]);

  return <Text>Loss: {data}</Text>;
};

export default Loss;
