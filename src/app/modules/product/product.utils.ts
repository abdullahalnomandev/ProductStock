import crypto from 'crypto';

export const generateProductCode = (productName: string): string => {
  const cleanName = productName.toLowerCase().replace(/[^a-z]/g, '');
  let longestSubstrings: {
    substring: string;
    startIndex: number;
    endIndex: number;
  }[] = [];
  let maxLength = 0;

  for (let i = 0; i < cleanName.length; i++) {
    for (let j = i; j < cleanName.length; j++) {
      const substring = cleanName.substring(i, j + 1);
      if (isStrictlyIncreasing(substring)) {
        if (substring.length > maxLength) {
          maxLength = substring.length;
          longestSubstrings = [{ substring, startIndex: i, endIndex: j }];
        } else if (substring.length === maxLength) {
          longestSubstrings.push({ substring, startIndex: i, endIndex: j });
        }
      }
    }
  }

  const concatenatedSubstrings = longestSubstrings
    .map(s => s.substring)
    .join('');
  const startIndex =
    longestSubstrings.length > 0 ? longestSubstrings[0].startIndex : 0;
  const endIndex =
    longestSubstrings.length > 0
      ? longestSubstrings[longestSubstrings.length - 1].endIndex
      : 0;

  const hashedName = crypto
    .createHash('sha1')
    .update(productName)
    .digest('hex')
    .substring(0, 7);

  return `${hashedName}-${startIndex}${concatenatedSubstrings}${endIndex}`;
};

const isStrictlyIncreasing = (str: string): boolean => {
  if (str.length <= 1) {
    return true;
  }
  for (let i = 1; i < str.length; i++) {
    if (str.charCodeAt(i) <= str.charCodeAt(i - 1)) {
      return false;
    }
  }
  return true;
};
