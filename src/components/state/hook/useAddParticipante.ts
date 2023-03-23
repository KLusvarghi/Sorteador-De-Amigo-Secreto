import { useSetRecoilState, useRecoilValue } from 'recoil';
import { erroState, listaParticipantesState } from '../atom';

export const useAddParticipante = () => {
  // o recoil nos entrega um setter, uma função que define um novo estado

  // passando dentro dele qual o recoil state que eu quero pra ele
  const setLista = useSetRecoilState(listaParticipantesState)

  // Tendo acesso a lista de partifipantes
    // Assim, tendo acesso a lista
  const list = useRecoilValue(listaParticipantesState)

  // definindo um erro
  const setErro = useSetRecoilState(erroState)

  // e agora de fato nos retornamos a lista, recebendo um novo nome de participante
  return (nomeNovoParticipante: string) => {
    // O 'useSetRecoilState' nos da acesso ao valor atual, e em seguida vamos retornar a lista contendo os valores atuais + o novo participante 

    // caso já exista o nome dentro da lsita, temos que bracar isso e retornar o erro
    if(list.includes(nomeNovoParticipante)){
      setErro('Nomes duplicados não são permitidos!')
      setTimeout(() => {
        setErro("") // sendo exibido os erros por 5seg
      }, 5000) //acontece durante 5seg
      return
    }
    return setLista(listaAtual => [...listaAtual, nomeNovoParticipante])
  }
} 