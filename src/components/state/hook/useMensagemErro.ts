import { useRecoilValue } from 'recoil';
import { erroState } from '../atom';

// component que apenas retorna a mesagem de erro
export const useMensagemErro = () => {
  // pegando o estado e passando para o recoilValue a mensagem de error
  const mensagem = useRecoilValue(erroState)
  return mensagem
}
