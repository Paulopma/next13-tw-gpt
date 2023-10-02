import { NextResponse, NextRequest } from 'next/server'
import OpenAI from 'openai'

export async function POST(request: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const { message } = await request.json()

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'filtre apenas os nomes de pessoas dessa conversa, seguido da idade, localização (se houver), e telefone (se houver), excluindo os rementes. Seguindo esse padrão: nome - idade - localização - telefone',
      },
      {
        role: 'user',
        content:
          '[20:02, 01/09/2023] +55 61 8172-1188: Vinícius Costa - 31 anos\nFrequentador Restaurante Comunitario do Sol Nascente\n[20:07, 01/09/2023] +55 61 8598-1641: João Luiz do Nascimento Jambeiro de Moraes\n44 anos\nUsuário do viaduto de Sobradinho\n[21:17, 01/09/2023] +55 61 9592-0893: Ivan franco Gomes da Silva 21 anos usuário do restaurante sol nascente\n[13:40, 02/09/2023] +55 61 9303-3558: Perfil 6\n[13:40, 02/09/2023] +55 61 9303-3558: Paulo Victor Nogueira Fernandes - 22 anos\n[13:48, 02/09/2023] +55 61 9159-4111: Hudson Vidal 28 anos\n[14:11, 02/09/2023] +55 61 8176-3839: Rafaela Kamila \nMoro no sol nascente e frequento o restaurante\n[14:11, 02/09/2023] +55 61 9206-6724: Oi moro em Sobradinho\n[14:41, 02/09/2023] +55 61 9249-7913: Matheus torquato 25 anos usuário do viaduto de Sobradinho\n[14:43, 02/09/2023] +55 61 9156-8547: Beatriz Dantas, 25 anos, Sobradinho\n[14:43, 02/09/2023] +55 61 9156-8547: Beatriz Dantas, 25 anos,  Sobradinho\n[14:48, 02/09/2023] +55 61 9206-6724: Marlene Ribeiro 37 anos usuário do viaduto de Sobradinho\n[15:55, 02/09/2023] +55 61 8130-8235: Leandro, 30 anos, trabalho na Asa Norte.\n[18:03, 02/09/2023] +55 61 8540-2738: Oi\n[18:03, 02/09/2023] +55 61 8540-2738: Mônica Rodrigues Chaves\n[18:03, 02/09/2023] +55 61 8540-2738: Tenho ARTROSE COXOFEMORAL BILATERAL\n[18:03, 02/09/2023] +55 61 8540-2738: Aguardo cirurgia na Rede Sarah\n[08:13, 03/09/2023] Iremar Barcelar - Elenco: Beatriz Dantas, 25 anos, Sobradinho\n[08:17, 03/09/2023] +55 61 8409-9370: Ademir santos 37 anos morador do sol nascente\n[11:55, 03/09/2023] Iremar Barcelar - Elenco: andre professor em qual das escilas, obrigada\n[13:05, 03/09/2023] +55 61 9976-1803: UDF\n[14:36, 03/09/2023] +55 61 9627-8981: Boa tarde a todos,alguém sabe me informar se ainda estão precisando de gente para a campanha do GDF? Agradeço desde já.\n[14:49, 03/09/2023] Iremar Barcelar - Elenco: -professor ou aluno da Escola técnica  Santa Maria \n4- pro prodessor e aluno há UNDF\n[14:57, 03/09/2023] +55 61 8595-9762: Nesse job, já sabe qual será o valor e depois de quantos dias paga ?\n[15:00, 03/09/2023] Iremar Barcelar - Elenco: CAMPANHA DO GOVERNO, 400,00 CACHE, PREVISÃO DE 60 DIAS DE FATURAMENTO ( ESTA OCORRENDO MUITOS ATRASOS) MASI AAAAZYALGUMA COISA GR\n[15:00, 03/09/2023] Iremar Barcelar - Elenco: GRAZY\n[15:01, 03/09/2023] +55 61 8595-9762: 👍\n[15:01, 03/09/2023] +55 61 8595-9762: Só uma dica , sempre é bom colocar essas informações, obrigada!\n[16:02, 03/09/2023] Iremar Barcelar - Elenco: Grazi, ja falei contigo no outro grupo, esse grupos de castings foram criados por nos, te bloqueia, mas v queria pedir a gentilezac continua tendo acesso nos grupos, quero pedir a gentileza, de que cuidemos dos grupos\n[17:10, 03/09/2023] +55 61 8176-3839: Tbm gostaria de sempre ter essas informações, sempre posto mando fotos e até hoje nem uma resposta de que as pessoas já foram selecionadas eu tive\n[17:49, 03/09/2023] Iremar Barcelar - Elenco: tem varias\n[17:49, 03/09/2023] Iremar Barcelar - Elenco: so olhar no outdoors\n[17:49, 03/09/2023] Iremar Barcelar - Elenco: busdoor\n[17:49, 03/09/2023] Iremar Barcelar - Elenco: paradara de onibus etc\n[17:50, 03/09/2023] +55 61 8178-3605: Sanderson Brito de Sousa\n39 anos',
      },
      {
        role: 'assistant',
        content:
          'Vinícius Costa - 31 anos - Frequentador Restaurante Comunitário do Sol Nascente\nJoão Luiz do Nascimento Jambeiro de Moraes - 44 anos - Usuário do viaduto de Sobradinho\nIvan Franco Gomes da Silva - 21 anos - Usuário do Restaurante Sol Nascente\nPaulo Victor Nogueira Fernandes - 22 anos\nHudson Vidal - 28 anos\nRafaela Kamila - Moro no Sol Nascente e frequento o restaurante\nMatheus Torquato - 25 anos - Usuário do viaduto de Sobradinho\nBeatriz Dantas - 25 anos - Sobradinho\nMarlene Ribeiro - 37 anos - Usuário do viaduto de Sobradinho\nLeandro - 30 anos - Trabalho na Asa Norte\nMônica Rodrigues Chaves - Tenho ARTROSE COXOFEMORAL BILATERAL - Aguardo cirurgia na Rede Sarah\nAdemir Santos - 37 anos - Morador do Sol Nascente\nSanderson Brito de Sousa - 39 anos',
      },
      {
        role: 'user',
        content:
          '[12:45, 13/01/2023] +55 61 9901-3460: Fabio Conde - 34 anos - Taguatinga Norte - 61.986622970\n[12:49, 13/01/2023] +55 61 9901-3460: Nome: Patrícia  Idade: 32 Telefone: 991497710 Local onde mora: QNL - Taguatinga Norte\n[12:50, 13/01/2023] +55 61 9901-3460: Bárbara Martins  61 991783615 24 anos  Taguatinga\n[12:55, 13/01/2023] +55 61 9901-3460: Will Oliveira/25 anos / Taguatinga Norte-DF\n[12:56, 13/01/2023] +55 61 9901-3460: Nome: Diadorim Silva\nIdade: 25 anos\ntelefone: 61998306348\nmora: Taguatinga Norte\n[12:58, 13/01/2023] +55 61 9901-3460: Nome :Isabela Ribeiro /onde mora :Ceilândia /P Sul idade :27 anos\n[13:00, 13/01/2023] +55 61 9901-3460: Elane Araújo - 34 anos - Taguatinga\n[13:01, 13/01/2023] +55 61 9901-3460: Alessandra dos Santos   ,sol nascente,29 anos\n[13:01, 13/01/2023] +55 61 9901-3460: Rita de Cássia                                                  Ceilândia.    40 anos 61 982981006/ 984898972 WhatsApp\n[13:02, 13/01/2023] +55 61 9901-3460: Nome: Maria Helena Freire Idade: 27 Telefone: (84) 99811-4373 Local onde mora: Ceilândia',
      },
      {
        role: 'assistant',
        content:
          'Fabio Conde - 34 anos - Taguatinga Norte - 61.986622970\nPatrícia - 32 anos - 991497710 - QNL, Taguatinga Norte\nBárbara Martins - 24 anos - 61 991783615 - Taguatinga\nWill Oliveira - 25 anos - Taguatinga Norte-DF\nDiadorim Silva - 25 anos - 61998306348 - Taguatinga Norte\nIsabela Ribeiro - 27 anos - Ceilândia\nElane Araújo - 34 anos - Taguatinga\nAlessandra dos Santos - 29 anos - Sol Nascente\nRita de Cássia - 40 anos - 61 982981006/ 984898972 - Ceilândia\nMaria Helena Freire - 27 anos - (84) 99811-4373 - Ceilândia',
      },
      {
        role: 'user',
        content: message,
      },
    ],
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  const data = response.choices[0].message.content
  console.log('prompt_tokens:', response.usage?.prompt_tokens)
  console.log('response_tokens:', response.usage?.completion_tokens)

  return NextResponse.json(data)
}
