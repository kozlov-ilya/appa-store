import { useState, useLayoutEffect } from 'react';
import { breakpoints } from 'configs/consts';

const { sm, lg } = breakpoints;

const queries = [
  { value: 'isMobile', query: `(width <= ${sm}px)` },
  { value: 'isTablet', query: `(${sm}px < width < ${lg}px)` },
  { value: 'isDesktop', query: `(${lg}px <= width)` },
];

export const useMatchMedia = () => {
  const mediaQueryLists = queries.map((query) => window.matchMedia(query.query));

  const getMatchValues = () => mediaQueryLists.map((mql) => mql.matches);

  const [matchValues, setMatchValues] = useState(getMatchValues());

  useLayoutEffect(() => {
    const changeHandler = () => {
      setMatchValues(getMatchValues());
    };

    mediaQueryLists.forEach((mql) => mql.addEventListener('change', changeHandler));

    return () => {
      mediaQueryLists.forEach((mql) => mql.removeEventListener('change', changeHandler));
    };
  });

  return queries
    .map((query) => query.value)
    .reduce(
      (acc, screen, index) => ({
        ...acc,
        [screen]: matchValues[index],
      }),
      { isMobile: false, isTablet: false, isDesktop: false },
    );
};
