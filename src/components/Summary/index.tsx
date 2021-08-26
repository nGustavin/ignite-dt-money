
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalimg from '../../assets/total.svg';
import { useTransaction } from '../../hooks/useTransactionContext';
import { Container } from './styles';

const Summary: React.FC = () => {
  const {transactions} = useTransaction()

  const sumary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposit'){
      acc.deposits += transaction.amount
      acc.total += transaction.amount
    }else{
      acc.withdraws += transaction.amount
      acc.total -= transaction.amount
    }

    return acc
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          
          {new Intl.NumberFormat('pt-BR', {
             style: 'currency',
             currency: 'BRL',
           }).format(sumary.deposits)}  
        </strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeImg} alt="Saidas" />
        </header>
        <strong>- 
        {new Intl.NumberFormat('pt-BR', {
             style: 'currency',
             currency: 'BRL',
           }).format(sumary.withdraws)}  
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalimg} alt="Total" />
        </header>
        <strong>
        {new Intl.NumberFormat('pt-BR', {
             style: 'currency',
             currency: 'BRL',
           }).format(sumary.total)}  
        </strong>
      </div>
    </Container>
  );
};

export default Summary;

