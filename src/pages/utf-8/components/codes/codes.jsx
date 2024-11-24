import { Flex } from '@chakra-ui/react';
import classNames from 'classnames';

import Text from '%/components/text';

const Char = ({ codes, hovered, CodeComponent, onClick, onHover, onBlur }) => {
  return (
    <Text
      key={codes.join()}
      as="span"
      className={classNames(
        'cursor-pointer',
        hovered ? 'bg-neutral-200' : 'bg-transparent'
      )}
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
      <Text className="mb-2 font-bold">{title}</Text>

      <Text className="w-fill break-words text-lg">
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
