import { soundex } from './soundex';

const NUMBER_OF_WORDS = 5;

// const rules = [
//   [/[aehiouy]/g, ''],
//   [/[йуеёыахоэяиюьъ]/g, ''],
//   [/[с]?тч/g, 'щ'],
//   [/rl/g, 'r'],
//   [/[bfpvw]/g, '1'],
//   [/[бфпв]/g, '1'],
//   [/[cgjkqsxz]/g, '2'],
//   [/[цжкзсг]/g, '2'],
//   [/[dt]/g, '3'],
//   [/[дтщшч]/g, '3'],
//   [/[l]/g, '4'],
//   [/[л]/g, '4'],
//   [/[mn]/g, '5'],
//   [/[мн]/g, '5'],
//   [/[r]/g, '6'],
//   [/[р]/g, '6'],
//   [/([0-9])(\1{1,})/g, '$1'],
// ];

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const soundex = function (word: any) {
//   let result = word.toLowerCase();

//   rules.forEach((rule) => {
//     result = result.replace(rule[0], rule[1]);
//   });

//   return result;
// };

const createIndex = (text: string) => {
  // regex matches any alphanumeric from any language and strips spaces
  const finalArray: string[] = [];

  const wordArray = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/ +/g, ' ')
    .trim()
    .split(' ');

  do {
    finalArray.push(wordArray.slice(0, NUMBER_OF_WORDS).join(' '));
    wordArray.shift();
  } while (wordArray.length !== 0);

  return finalArray;
};

export const createSearchIndex = (text: string) => {
  let index = createIndex(text);

  const m: Record<string, number> = {};

  const temp = [];
  // translate to soundex
  for (const i of index) {
    temp.push(
      i
        .split(' ')
        .map((v: string) => soundex.calc(v))
        .filter((s) => !!s)
        .join(' '),
    );
  }

  index = temp;

  // add each iteration from the createIndex
  for (const phrase of index) {
    if (phrase) {
      let v = '';
      const t = phrase.split(' ');
      while (t.length > 0) {
        const r = t.shift();
        v += v ? ' ' + r : r;
        // increment for relevance
        m[v] = m[v] ? m[v] + 1 : 1;
      }
    }
  }

  return Object.keys(m);
};

export const getSoundexTerms = (text: string) => {
  return text
    .trim()
    .split(' ')
    .map((v) => soundex.calc(v))
    .filter((s) => !!s)
    .join(' ');
};
