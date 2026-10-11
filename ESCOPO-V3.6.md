# Apê Parque Praia — Escopo V3.6 consolidado

Atualização: 10/10/2026
Destinatário: Codex
Base obrigatória: demonstração V3 validada, com refinamentos confirmados em 10/10/2026.

## 1. Objetivo e fonte de verdade

Atualizar o site Apê Parque Praia mantendo a estrutura e a estética aprovadas da demonstração V3 / escopo V3.5. Incorporar os cards, endereços, links Google Maps e a página separada de praias descritos neste documento. O site deve ser mobile first.

Este documento incorpora as instruções posteriores do proprietário, que prevalecem sobre a V3.5 anterior. O projeto principal está em `site`; a publicação atual utiliza `site/dist` na Vercel. A demonstração desta rodada fica em `demonstracao-v3.6`, separada do site publicado. A demonstração foi aprovada em 10/10/2026. Nesta etapa estão autorizadas implementação em `site`, commit, envio ao GitHub e atualização automática da Vercel pela branch `main`.

As regras da cozinha e a seção de sacada estão disponíveis em `site/dist/index.html` e devem ser herdadas sem reescrita. Os dois vídeos enviados são referências de movimento; não são vídeos de check-in ou de abertura da sacada.

### Prioridade das especificações

1. Aplicar a ordem de seções e as alterações explícitas deste documento.
2. Preservar integralmente a V3.5 em tudo que não foi alterado aqui.
3. Preservar os textos de cozinha e sacada exatamente como constam na base original.
4. Não inventar textos, mídias, nomes de arquivos, endereços ou URLs ausentes.

## 2. Ordem definitiva da página principal

| Ordem | Seção | Comportamento |
| --- | --- | --- |
| 1 | Boas-vindas e informações essenciais | Vertical; apresentação e os três cartões de contato, Wi-Fi e checkout integrados nesta seção. |
| 2 | Como fazer check-in | Vertical; descrição breve provisória e espaço reservado para vídeo local. |
| 3 | Regras básicas | Vertical; conteúdo integral da imagem enviada. |
| 4 | Endereço e localizações | Primeiro trilho independente; 5 cartões agrupados à esquerda pelo scroll vertical. |
| 5 | Localizações importantes | Segundo trilho independente; 3 cartões; imediatamente após o primeiro. |
| 6 | Regras da cozinha | Vertical; preservar exatamente o conteúdo atual de `site/dist/index.html`. |
| 7 | Sacada | Vertical; preservar exatamente o conteúdo atual, inclusive a advertência de ausência de rede. |

As informações essenciais NÃO formam uma seção separada. Footer após a sacada. A página de praias é o único destino interno adicional solicitado.

## 3. Conteúdo confirmado

### Boas-vindas e informações essenciais

Mensagem fornecida:

> Seja bem-vindo ao nosso apê!
>
> Que bom ter vocês aqui, esse sonho só é completo com vocês! Desfrute de descanso e aconchego, preparamos tudo da melhor maneira pra você e sua família!

Exatamente três cartões verticais na seção de boas-vindas:

1. **Contato anfitriões:** Bárbara e Daniel. WhatsApp: (49) 99922-3452 e (49) 99822-3711. Links `https://wa.me/5549999223452` e `https://wa.me/5549998223711`.
2. **Wi-Fi:** rede `405 B`; senha `Montanharussanasacada26`. Manter capitalização exata; disponibilizar ação de cópia com resultado verdadeiro.
3. **Checkout:** até as **12h**.

A senha Wi-Fi e os contatos foram fornecidos para o guia. Esses dados integram o guia cuja implementação e publicação foram autorizadas pelo proprietário.

### Como fazer check-in

Descrição breve provisória; o texto definitivo será enviado posteriormente. Não inventar horários, códigos de entrada, documentos exigidos ou procedimentos de acesso. Espaço reservado para vídeo MP4 reproduzido dentro da página, com controles nativos e `playsinline`, sem autoplay e sem anexos/links externos. Não confundir os vídeos de referência com essa mídia futura.

