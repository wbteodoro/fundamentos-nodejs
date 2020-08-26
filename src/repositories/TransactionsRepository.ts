import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionsDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const reducer = (type: string) => (
      accumulator: number,
      currentTransaction: Transaction,
    ): number => {
      if (currentTransaction.type === type) {
        return accumulator + currentTransaction.value;
      }
      return accumulator;
    };

    const incomeTotal = this.transactions.reduce(reducer('income'), 0);
    const outcomeTotal = this.transactions.reduce(reducer('outcome'), 0);

    return {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: incomeTotal - outcomeTotal,
    };
  }

  public create({ title, value, type }: TransactionsDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
