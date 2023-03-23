import { realizaSorteio } from "./realizaSorteio"

describe('dado um sorteio de amigo secreto', () => {
  test('cada participante não sorteie o próprio nome', () => {

    const participantes = [
      'Ana',
      'fred',
      'mike',
      'piti',
      'juju',
      'nathi'
    ]

    // atribuindo a 'sorteio' a função que retorno o sorteio passando a lsita de participantes
    const sorteio = realizaSorteio(participantes)

    // fazendo um loop por cada participante
    participantes.forEach(participante => {

      // atribuindo a 'amigoSecreto' o amigo secrendo de 'participante'
      const amigoSecreto = sorteio.get(participante)

      // esperando que o 'amigoSecreto' tirado por 'participante' não sejá igual ao próprio 'participante'
      expect(amigoSecreto).not.toEqual(participante)
    })

  })
})