### Regras básicas — texto da imagem

- Não é permitido fumar dentro do apartamento.
- Não é permitido Pets.
- Respeite o silêncio, especialmente entre 22h e 8h.
- Respeite a capacidade máxima de hóspedes informada na reserva.
- Não são permitidas festas ou eventos no apartamento.
- Cuide dos móveis, eletrodomésticos e utensílios como se fossem seus.
- Ao utilizar louças e utensílios, deixe-os limpos após o uso.
- Descarte o lixo nos locais indicados no prédio.
- ATENÇÃO: Ao sair, confira se portas, janelas e aparelhos estão devidamente fechados/desligados.
- Ao perceber qualquer problema ou dano, avise o anfitrião imediatamente.

Encerramento fornecido: **Tenham uma excelente estadia!**

### Cozinha e sacada

Conteúdo integral herdado do site atual, incluindo as seis regras, notas sobre sugestões e plantas, avisos da sacada e espaço para vídeo. Não repetir testes dessas partes já confirmadas. Não acrescentar instruções de manuseio ainda não enviadas.

## 4. Mecânica dos dois trilhos

### Scroll vertical e agrupamento horizontal

- O dedo continua deslizando para cima/baixo. Os cartões se deslocam horizontalmente; não depende de swipe lateral.
- Cada cartão chega da direita e se agrupa/sobrepõe à esquerda dos anteriores, com o cartão atual legível e ações utilizáveis. O efeito deve ser de agrupamento, e não apenas translação de uma fileira inteira sem sobreposição.
- Cada trilho utiliza sua própria timeline e ScrollTrigger para o movimento horizontal. Uma cena comum possui o único `pin`, mantendo a composição fixa; os trilhos usam `scrub`, `invalidateOnRefresh`, funções baseadas nas dimensões reais e `gsap.context()` / `ctx.revert()`. Essa arquitetura substitui pins concorrentes e compensações por evento de scroll.
- Ao concluir o primeiro agrupamento, há uma passagem vertical equivalente à altura real do primeiro painel, sem intervalo extra. Ao alinhar Localizações importantes sob o cabeçalho, inicia sua timeline horizontal independente. A composição permanece na mesma cena fixa, evitando troca de posicionamento entre pins.
- Ao subir, os cartões do segundo trilho se desagrupam para a direita, o pin libera a subida, o primeiro reaparece e também se desagrupa para a direita. Progresso determinado pelo scroll, sem execução única.
- Os dois trilhos são consecutivos no DOM e no fluxo visual. Não inserir mensagens de fim, seções intermediárias, indicadores demonstrativos, snapping obrigatório ou pausas artificiais entre eles.
- O espaço necessário à duração do pin não é uma seção vazia adicional: deve corresponder ao deslocamento efetivo dos cartões e terminar junto com a animação.
- Cabeçalho fixo respeitado no encaixe da cena comum. Altura e dimensão dos cartões ajustadas para celular; botões nunca cobertos no cartão ativo.
- Sem movimento reduzido: agrupamento conforme solicitado. Com movimento reduzido ou falha de carregamento do GSAP: conteúdo em fluxo vertical, sem pin e sem perda de ações.

### Referências analisadas

- `xxxxxxxxxxxxxxxx.mp4`: 4,59 s; captura do Mercado Livre, usada como referência visual de cartões sobrepostos/agrupados, não como conteúdo a copiar.
- `DEMONSTRAÇÃO DO QUE QUERO PARA O SITE.mp4`: 18,23 s; demonstra a progressão vertical da V3. A captura apresenta trechos sem cartões renderizados; não reproduzir telas vazias. Os refinamentos textuais posteriores definem o agrupamento horizontal definitivo.
- Diagramas enviados: duas animações independentes e reversíveis, agrupamento à esquerda ao descer e retorno à direita ao subir.

### Ordem do menu

