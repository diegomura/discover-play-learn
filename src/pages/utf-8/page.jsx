import { useMemo, useState } from 'react';

import * as utf8 from '#/utf-8';
import SmartText from '%/components/smart-text';

import Codes from './components/codes';
import HexCode from './components/hex-code';
import BinCode from './components/bin-code';

const INITIAL_TEXT = 'd1£ठ💩';

const Utf8Encoding = () => {
  const [hovered, setHovered] = useState(null);
  const [text, setText] = useState(INITIAL_TEXT);

  const encoding = useMemo(() => utf8.encode(text), [text]);

  const onCodeHover = i => {
    setHovered(i);
  };

  const onCodeBlur = () => {
    setHovered(null);
  };

  return (
    <>
      <div className="flex h-[calc(100vh-210px)] w-full items-center justify-center">
        <SmartText
          className="mx-5 text-center text-[135px]"
          value={text}
          maxLength={20}
          onHovered={setHovered}
          onChange={setText}
        />
      </div>

      <div className="flex h-[210px] border-t border-neutral-400">
        <Codes
          title="HEX"
          CodeComponent={HexCode}
          encoding={encoding}
          hovered={hovered}
          style={{ borderRight: '1px solid lightGray' }}
          onHover={onCodeHover}
          onBlur={onCodeBlur}
        />

        <Codes
          title="Binary"
          CodeComponent={BinCode}
          encoding={encoding}
          hovered={hovered}
          onHover={onCodeHover}
          onBlur={onCodeBlur}
        />
      </div>
    </>
  );
};

export default Utf8Encoding;
