// hook que contem o resultado e expande ele para o Recoil

import { realizaSorteio } from "components/state/helpers/realizaSorteio"
import { useSetRecoilState } from "recoil"
import { resultadoAmigoSecreto } from "../atom"
import { useListaParticipantes } from "./useListaParticipantes"

export const useSorteador = () => {
  const participantes = useListaParticipantes()

  const setResultado = useSetRecoilState(resultadoAmigoSecreto)
  return () => {
    const resultado = realizaSorteio(participantes)
    console.log(resultado)
      setResultado(resultado)       
  }
}