Boas-vindas → Check-in → Regras básicas → Endereços → Praias → Locais importantes → Cozinha → Sacada. A entrada Praias fica imediatamente abaixo de Endereços e abre a página separada, sem inserir uma seção entre os dois trilhos.

### Âncoras que saltam e reiniciam o trilho

- Preservar as âncoras e a navegação aprovadas na V3.5.
- Ao acionar uma âncora de um dos trilhos, saltar para o início da seção correspondente e reiniciar esse trilho no primeiro card, com progresso inicial.
- A posição vertical e o progresso visual devem ser sincronizados: zerar somente uma variável de animação, deixando o scroll no meio do trilho, não atende ao requisito.
- O reinício deve funcionar mesmo após visita anterior ao trilho ou retorno a ele.
- Após o salto, a próxima rolagem continua controlando normalmente o agrupamento reversível.
- As âncoras das seções verticais continuam levando às respectivas seções.

## 5. Primeiro trilho — Endereço e localizações

Exibir exatamente os 5 cards abaixo, nesta ordem. Os cards 1 a 4 têm botão “Copiar endereço” e botão “Abrir no Google Maps”. O card 5 abre a página interna de praias.

### Card 1 — Você está aqui:

Texto de orientação: **Para delivery use esse endereço:**

Endereço exibido e copiado, sem CEP e sem incluir o apartamento na cópia:

```text
Av. Eugênio Krause, 3650 - Armação, Penha, SC
```

O complemento **Apto 405 B** permanece visível como informação separada no cartão, mas não integra o texto do botão Copiar endereço.

Google Maps: https://maps.app.goo.gl/vhy2hwgbArCSKm6D8

### Card 2 — Beto Carrero

Texto de orientação: **Para pedir Uber use esse endereço:**

Endereço:

```text
Rod. Beto Carrero World - Armação, Penha, SC
```

Google Maps: https://maps.app.goo.gl/Ey2z9bxL7MA628vf7

### Card 3 — Mercado Fort Atacadista 500m

Endereço:

```text
R. Abílio de Souza, 750 - Armação, Penha, SC
```

Google Maps: https://maps.app.goo.gl/nEbgWYMDvjEFjk8w5

### Card 4 — McDonald's 500m

Endereço:

```text
R. Abílio de Souza, 755 - Centro, Penha, SC
```

Google Maps: https://maps.app.goo.gl/DB61zqy2G5buGS8e9

### Card 5 — PRAIAS PENHA SC

Texto exato: **Para descobrir algumas praias clique nesse card**

- Criar apenas um card de entrada para as praias neste trilho.
- O card deve ser clicável e abrir uma página separada com as 9 praias especificadas adiante.
- As praias não devem virar cards adicionais deste primeiro trilho.
- Este card é uma navegação interna; não atribuir a ele um endereço ou link Google Maps que não foi fornecido.

### Fotografias dos cartões e transição

- Card 2: fotografia do Beto Carrero.
- Card 3: fotografia do Fort Atacadista.
- Card 4: fotografia do McDonald's.
- Adaptar ao tamanho do card sem distorção, com `object-fit: cover` e enquadramento específico.
- TODOS os cartões dos dois trilhos e os cartões de praias têm transição translúcida entre mídia superior e descrição/botões. Usar gradiente e superfície translúcida, sem corte abrupto.
- Usar as fotos fornecidas em `cards`: `beto carrero.jpg`, `fort atacadista.jfifs.webp` e `mcdonalds.jpg`, respectivamente nos cartões 2, 3 e 4. Arquivos localizados e inspecionados. Enquadrar cada imagem sem distorção e preservar a transição translúcida. Os botões ficam logo abaixo do endereço/descrição, sem alinhamento forçado no rodapé ou grande área branca vazia. Todos os cartões dos dois trilhos usam a mesma largura e altura, tendo os cartões 1 e 2 de Endereço e localizações como referência. A altura comum se adapta à largura do celular e cresce somente se necessário para não cortar conteúdo. Os botões continuam imediatamente após o endereço/descrição; eventual espaço restante fica abaixo dos botões. A área do trilho acompanha essa altura comum.

