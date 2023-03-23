import { Card } from 'components/Card';
import { useListaParticipantes } from 'components/state/hook/useListaParticipantes';
import { useResultadoSorteio } from 'components/state/hook/useResultadoSorteio';
import { useState } from 'react';
import './Sorteio.css'


const Sorteio = () => {
  // pegando a lista de participantes
  const participantes = useListaParticipantes();

  // useState contendo o valor do participante da vez
  const [participanteDaVez, setparticipanteDaVez] = useState('');

  // estado para conter o amigo secreto do participante da vez
  const [amigoSecreto, setAmigoSecreto] = useState('');

  // pegando o valor do resutado
  const resultado = useResultadoSorteio();

  // função que irá exibir o amigo secreto que a pessoa tirou
  const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    // verificando se dentro de "resultado" há o "participanteDavez"
    if (resultado.has(participanteDaVez)) {
      // pegando o resultado do amigo secreto do "participanteDaVez"
      setAmigoSecreto(resultado.get(participanteDaVez)!); // ele me dará erro, mas colocamos um "!" para dizer que sabemos o que estamos fazendo
    }
  };

  return (
    <Card>
      <section className="sorteio">
        <h2>Quem vai tirar o papelzinho?</h2>
        <form onSubmit={sortear}>
          <select
            required
            name="participanteDavez"
            id="participanteDavez"
            placeholder="Selecione o seu nome"
            value={participanteDaVez}
            onChange={(evento) => setparticipanteDaVez(evento.target.value)}
          >
            <option>Selecione seu nome</option>
            {participantes.map((participante) => (
              <option key={participante}>{participante}</option>
            ))}
          </select>
          <p>Clique em em sortear para ver quem é seu amigo secreto!</p>
          <button className="botao-sortear">Sortear</button>
        </form>
        {/* caso exista 'amigoSecreto' ele exibe o paragrafo e colcoando a role de 'alet' para que possamos capturar ela no test */}
        {amigoSecreto && (
          <p className="resultado" role="alert">
            {amigoSecreto}
          </p>
        )}
        <footer className="sorteio">
          <img
            src="/imagens/aviao.png"
            className="aviao"
            alt="Um desenho de um avião de papel"
          />
        </footer>
      </section>
    </Card>
  );
};

export default Sorteio;
