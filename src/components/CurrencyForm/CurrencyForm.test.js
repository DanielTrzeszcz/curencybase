import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react'; 


import CurrencyForm from './CurrencyForm';

afterEach(cleanup); // 👈 automatyczne sprzątanie po każdym teście

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
    expect(screen.getByText('Convert')).toBeInTheDocument();
  });

  const testCases = [
    { amount: '100', from: 'PLN', to: 'USD' },
    { amount: '20', from: 'USD', to: 'PLN' },
    { amount: '200', from: 'PLN', to: 'USD' },
    { amount: '345', from: 'USD', to: 'PLN' },
  ];

  test.each(testCases)(
    'should run action callback with proper data on form submit: %o',
    async ({ amount, from, to }) => {
      const action = jest.fn();
      render(<CurrencyForm action={action} />);
      const user = userEvent.setup();

      const amountField = screen.getByTestId('amount');
      const fromField = screen.getByTestId('from-select');
      const toField = screen.getByTestId('to-select');
      const submitButton = screen.getByText('Convert');

      await user.clear(amountField);
      await user.type(amountField, amount);
      await user.selectOptions(fromField, from);
      await user.selectOptions(toField, to);
      await user.click(submitButton);

     
      await act(() => Promise.resolve());

      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({
        amount: parseInt(amount),
        from,
        to,
      });
    }
  );
});
