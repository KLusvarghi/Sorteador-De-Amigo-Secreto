import { useRecoilValue } from "recoil"
import { listaParticipantesState } from "../atom"

export const useListaParticipantes = () => {

  // chamando o retorno do 'useRecoilValue' da lista de participantes que está em "atom.ts"
  
  return useRecoilValue(listaParticipantesState)
}