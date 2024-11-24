import { useEffect, useMemo, useRef, useState } from 'react';

import { Text } from '@chakra-ui/react';

import * as utf8 from '#/utf-8';

import Codes from './components/codes';
import HexCode from './components/hex-code';
import BinCode from './components/bin-code';

const INITIAL_TEXT = 'd1£ठ💩';

const Utf8Encoding = () => {
  const input = useRef();
  const [hovered, setHovered] = useState(null);
  const [text, setText] = useState(INITIAL_TEXT);

  const handleChange = e => {
    setText(e.target.textContent);
  };

  const encoding = useMemo(() => utf8.encode(text), [text]);

  const onSelect = () => {
    const selection = window.getSelection();

    if (selection.rangeCount !== 1) return;
    if (selection.focusNode !== input.current.firstChild) return;

    const index = Math.min(selection.baseOffset, selection.focusOffset);

    setHovered(index);
  };

  const onCodeHover = i => {
    setHovered(i);
  };

  const onCodeBlur = () => {
    setHovered(null);
  };

  useEffect(() => {
    const selection = window.getSelection();
    selection.removeAllRanges();

    if (hovered !== null) {
      const range = document.createRange();
      const text = input.current.firstChild;

      try {
        range.setStart(text, hovered);
        range.setEnd(text, hovered + 1);
        selection.addRange(range);
      } catch (error) {
        // noop
      }
    }
  }, [hovered]);

  return (
    <>
      <div className="flex h-[calc(100vh-210px)] w-full items-center justify-center">
        <Text
          ref={input}
          autoFocus
          fontSize={135}
          contentEditable
          marginRight={20}
          marginLeft={20}
          maxLength={20}
          textAlign="center"
          outline="none"
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: INITIAL_TEXT }}
          spellCheck={false}
          onInput={handleChange}
          onMouseUp={onSelect}
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
