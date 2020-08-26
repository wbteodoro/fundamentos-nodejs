import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionsDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: TransactionsDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome') {
      const newTotalBalance = value + balance.outcome;
      if (newTotalBalance > balance.income) {
        throw Error(
          'Não é possível realizar esta transação, valor insuficiente em caixa!',
        );
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    return transaction;
  }
}

export default CreateTransactionService;
