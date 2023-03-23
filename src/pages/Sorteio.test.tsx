import { fireEvent, render, screen } from '@testing-library/react';
import { useListaParticipantes } from 'components/state/hook/useListaParticipantes';
import { useResultadoSorteio } from 'components/state/hook/useResultadoSorteio';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { RecoilRoot } from 'recoil';
import Sorteio from './Sorteio';

// precisando mocar a lista de participantes, para que não se utilize a lsita real e sim uma copia fake dela
jest.mock('components/state/hook/useListaParticipantes', () => {
  // queremos que ele retorne um objeto
  return {
    // tendo acesso ao hook 'useListaParticipantes'
    // dizendo queremos que esse hook seja exatamente um mock do jest
    // porem dizendo que esse cara precisa se comportar como uma função
    useListaParticipantes: jest.fn(),
  };
});

// E mocando "useResultadoSorteio" tambem
jest.mock('components/state/hook/useResultadoSorteio', () => {
  return {
    useResultadoSorteio: jest.fn(),
  };
});

describe('na pagina de sorteio', () => {
  // criando uma lsita de participantes
  const participantes = ['Ana', 'Catarina', 'Jorel'];

  // no ultimo test ele depende do resultado para exibir o alert, então tendo que mockar o "resultado"
  // para iniciar ele com alguns valores, basta criar um array com arrays dentro dele
  const resultado = new Map([
    ['Ana', 'Jorel'],
    ['Jorel', 'Catarina'],
    ['Catarina', 'Ana'],
  ]);

  // pedindo para o jest que antes do de cada test que estiver dentro deste 'discribe' ele:
  // faça a dublagem e indique o comportamento do MOCK criado logo acima
  beforeEach(() => {
    // querendo que o 'useListaParticipantes' tenha comportamento de mock (que seja dublado), e uma vez que o jest dublar esse cara, pedimos que ele mock até o retorno com 'mockReturnValue', dizendo que ele irá retornar uma lista de 'participantes'
    (useListaParticipantes as jest.Mock).mockReturnValue(participantes);

    // mockando "resultado"
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
  });

  test('todos os participantes podem exibir o seu amigo secreto', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>,
    );

    // pegando as opçoes pela role
    const opcoes = screen.queryAllByRole('option');

    // esperamos que as opções tenham um tamanho de participantes.length
    expect(opcoes).toHaveLength(participantes.length + 1); // por que já vem um option por padrão
  });

  // Esse teste irá testar apenas se o amigo secreto é exibido na tela
  test('o amigo secreto é exibido quando solicitado', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>,
    );

    // pegando o valor do inpit pelo placeholder e setando  valor da priemira posição
    const select = screen.getByPlaceholderText('Selecione o seu nome');

    // ao evento de change
    fireEvent.change(select, {
      target: {
        value: participantes[0],
      },
    });

    // pegando o botão
    const botao = screen.getByRole('button');

    // adicioanndo evento de click ao botao
    fireEvent.click(botao);

    //E para exibir o amigo secredo vamos exibir com um alert
    const amigoSecreto = screen.getByRole('alert');

    // e esperamos que 'amigosecreto' esteja no documetno
    expect(amigoSecreto).toBeInTheDocument();
  });

  test('esconde o amigo secreto do sorteado depois de 5 segundo', () => {
    jest.useFakeTimers();

    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>,
    );
    // pegando o select
    const select = screen.getByPlaceholderText('Selecione o seu nome');

    // adicionando o evento de onChange
      // a cada vez que o valor do "select" mudar ele irá pegar o 'target', que pegarar o 'value' e passará esse valor para "participantes" na segunda posição
    fireEvent.change(select, { target: { value: participantes[0] } });

    // pegando o botão
    const button = screen.getByRole('button');

    // adicioanndo um evento de click nele
    fireEvent.click(button);

     // esperar N segundos
    // rodanod todos timers
    // Porem, ele nos retorna um erro dizendo que algum update dentro do teste e não estava dentro da função "act"
    act(() => {
      // rodando o tempo
      jest.runAllTimers();
    });

    // pegando o alert
    const alerta = screen.queryByRole('alert');

    // esperando que o 'alert' não esteja na tela
    expect(alerta).not.toBeInTheDocument();
  });
});
