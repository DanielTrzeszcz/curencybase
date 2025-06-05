export const convertPLNToUSD = (PLN) => {
  if (PLN === undefined) return NaN; // <--- dodane

  if (typeof PLN !== 'number' && typeof PLN !== 'string') return 'Error';
  if (typeof PLN === 'string') return NaN;

  if (PLN < 0) PLN = 0;

  const PLNtoUSD = PLN / 3.5;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
};
