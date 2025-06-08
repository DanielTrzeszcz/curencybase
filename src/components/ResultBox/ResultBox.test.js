import { render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
  
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

 
  it('should render proper info about conversion when PLN -> USD', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
    const output = screen.getByTestId('result-box');
    expect(output).toHaveTextContent('PLN 100.00 = $28.57');
  });

  
  const testCasesPLNtoUSD = [
    { amount: 100, expected: 'PLN 100.00 = $28.57' },
    { amount: 50, expected: 'PLN 50.00 = $14.29' },
    { amount: 200, expected: 'PLN 200.00 = $57.14' },
  ];

  for (const testCase of testCasesPLNtoUSD) {
    it(`should render correct conversion for PLN -> USD with amount = ${testCase.amount}`, () => {
      render(<ResultBox from="PLN" to="USD" amount={testCase.amount} />);
      const output = screen.getByTestId('result-box');
      expect(output).toHaveTextContent(testCase.expected);
    });
  }

 
  const testCasesUSDtoPLN = [
    { amount: 1, expected: '$1.00 = PLN 3.50' },
    { amount: 20, expected: '$20.00 = PLN 70.00' },
    { amount: 50, expected: '$50.00 = PLN 175.00' },
  ];

  for (const testCase of testCasesUSDtoPLN) {
    it(`should render correct conversion for USD -> PLN with amount = ${testCase.amount}`, () => {
      render(<ResultBox from="USD" to="PLN" amount={testCase.amount} />);
      const output = screen.getByTestId('result-box');
      expect(output).toHaveTextContent(testCase.expected);
    });
  }

 
  it('should render same value when from and to currencies are the same', () => {
    render(<ResultBox from="PLN" to="PLN" amount={123} />);
    const output = screen.getByTestId('result-box');
    expect(output).toHaveTextContent('PLN 123.00 = PLN 123.00');
  });
});


it('should render "Wrong value…" when amount is negative', () => {
  render(<ResultBox from="PLN" to="USD" amount={-100} />);
  const output = screen.getByTestId('result-box');
  expect(output).toHaveTextContent('Wrong value…');
});
