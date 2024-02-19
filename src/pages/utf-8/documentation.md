## ASCII

- ASCII is a 7-bit code to encode characters (128 characters)
- Because computers architecture, 8 bits are usually used in practice
- 8-bit ASCII is called Extended ASCII, and can fit up to 256 characters. Unfortunately, it’s being extended many times in many different ways
- One of it it’s Windows ANSI character set
- Under the assumption that’s preferable to have just one unambiguous character encoding system that’s suitable for all the worlds languages, several major computer companies got together in 1988 and began developing an alternative to ASCII known as Unicode

## Unicode

- Whereas ASCII is a 7-bit code, Unicode is a 16-bit code (at least that was the original idea), allowing the encoding of 65536 characters.
- By the mid-1990s it became necessary to go beyond 16 bits to include scripts that have become extinct but are still necessary for historic reasons and to include numerous new symbols, like emojis.
- At 2021 Unicode had been expanded to become a 21-bit code.
- Several different methods have been defined for storing and transmitting Unicode text. These are called Unicode transformation formats, or UTF.
- The most straightforward is UTF-32, where all characters are defined as 32-bit values. The drawback is that uses a lot of space. Specially considering 11bits of each character are wasted.
- One compromise is UTF-16. Most Unicode characters are defined with 2 bytes, but characters with codes above U+FFFF are defined with 4.
- The most important one is UTF-8, which is used across the internet. It’s a compromise between flexibility and concision, and it’s backwards compatible with ASCII.

## UTF-8 Encoding

- For ASCII characters, no special encoding is needed so they are 1 byte long
- Chacters above `0x007F` are encoded using 2 bytes using mask `110xxxxx 10xxxxxx`, where x are the 11 least significant bits of unicode char.
  - Example: pound sign U+00A3 (`00000000 10100011` in binary) ends up encoded as `11000010 10100011` (`0xC2 0xA3`)
- Characters above `0x07FF` are encoded using 3 bytes using mask `1110xxxx 10xxxxxx 10xxxxxx`, where x are the 16 least significant bits of unicode char.
  - Example: indic char U+0920 (`00001001 00100000` in binary), ends up encoded as `11100000 10100100 10100000` (`0xE0 0xA4 0xA0`)
- Charactes above `0xFFFF` are encoded using 4 bytes using mask `11110xxx 10xxxxxx 10xxxxxx 10xxxxxx`, where x are the 21 least significant bits of unicode char.
  - Example: poop emoji `U+1F4A9` (`00000001 11110100 10101001` in binary), ends up encoded as `11110000 10011111 10010010 10101001` (`0xF0, 0x9F, 0x92, 0xA9`)
