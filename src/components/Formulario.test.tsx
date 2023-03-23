import { act, fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Formulario from './Formulario';

// JEST permite que a gente agrupe os testes de forma semântica
  // chamando a função "describe" que é parecisa com a "test"
  // sem seguida damos o nome a ele e chamamos uma arrow function colcoando todos os testes dentro dela

describe('o comportamento do Formulario.tsx', () => {


  // Jest

  // chamando uma função da biblioteca 'jest'
  // recebendo dois argumentos, o primeiro arguemnto o que eu quero testar, o nome, a descrição deste test
  // e o segundo arguemto a implementação do teste em si
  test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
    // sendo a priemira cosia que temos que fazer é renderizar esse component
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>,
    );

    // Sendo funções da biblioteca TESTING LIBARY

    // encontrar no  DOM o input
    // e precisamos ter acesso a tela, tendo que importar o 'screen' da libary
    // e em seguinda eu quero encotrar esse input lá dentro
    // inicialmente eu quero encontrar o input pelo placeholder, usando a função 'getByPlaceholderText'
    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes',
    );

    // encotrar o botão
    // e dessa vez que quero encontrar o componente pela responsabilidade do botao dentro do formulario
    // querendo encontrar pela responsabilidade de 'submeter' como a função 'getByRole'
    // sendo a 'Role' do botão no html 'button'
    const botao = screen.getByRole('button');

    // Sendo funções da biblioteca JEST

    // garantir que o input esteja no documento
    expect(input).toBeInTheDocument();

    // garantir que o input esteja no documento
    expect(botao).toBeDisabled();
  });

  // esse teste irá apenas simular o que o usuário faria, de preencher, submeter, etc...
  test('adicionar um participante caso exista um nome preenchido', () => {
    // ao renderizar, como colocamos o "recoilroot" e dentro dele colocamos o "Formulario", temos que fazer o mesmo
    // Assim, renderizando o formulário dentro do recoilroot
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>,
    ); //renderiza o formulario
    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes',
    ); // pega o input
    const botao = screen.getByRole('button'); // pega o button

    // inserir um valor no input
    // sendo assim o 'fireEvent' nos pergunta: o que queremos disparar?
    // no caso o "change" do input
    // O "change" espera dois elementos
    // Qual elemento vai disparar o evento
    // E qual que são as opções que vamos passar
    fireEvent.change(input, {
      // O target tem que ter um value
      target: {
        value: 'Joãozinho inho',
      },
    });

    // clicar no botão de submeter
    // Utilziando o "fireEvent" para disparar algo
    // E o 'click' em seguida passando o componente
    fireEvent.click(botao);

    // garantir que o input esteja com o foco ativo
    // utilziando o 'expect'
    // Dizendo para qual componente que esperamos
    // E passamos o que esperamos dele
    expect(input).toHaveFocus();

    // garantir que o input não tenha valor
    // Dizendo que esperamos que o input tenha um value de '  ""  '
    expect(input).toHaveValue('');
  });

  test('nomes duplicados não podem ser adicioandos na lista', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>,
    );
    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes',
    );
    const botao = screen.getByRole('button');

    // fazendo com que o teste insira o mesmo nome duas vezes para que de erro
    fireEvent.change(input, {
      target: {
        value: 'Joãozinho inho',
      },
    });
    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: 'Joãozinho inho',
      },
    });
    fireEvent.click(botao);

    // pegamos a tela com 'screen', e queremos um role de alerta
    const mensagemErro = screen.getByRole('alert');

    // esperando a 'masagemErro' e o seu conteudo com 'textContext'
      // tendo que essa mensagem de erro ser identica a que está em "useAddParticipante"
    expect(mensagemErro.textContent).toBe('Nomes duplicados não são permitidos!');
  });

  // como um teste deveria falhar por um UNICO motivo, não vamos fazer o novo teste nele
  test('a mesagem de erro deve sumir após os timers', () => {
    // para fazer algo esperar de fato N segundos, pedindo para o JEST usar fake times
    // isso quer dizer que qualquer timer que alguem usar lá no javascript vai ser de mentira
    jest.useFakeTimers();

    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>,
    );
    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes',
    );
    const botao = screen.getByRole('button');

    fireEvent.change(input, {
      target: {
        value: 'Joãozinho inho',
      },
    });
    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: 'Joãozinho inho',
      },
    });
    fireEvent.click(botao);

    // pegamos a tela com 'screen', e queremos um role de alerta
    // let mensagemErro = screen.getByRole('alert');
    let mensagemErro = screen.queryByRole('alert');

    // esperando a 'masagemErro' esteja apenas no documento
    expect(mensagemErro).toBeInTheDocument();

    // esperar N segundos
    // rodanod todos timers
    // Porem, ele nos retorna um erro dizendo que algum update dentro do teste e não estava dentro da função "act"
    act(() => {
      jest.runAllTimers();
    });

    // quando ele vai no screen e utilizando o método "get", e se ele não encontrar, ele irá falhar
    // E caso eu queira fazer uma consulta e caso ele não encontre o elemento, ele estará OK, não dará erro, assim tendo que utilizar o "query"
    mensagemErro = screen.queryByRole('alert');
    expect(mensagemErro).toBeNull();
  });

});