import Text from '%/components/text';

const toHex = code => {
  return code.toString(16).toUpperCase().padStart(2, '0');
};

const HexCode = ({ value }) => {
  return (
    <Text as="span" className="mx-1 font-medium">
      0x{toHex(value)}
    </Text>
  );
};

export default HexCode;
