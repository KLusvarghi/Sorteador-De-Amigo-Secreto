import { useListaParticipantes } from "./state/hook/useListaParticipantes"

const ListaParticipantes = () => {
  
  // lista dos participantes
  // chamando o hook 'useListaParticipantes' que nos devolve uma lsita de participantes
  const participantes:string[] = useListaParticipantes()
  
  return(
    <ul>
      {participantes.map(participante => (
        // não precisando deixar explicito a role="list", por que um component de lista já tem essa role por padrão
        <li key={participante}>{participante}</li>
      ))}
    </ul>
  )
}

export default ListaParticipantes