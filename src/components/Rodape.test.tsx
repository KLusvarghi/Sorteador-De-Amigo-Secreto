import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Rodape from './Rodape';
import { useListaParticipantes } from './state/hook/useListaParticipantes';

  // Mocamos nossa lista de participantes
  jest.mock('./state/hook/useListaParticipantes', () => {
    return {
      useListaParticipantes: jest.fn()
    }
  })

  // para ter acesso a função e saber se ela foi chamada ou não, criamos uma constante que terá como valor um FUNÇÃO jest
  const mockNavegacao = jest.fn()

  // Precisamos garantir 

  // mocando o react router
  jest.mock('react-router-dom', () => {
    // retornando um métod chamado "useNavigate"
    return {
      // queremos que o useNavigae seja retorne uma função
        // porem esse cara precisa retornar uma função que retorna uma outra função
      useNavigate: () => mockNavegacao

      // para todo hook que retorna uma função
      // isso se dá por que, no arquivo 'Rodape.tsx' fazemos o seguinte: const navigate = useNavigate()
        // sendo assim uma função que atribui outra, e para chamar tem que fazer dessa mesma maneira, uma função que chama outra
    }
  })

describe('onde não exitem participantes suficientes', () => {
  // antes de cada teste, definimos a lista de participantes
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue([]) 
  })
  test('a brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>,
    );

    // pegando potão
    const button = screen.getByRole('button');

    // esperando que p botão esteja desabilitado
    expect(button).toBeDisabled();
  });
});

describe('quando existem participantes suficientes', () => {
  // antes de cada teste, definimos a lista de participantes
  beforeEach(() => {
    (useListaParticipantes as jest.Mock).mockReturnValue(['Ana', 'Joao', 'pedro']) 
  })

  test('a brincadeira pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>,
    );

    // pegando potão
    const button = screen.getByRole('button');

    // esperando que o botão não esteja desabilitado
    expect(button).not.toBeDisabled();
  });

  // para ter certeza que o método "useNavigate foi chamado", criamos mais um test para isso
  test('a brincadeira foi iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );
    
      // pegando potão
      const button = screen.getByRole('button');

      // para disparar o evento usaremos o 'fireEvent'
      fireEvent.click(button)

      // esperando que ao clicar no botão, nosso mock "mockNavegacao" sejá chamado
      // expect(mockNavegacao).toHaveBeenCalled()

      // ou podemos especificar a quantidade de vezes que ele foi chamado tambem
      expect(mockNavegacao).toHaveBeenCalledTimes(1)

      // especificando a url que foi chamado
      expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
      
  })
});
