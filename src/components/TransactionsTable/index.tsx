import { useTransaction } from '../../hooks/useTransactionContext';
import { Container } from './styles';


const TransactionsTable: React.FC = () => {
 
  const {transactions} = useTransaction()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
        {transactions.map(({amount, category, createdAt, id, title, type}) => (
          <tr key={id}> 
           <td>{title}</td>
           <td className={type === 'deposit' ? 'deposit' : 'withdraw'}>
             {type === 'withdraw' && '-'} 
             {new Intl.NumberFormat('pt-BR', {
             style: 'currency',
             currency: 'BRL',
           }).format(amount)}</td>
           <td>{category}</td>

           <td>
           {new Intl.DateTimeFormat('pt-BR').format(
             new Date(createdAt)
           )}
           </td>
         </tr>
        ))}
          
        </tbody>
      </table>
    </Container>
  );
};

export default TransactionsTable;
