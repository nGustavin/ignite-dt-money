import {createContext, ReactNode, useEffect, useState, useContext} from 'react'
import { api } from '../services/api'

type Transactions = {
  id: number;
  title: string
  type: string
  category: string
  amount: number
  createdAt: string
}

type TransactionsProviderProps = {
  children: ReactNode;
}

type CreateTransaction = Omit<Transactions, 'id' | 'createdAt'>

type TransactionsContextData = {
  transactions: Transactions[];
  createTransaction: (transaction: CreateTransaction) => Promise<void>;
}

const TransactionContext = createContext<TransactionsContextData>({} as TransactionsContextData)

export const TransactionProvider:React.FC<TransactionsProviderProps> = ({children}) => {

  const [transactions, setTransactions] = useState<Transactions[]>([])

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  const createTransaction = async (transactionInput: CreateTransaction) => {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })
    
    const {transaction} = response.data

    setTransactions([...transactions, transaction])
  }
  
  return(
    <TransactionContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionContext.Provider>
  )

}

export const useTransaction = () => {
  return useContext(TransactionContext)

  
}