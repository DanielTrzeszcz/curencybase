import styles from './ResultBox.module.scss';

const ResultBox = ({ from, to, amount }) => {
  const rates = {
    PLN: 1,
    USD: 3.5,
  };

  if (amount < 0) {
    return <div data-testid="result-box">Wrong value…</div>;
  }

  const fromRate = rates[from];
  const toRate = rates[to];
  const result = ((amount * fromRate) / toRate).toFixed(2);

  const format = (currency, value) =>
    currency === 'USD' ? `$${Number(value).toFixed(2)}` : `PLN ${Number(value).toFixed(2)}`;

  return (
    <div data-testid="result-box">
      {format(from, amount)} = {format(to, result)}
    </div>
  );
};

export default ResultBox;
