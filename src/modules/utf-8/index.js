const isSurrogateChar = v => v >= 0xdc00 && v <= 0xdfff;

const getCodePoints = string => {
  const result = [];

  for (let i = 0; i < string.length; i++) {
    result.push(string.codePointAt(i));
  }

  return result;
};

// Using TextEncoder is cheating
export const encode = string => {
  const codes = getCodePoints(string).filter(v => !isSurrogateChar(v));

  return codes.map(code => {
    // Chars below 0x007F
    // No need for special char encoding, just their ASCII values
    if (code < 0x007f) {
      return [code];
    }

    // Chars below 0x007F (requires 2 bytes)
    // We need to encode all these chars like 110xxxxx 10xxxxxx, where x are the 11 least significant bits of unicode value
    if (code < 0x07ff) {
      return [0x00c0 + ((code & 0x0fc0) >> 6), 0x0080 + (code & 0x003f)];
    }

    // Chars below 0xFFFF (requires 3 bytes)
    // We need to encode all these chars like 1110xxxx 10xxxxxx 10xxxxxx, where x are the 16 least significant bits of unicode char
    if (code < 0xffff) {
      return [
        0x00e0 + ((code & 0x01f800) >> 12),
        0x0080 + ((code & 0x0fc0) >> 6),
        0x0080 + (code & 0x003f),
      ];
    }

    // Chars above 0xFFFF (requires 4 bytes)
    // We need to encode all these chars like 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx, where x are the 21 least significant bits of unicode char
    return [
      0x00f0 + ((code & 0x1c0000) >> 18),
      0x0080 + ((code & 0x03f000) >> 12),
      0x0080 + ((code & 0x0fc0) >> 6),
      0x0080 + (code & 0x003f),
    ];
  });
};