## 6. Segundo trilho — Localizações importantes

Exibir exatamente os 3 cards abaixo, nesta ordem. Todos têm botão “Copiar endereço” e botão “Abrir no Google Maps”.

### Card 1 — Farmácia FarmaFaita 24h - 3.5km

Informação: **somente essa é 24h**

Endereço:

```text
Av. Eugênio Krause, 1361 - Centro, Penha, SC
```

Google Maps: https://maps.app.goo.gl/p5XQHRo21ksyhWvg6

### Card 2 — Farmácia Preço Popular (fecha 22h) - 900m

Informação: **é caminho do beto carrero**

Endereço:

```text
Av. Eugênio Krause, 4578 - Armação, Penha, SC
```

Google Maps: https://maps.app.goo.gl/TAYbT8zAwaJcW1pCA

### Card 3 — Pronto Atendimento de Penha 24h - 4km

Endereço:

```text
R. Alfeu Jerônimo da Conceição, 225 - Centro, Penha, SC
```

Google Maps: https://maps.app.goo.gl/XYEQsjULLj4TLe5M8

## 7. Botões e conteúdo dos cards

- Cada botão Google Maps deve usar exatamente a URL fornecida para aquele local. Não substituir os links por buscas, coordenadas inferidas ou URLs genéricas.
- Os endereços dos cartões não exibem CEP e terminam em “Penha, SC”. Copiar o texto do respectivo endereço; no cartão de delivery, excluir “Apto 405 B”, que fica somente visível como complemento.
- Oferecer confirmação visual discreta de cópia bem-sucedida; se a cópia não puder ser executada, permitir selecionar o endereço sem indicar sucesso indevido.
- Preservar nomes, horários, distâncias, descrições e endereços fornecidos. Não recalcular distâncias ou alterar as informações por conta própria.
- Manter os botões utilizáveis durante a apresentação dos trilhos, com áreas de toque adequadas e sem sobreposição que impeça o clique.

## 8. Nova rota / página — Praias Penha SC

### Navegação e apresentação

- Criar uma rota interna separada para a página de praias. Convenção proposta para implementação: `/praias`; adaptar ao roteamento existente se necessário, mantendo o destino separado da página principal.
- O card “PRAIAS PENHA SC” deve apontar para essa rota.
- Identificar a página como “Praias Penha SC” e permitir voltar à página principal.
- Usar rolagem vertical natural. Esta página não tem trilho horizontal controlado por scroll.
- Fazer os cards aparecerem suavemente conforme entram na tela, mantendo a estética moderna da V3.5.
- Priorizar a experiência mobile first: cards de tamanho equilibrado, sem serem excessivamente grandes nem pequenos.
- Cada card tem foto na parte superior, transição translúcida entre a foto e a área de descrição, nome da praia, descrição integral abaixo e botão “Abrir no Google Maps”.
- Adaptar cada foto à área do card sem distorção; ajustar o enquadramento usando o arquivo real correspondente.
- Organizar em exatamente duas seções, na ordem abaixo, mantendo a ordem das praias dentro de cada seção.

### Seção 1 — Principais Praias com Selo Bandeira Azul (Qualidade Ambiental)

#### Praia da Bacia da Vovó

Pequena, de águas calmas e com formação de piscinas naturais na maré baixa, ótima para famílias e crianças.

Google Maps: https://maps.app.goo.gl/u1PH5Gtt3D3f2Sew8

#### Praia da Saudade (Prainha)

Fica no centro, tem boa estrutura de apoio, calçadão, e um dos visuais mais bonitos para o nascer do sol.

Google Maps: https://maps.app.goo.gl/GPHDRwrfrWhaezcZ9

#### Praia Vermelha

Visual mais selvagem, rodeada pela natureza e com ondas um pouco mais agitadas, muito procurada pelo surfe e por trilhas.

Google Maps: https://maps.app.goo.gl/JZmfYBGUEf1LAqD26

