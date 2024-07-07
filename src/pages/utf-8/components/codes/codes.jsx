import { Flex, Text } from '@chakra-ui/react';

const Char = ({ codes, hovered, CodeComponent, onClick, onHover, onBlur }) => {
  return (
    <Text
      key={codes.join()}
      as="span"
      cursor="pointer"
      backgroundColor={hovered ? '#DADADA' : 'transparent'}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
    >
      {codes.map((code, i) => (
        <CodeComponent key={code} index={i} of={codes.length} value={code} />
      ))}
    </Text>
  );
};

const HexCodes = ({
  title,
  encoding,
  hovered,
  CodeComponent,
  style,
  onClick,
  onHover,
  onBlur,
}) => {
  let offset = 0;

  return (
    <Flex w="50%" direction="column" p={5} style={style}>
      <Text fontWeight="bold" mb={2}>
        {title}
      </Text>

      <Text fontSize={18} w="100%" wordBreak="break-word">
        {encoding.map((codes, i) => {
          if (codes.length === 4) offset += 1;

          // Hack around selecting emojis
          const index = i + offset;

          return (
            <Char
              key={codes.join()}
              codes={codes}
              hovered={hovered === index}
              CodeComponent={CodeComponent}
              onClick={() => onClick?.(index)}
              onHover={() => onHover?.(index)}
              onBlur={() => onBlur?.(index)}
            />
          );
        })}
      </Text>
    </Flex>
  );
};

export default HexCodes;
