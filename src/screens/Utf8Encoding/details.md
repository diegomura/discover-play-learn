# ASCII to Unicode

- ASCII is a 7-bit code to encode characters (128 characters)
- Because computers architecture, 8 bits are usually used in practice
- 8-bit ASCII is called Extended ASCII, and can fit up to 256 characters. Unfortunately, it’s being extended many times in many different ways
- One of it it’s Windows ANSI character set
- Under the assumption that’s preferable to have just one unambiguous character encoding system that’s suitable for all the worlds languages, several major computer companies got together in 1988 and began developing an alternative to ASCII known as Unicode
- Whereas ASCII is a 7-bit code, Unicode is a 16-bit code (at least that was the original idea), allowing the encoding of 65536 characters.
- By the mid-1990s it became necessary to go beyond 16 bits to include scripts that have become extinct but are still necessary for historic reasons and to include numerous new symbols, like emojis.
- At 2021 Unicode had been expanded to become a 21-bit code.
- Several different methods have been defined for storing and transmitting Unicode text. These are called Unicode transformation formats, or UTF.
- The most straightforward is UTF-32, where all characters are defined as 32-bit values. The drawback is that uses a lot of space. Specially considering 11bits of each character are wasted.
- One compromise is UTF-16. Most Unicode characters are defined with 2 bytes, but characters with codes above U+FFFF are defined with 4.
- The most important one is UTF-8, which is used across the internet. It’s a compromise between flexibility and concision, and it’s backwards compatible with ASCII.

  ```jsx
  const fs = require('fs');

  // UTF-8 enconding overview

  // write utf-8 econded file with just 1 byte chars (ASCII compatible)
  // no need for special char encoding, just their ASCII values
  const diego = Buffer.from([0x64, 0x69, 0x65, 0x67, 0x6f]);
  fs.writeFileSync('./ascii-compatible.txt', diego);

  // write utf-8 econded file with charactes above above 0x007F (requires 2 bytes)
  // pound sign is U+00A3, but if we were to write these bytes directly, file would be incorrectly encoded
  // we need to encode all these chars like 110xxxxx 10xxxxxx, where x are the 11 least significant bits of unicode char
  // 00A3 is 00000000 10100011 in binary, so encoded it ends up being 11000010 10100011 (0xC2 0xA3)
  const poundPrice = Buffer.from([0xc2, 0xa3, 0x31, 0x32, 0x30]);
  fs.writeFileSync('./utf-8-with-2-bytes-chars.txt', poundPrice);

  // write utf-8 enconded file with charactes above above 0x07FF (requires 3 bytes)
  // indic char U+0920 can't be included in file as is, needs encoding
  // we need to encode all these chars like 1110xxxx 10xxxxxx 10xxxxxx, where x are the 16 least significant bits of unicode char
  // 0920 is 00001001 00100000 in binary, so encoded it ends up being 11100000 10100100 10100000
  const devanagariChar = Buffer.from([0xe0, 0xa4, 0xa0]);
  fs.writeFileSync('./utf-8-with-3-bytes-chars.txt', devanagariChar);

  // write utf-8 enconded file with charactes above above 0xFFFF (requires 4 bytes)
  // poop emoji is U+1F4A9 can't be included in file as is, needs encoding
  // we need to encode all these chars like 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx, where x are the 21 least significant bits of unicode char
  // 01F4A9 is 00000001 11110100 10101001 in binary, so encoded it ends up being 11110000 10011111 10010010 10101001
  const poopEmoji = Buffer.from([0xf0, 0x9f, 0x92, 0xa9]);
  fs.writeFileSync('./utf-8-with-4-bytes-chars.txt', poopEmoji);
  ```