#### Praia Grande

Possui faixa de areia ampla, mar mais frio e agitado.

Google Maps: https://maps.app.goo.gl/wHetJT2fZpsPPYqT8

### Seção 2 — Melhores para Famílias e Crianças (Águas Calmas)

#### Praia Alegre

Uma das mais procuradas, com excelente infraestrutura de bares, restaurantes e mar calmo ideal para stand-up paddle.

Google Maps: https://maps.app.goo.gl/ExxvDqRYAqbevGdLA

#### Praia do Poá

Pequena, cercada por sombras naturais e com mar muito tranquilo.

Google Maps: https://maps.app.goo.gl/kYcorfhK6iP4Fc5m9

#### Praia de São Miguel

Antiga vila de pescadores, com mar calmo e ideal para quem busca tranquilidade (embora exija atenção a pontos de balneabilidade).

Google Maps: https://maps.app.goo.gl/RYo6pDcBZMMeguSL8

#### Praia da Armação

A maior da cidade (cerca de 6 km), com boa infraestrutura e pontos famosos para fotos.

Google Maps: https://maps.app.goo.gl/tDtcRdkdAn3ggVNh8

#### Praia do Cascalho

Localizada no bairro Armação do Itapocorói, é famosa por oferecer um dos pores do sol mais bonitos e comentados de Santa Catarina.

Google Maps: https://maps.app.goo.gl/FAdfNk6phT28TSZY9

Os títulos e descrições acima são conteúdo fornecido pelo proprietário e devem ser incorporados exatamente. Não adicionar textos de encerramento derivados de “Fim da página Praias Penha SC”, que apenas delimitava a solicitação original.

## 9. Imagens locais — instrução obrigatória para Codex

Buscar as fotos no diretório local informado pelo proprietário:

```text
projeto.apeparquepraia/fotos praias
```

1. Localizar a pasta real do projeto e esse diretório; o caminho informado não estabelece um caminho absoluto no computador.
2. Listar os arquivos efetivamente existentes antes de fazer referências a imagens no código.
3. Identificar a foto de cada praia pelo nome real do arquivo, conforme informado pelo proprietário: cada foto está nomeada com o nome da praia.
4. Registrar a correspondência entre praia e arquivo encontrado, respeitando espaços, acentos, extensão e capitalização reais.
5. Usar os arquivos locais correspondentes nas 9 praias; não inventar nomes como `praia-grande.jpg` sem constatar que esse arquivo existe.
6. Não gerar imagens substitutas nem buscar fotos externas por iniciativa própria.
7. Se uma imagem estiver ausente, ambígua ou a pasta não estiver acessível, registrar especificamente o que falta e solicitar o arquivo correto. Não usar foto de outra praia nem apresentar a associação como confirmada.

Pasta localizada em `C:/Users/felic/OneDrive/Área de Trabalho/projeto.apeparquepraia/fotos praias`. Correspondências confirmadas:

| Praia | Arquivo real |
| --- | --- |
| Bacia da Vovó | `Praia da Bacia da Vovó.png` |
| Saudade (Prainha) | `Praia da Saudade.png` |
| Vermelha | `Praia Vermelha.png` |
| Grande | `Praia Grande.png` |
| Alegre | `Praia Alegre.png` |
| Poá | `Praia do Poá.png` |
| São Miguel | `Praia de São Miguel.png` |
| Armação | `Praia da Armação.png` |
| Cascalho | `Praia do Cascalho.png` |

As descrições e agrupamentos são conteúdo fornecido pelo proprietário, não uma verificação atual de certificação Bandeira Azul, distâncias, horários de funcionamento ou balneabilidade.

## 10. Diretrizes de implementação

