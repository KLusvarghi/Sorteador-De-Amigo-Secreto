import { render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import ListaParticipantes from './ListaParticipantes';
import { useListaParticipantes } from './state/hook/useListaParticipantes';


// Mock, ou mockar algo
  // é umsa função que se utiliza para fingir algo
  // neste caso queremos que ele finga o comportamento do hook 'ListaParticipantes'

  // tendo que mocar de fato, que quando alguem pedir a lsita de participantes de './state/hook/useListaParticipantes'
  jest.mock('./state/hook/useListaParticipantes', () => {
    // queremos que ele retorne um objeto
    return {
      // tendo acesso ao hook 'useListaParticipantes'
        // dizendo queremos que esse hook seja exatamente um mock do jest
        // porem dizendo que esse cara precisa se comportar como uma função
      useListaParticipantes: jest.fn()
    }
  })

// Describe é a mesma coisa que "Criar um novo senário"
describe('uma lista vazia de partifipantes', () => {

  // pedindo para o jest que antes do de cada test que estiver dentro deste 'discribe' ele:
    // faça a dublagem e indique o comportamento do MOCK criado logo acima
    beforeEach(() => {
      // querendo que o 'useListaParticipantes' tenha comportamento de mock (que seja dublado), e uma vez que o jest dublar esse cara, pedimos que ele mock até o retorno com 'mockReturnValue
      (useListaParticipantes as jest.Mock).mockReturnValue([]) // sendo ness eprimeiro senário, queremos um array vazio
    })

  test('deve ser renderizado sem elemetos', () => { //teste de como a lsita tem que ser quando está vazia
    render(
      // como nosso projeto esta todo envolvido no "RecoilRoot", sempre que criar um novo teste, temos que envolver o componente que iremos realizar os testes no 'ReacoilRoot'
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>,
    );

    // peganod todos os itens da lista
    // peganod elementos da tela com 'screen' e pegando todos as roles com 'listitem'
    const itens = screen.queryAllByRole('listitem');

    // esperando que 'itens' sejá um array vazio
    expect(itens).toHaveLength(0);
  });
});

describe('uma lista preenchida de partifipantes', () => {
  // criando uma lista ficticia de participantes
  const participantes = ['ana', 'catarina'] 

  beforeEach(() => {
  // já neste teste queremos que ele retorne uma lsita de participantes
  (useListaParticipantes as jest.Mock).mockReturnValue(participantes) // sendo ness eprimeiro senário, queremos um array vazio
  })

  test('deve ser renderizado sem elemetos', () => { //teste de como a lsita tem que ser quando está preenchida
    render(
      // como nosso projeto esta todo envolvido no "RecoilRoot", sempre que criar um novo teste, temos que envolver o componente que iremos realizar os testes no 'ReacoilRoot'
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>,
    );

    // peganod todos os itens da lista
    // peganod elementos da tela com 'screen' e pegando todos as roles com 'listitem'
    const itens = screen.queryAllByRole('listitem');

    // esperando que 'itens' sejá do tamanho de 'participantes.length'
    expect(itens).toHaveLength(participantes.length);

    // porem ele irá me dizer que esperava 2 intens mas recebeu nenhum
      // isso se da por que em 'ListaParticipantes.tsx' a lista que ele tem está smepre vazia

  });
});
