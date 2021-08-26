import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

type HeaderProps = {
  onOpenNewTransactionModal: () => void;
}

const Header: React.FC<HeaderProps> = ({onOpenNewTransactionModal}) => {
  return (
    <Container>
      <Content>
      <img src={logoImg} alt="dt money" draggable="false"/>
      <button onClick={onOpenNewTransactionModal}>
        Nova transação
      </button>

     
      </Content>
    </Container>
  );
};

export default Header;
