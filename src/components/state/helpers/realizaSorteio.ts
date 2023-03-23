import shuffle from "just-shuffle"


// função que recebe uma lsita de particiantes
export function realizaSorteio(participantes: string[]){
  // implementando aqui o que tinhamos feito no hook 'useSorteador'

   // atribuindo a variavel o valor total da lista de partificpantes
    const totalParticipantes = participantes.length    

    // utilizaremos um biblioteca 'just-shuffle' para embaralhar
      // apenas chamando a função 'shuffle' e passando a lista
    const embaralhado = shuffle(participantes)

    // criando uma constante que irá agrupar o resultado, podendo uilziar a estrutura de dados 'Map' que é um 'dicionario'
      // onde esse map terá uma chave que é string e um valor que é uma string tambem
    const resultado = new Map<string, string>() //começando vazio


    // loop que percorrer o tamanho toal de participantes
    for(let index = 0; index < totalParticipantes; index++){

      // a logica será basicamente fazer com que o primeiro participante pegue o segundo da lista, o segundo pegue o terceiro da lista, e assim por diante
      // porem, quando chegar ao ultimo participante da lista ele pegue o primeiro participante da lista

      const indexAmigo = index === (totalParticipantes -1) ? 0 : index + 1;
      
      // pegando o resultado e setando, passando um participante e em seguida quem esse participante tirou
      resultado.set(embaralhado[index], embaralhado[indexAmigo])

    }

    // e por fim retornando 'resultado'
    return resultado
}