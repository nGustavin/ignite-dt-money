import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransaction } from '../../hooks/useTransactionContext'
import { Container, RadioBox, TransactionTypeContainer } from './styles'


interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({isOpen, onRequestClose}) => {

  const {createTransaction} = useTransaction()

  const [amount, setAmount] = useState(0)
  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')

  const handleCreateNewTransaction = async(event: FormEvent) => {
    event.preventDefault()

    await createTransaction({
      amount,
      title,
      category, 
      type
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
    
    onRequestClose()
  }

  return(
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
    <button type="button" onClick={onRequestClose} className="react-modal-close">
      <img src={closeImg} alt="Fechar modal" />
    </button>

    <Container onSubmit={handleCreateNewTransaction}>
      <h2>Cadastrar </h2>

      <input 
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input 
        placeholder="Valor"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
      />

      <TransactionTypeContainer>
        <RadioBox
        activeColor='green'
          type="button"
          onClick={() => {setType('deposit')}}
          isActive={type === 'deposit'}
        >
          <img src={incomeImg} alt="Entrada"/>
          <span>Entrada</span>
        </RadioBox>
        <RadioBox
        activeColor='red'
          type="button"
          onClick={() => {setType('withdraw')}}
          isActive={type === 'withdraw'}
        >
          <img src={outcomeImg} alt="Saída"/>
          <span>Saída</span>
        </RadioBox>
      </TransactionTypeContainer>

      <input 
        placeholder="Categoria"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />

      <button type="submit">
        Cadastrar
      </button>
    </Container>

  </Modal>
  )
}