- Atualizar o projeto existente e manter a identidade visual, tipografia, cores, espaçamentos e demais comportamentos aprovados da V3.5.
- Separar os dados dos locais e praias da lógica de animação, para permitir conferir ordem, textos e URLs.
- Preservar a experiência vertical das cinco seções verticais comuns da página principal e das duas seções da página de praias.
- Evitar overflow horizontal da página fora da área controlada dos trilhos.
- Garantir navegação e ações acessíveis por teclado, foco visível e textos alternativos apropriados nas fotos reais.
- Respeitar a preferência por movimento reduzido, mantendo todos os conteúdos e links acessíveis.
- Usar a estrutura de arquivos e a tecnologia já adotadas no projeto; este documento não determina uma troca de plataforma.

## 11. Critérios de aceite

- [ ] Página principal segue as 7 seções na ordem especificada.
- [ ] Boas-vindas mantém mensagem e foto da base V3.5.
- [ ] Check-in tem descrição provisória e espaço reservado para vídeo local ainda não fornecido.
- [ ] Informações essenciais reúne os 3 cartões na seção de boas-vindas.
- [ ] Regras básicas, cozinha e sacada preservam integralmente a base V3.5.
- [ ] Primeiro trilho contém exatamente os 5 cards definidos, na ordem correta.
- [ ] Segundo trilho contém exatamente os 3 cards definidos, na ordem correta.
- [ ] Os trilhos ficam um abaixo do outro, sem “Fim do primeiro trilho”.
- [ ] Scroll vertical anima o agrupamento horizontal em ambos os trilhos.
- [ ] Ao subir, ambos os trilhos revertem o percurso e desfazem o agrupamento corretamente.
- [ ] Âncoras dos trilhos saltam para o início e reiniciam o primeiro card, sincronizando scroll e animação.
- [ ] Os 7 cards com endereço copiam seu endereço completo e usam suas URLs exatas.
- [ ] Card 5 abre a página separada de praias.
- [ ] Página de praias tem rolagem vertical natural e aparição suave dos cards.
- [ ] Página de praias tem as 2 seções, as 9 praias e todas as descrições e URLs exatas.
- [ ] Cada card de praia tem foto superior e transição translúcida para a descrição.
- [ ] Fotos foram localizadas em `projeto.apeparquepraia/fotos praias` e mapeadas a arquivos reais.
- [ ] Não há arquivos de imagem, endereços, URLs ou regras inventados.
- [ ] Somente os comportamentos novos foram conferidos em celular; nenhum teste desktop ou repetição de testes de conteúdo já confirmado.

## 12. Estado desta rodada e limites

- Fonte de conteúdo anterior localizada: `site/dist/index.html`.
- Fotos das nove praias localizadas e associadas aos arquivos reais.
- Conteúdo de boas-vindas, dados essenciais e regras básicas transcrito das imagens.
- Ordem definitiva de sete seções incorporada.
- Demonstração aprovada em `demonstracao-v3.6/index.html`; o código aprovado foi integrado ao projeto principal em `site/dist`.
- Texto definitivo e vídeo de check-in pendentes; vídeo da sacada pendente.
- Fotos comerciais Beto Carrero, Fort e McDonald's localizadas em `cards` e incorporadas à demonstração.
- Verificação limitada ao mobile e às novidades: agrupamento de ambos os trilhos, ida/volta, transição natural, âncoras e nova página de praias. Não executar testes desktop; não repetir testes da cozinha/sacada.
- Versão aprovada integrada em `site/dist`. Commit/push e atualização da Vercel autorizados; manter a árvore Git limpa ao concluir.

## 13. Conferência da demonstração — somente novidades em mobile

Tela utilizada: 390 × 844, com toque emulado. Nenhuma conferência desktop executada.

- Sete seções na ordem definitiva, com essenciais integrados às boas-vindas.
- Dois ScrollTriggers independentes: primeiro com cinco cartões e segundo com três.
- Avanço e retorno medidos nos progressos 0%, 50% e 100%: os cartões chegam à esquerda e retornam às posições iniciais à direita.
- Seções dos trilhos consecutivas; sem intermediários no DOM. O segundo começa após a passagem vertical natural.
- Âncora Endereços retorna ao start do ScrollTrigger com progresso inicial.
- Página de praias: nove cartões em dois grupos, sem overflow horizontal.
- Nenhum erro de execução observado na demonstração.
- Cozinha e sacada herdadas do HTML atual; não foram submetidas a testes repetidos.

