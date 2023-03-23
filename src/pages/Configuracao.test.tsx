import React from "react";
import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Configuracao from "./Configuracao";

// não precisando envolver esee cara no ROuter para fazer o teste passar, podendo apenas mockar o navigate
 // mocando o react router
  const mockNavegacao = jest.fn()

  jest.mock('react-router-dom', () => {
    // retornando um métod chamado "useNavigate"
    return {
      useNavigate: () => mockNavegacao
    }
  })

describe('a pagina de configuracoes', () => {
  test('deve ser renderizada corretamente', () => {
    
    // SNAPSHOT
      // Como esse teste irá servir para a página de "Configuracao", que é uma página meramente visual, que irá apenas renderizar os componentes
      // guardando o resultado da renderização ou 'render' dentro de um 'containe'
    const { container } = render(
      <RecoilRoot>
        <Configuracao/>
      </RecoilRoot>
    )

    // basicamente iremos guardar a foto (estado inicial) do 'conteiner' no primeiro teste
      // E para todos os outras vezes (testes), iremos comparar a 'foto nova' com a que foi 'guardada' 
        // e caso a comparação seja diferente, o teste falha
    expect(container).toMatchSnapshot()
  })
})