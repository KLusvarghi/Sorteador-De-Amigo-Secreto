import { useRef, useState } from 'react';
import { useAddParticipante } from './state/hook/useAddParticipante';
import { useMensagemErro } from './state/hook/useMensagemErro';
import './Formulario.css'


const Formulario = () => {
  const [nome, setNome] = useState('');
  // sendo um hook que faz referencia ao "input" por isso tipando esse valor para ele
  // sendo que ele pode ser de valor nulo, como valor inicial
  const inputRef = useRef<HTMLInputElement>(null);

  // fazendo uma referencia ao hookAddParticioante
  const adicionarNaLista = useAddParticipante();

  // pegando a mensagem de erro
  const mensagemErro = useMensagemErro();

  const adicionarParticiopante = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    adicionarNaLista(nome);
    setNome('');
    // se a 'current' que pode nou não existir, e se existir a gente quer dar o foco nele
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={adicionarParticiopante}>
      <div className="grupo-input-btn">
        <input
          ref={inputRef}
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          type="text"
          placeholder="Insira os nomes dos participantes"
        />
        <button disabled={!nome}>Adicionar</button>
      </div>
      {/* caso exista uma mensagem de erro ele exibe, caso contrário, não exibe */}
      {/* e como definimos uma role de alert no 'test', precismaos de um elemento que renha role de alert */}
      {mensagemErro && <p role={'alert'}>{mensagemErro}</p>}
    </form>
  );
};

export default Formulario;
