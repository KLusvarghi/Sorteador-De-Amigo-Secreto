import { atom } from 'recoil';

// tendo que cada KEY ser única


// sendo esse atom uma lista de nomes
export const listaParticipantesState = atom<string[]>({ // passando um objeto de configuração nele
  // sendo a chave para acessar
  key: 'listaParticipantesState',
  // tendo que definir um estado inicial padrão
  default: []
});

// sendo um estado de erro
export const erroState = atom<string>({
  // sendo a chave para acessar
  key: 'erroState',
  default: ''
});
 

// sendo um estado para o resultado dos pparticipantes
export const resultadoAmigoSecreto = atom<Map<string, string>>({
  // sendo a chave para acessar
  key: 'resultadoAmigoSecreto',
  default: new Map()
});
 