Gravação local: `demonstracao-v3.6/demonstracao-mobile.mp4`. Ela mostra apenas os novos trilhos; não é o vídeo de instruções do check-in ou da sacada.

## Refinamento dos cartões de localizações importantes

- Farmácia FarmaFaita começa com F maiúsculo.
- Usar os arquivos reais fornecidos em `cards`: `farmafaita 24h.jfif`, `farmacia preço popular.webp` e `pa 24h.jpeg`. Na demonstração, as cópias servidas são `farmafaita-24h.jpg`, `farmacia-preco-popular.webp` e `pa-24h.jpg`.
- Fotos adaptadas sem distorção e com a mesma transição translúcida dos demais cartões.
- Os blocos de texto dos três cartões reservam a mesma altura, alinhando os botões de Copiar endereço e Google Maps. O Pronto Atendimento usa a mesma posição de ações das duas farmácias. Essa regra específica de alinhamento prevalece sobre o espaço imediato após a descrição apenas nestes três cartões.
- Enquadramento específico da Farmácia 24h: preservar a placa 24H e o nome da fachada, usando foto completa com fundo desfocado e transição translúcida, sem distorção.


## Solução de estabilidade implementada — cena fixa comum

Esta arquitetura prevalece sobre os refinamentos técnicos anteriores de fixação individual e compensação dinâmica. O comportamento visual e a ordem das seções permanecem aprovados.

- Um contêiner agrupa os dois trilhos e o conteúdo subsequente da página principal. Sua altura é medida uma vez, após as fontes e antes da criação da animação.
- Um único ScrollTrigger fixa esse contêiner durante todo o percurso dos dois trilhos. Não trocar pins ao passar do primeiro para o segundo.
- Timeline horizontal 1: somente os cartões de Endereço e localizações mudam de posição horizontal; título, painel e eixo vertical permanecem imóveis.
- Passagem entre trilhos: conteúdo desloca exatamente a altura do primeiro painel, sincronizado 1:1 à distância vertical de scroll. Não inserir espera, área vazia ou mensagem entre eles.
- Timeline horizontal 2: somente os cartões de Localizações importantes mudam na horizontal, com posição vertical do segundo painel constante.
- Ao concluir, a cena libera a rolagem da cozinha e sacada na posição contínua correta. Ao subir, todas as fases percorrem o caminho inverso.
- Cada trilho conserva seu próprio progresso e âncora que retorna ao primeiro cartão.
- Manter GSAP, ScrollTrigger, scrub, invalidateOnRefresh, gsap.context e ctx.revert.
- Não modificar margens, alturas, espaçadores ou a posição dos conteúdos seguintes a cada scroll. Removidos todos os ajustes de compensação das soluções anteriores.
- Fotos, textos, dimensões dos cartões e botões permanecem sem mudança nesta correção.

### Conferência específica da correção em mobile

390 × 844, com rolagem lenta, rápida e reversa. Medição durante os frames, sem aguardar apenas o estado parado: 112 frames no primeiro trilho e 59 no segundo; variação vertical do título/painel e do topo dos cartões igual a 0 px. Altura da página constante em ambas as fases. As seções permanecem consecutivas sem espaço extra. Passagem entre os trilhos medida em cinco posições, mantendo continuidade. Nenhum teste desktop executado.

## Publicação da versão aprovada

Projeto principal: `site`. Branch confirmada no repositório: `main` (não master). Destino: `https://github.com/pedrx30/apeparquepraia`. Vercel publica `dist`. A implementação conserva a cena fixa aprovada e adiciona a integração das âncoras das seções verticais, a configuração dos vídeos locais futuros, metadados de produção e navegação de rodapé com contatos dos anfitriões. Não publicar gravações de demonstração, arquivos de análise ou ferramentas intermediárias.
