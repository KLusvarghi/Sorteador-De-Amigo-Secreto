import { useRecoilValue } from "recoil"
import { resultadoAmigoSecreto } from "../atom"

export const useResultadoSorteio = () => {
  // Retoranndo a função do recoil "useRecoilValue" do "resultadoAmigoSecreto"
  return useRecoilValue(resultadoAmigoSecreto)
}