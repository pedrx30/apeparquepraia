# Apê Parque Praia — Versão vertical V3.8

Atualização: 10/10/2026

## Objetivo

Publicar na main uma versão de comparação, mantendo identidade visual e conteúdo e substituindo completamente o movimento horizontal por rolagem vertical nativa. A referência horizontal anterior é o commit `d3d50f7`, preservado no histórico.

## Experiência

- Mesmas sete seções, mesma ordem e mesma página separada de praias.
- Cartões de Endereços e Locais importantes em uma coluna, agrupando-se verticalmente com position: sticky conforme a rolagem natural.
- Todos os cartões permanecem no fluxo, com tamanho comum e fotos/transições translúcidas preservados. Sem alturas ou espaços artificiais de animação.
- Entrada suave por cartão, semelhante à página de praias, usando IntersectionObserver e CSS.
- Âncoras nativas com rolagem suave, sem cálculos de pin ou cenas absolutas.
- Remover todo o controlador horizontal e as bibliotecas GSAP/ScrollTrigger que deixaram de ser usadas.
- Carregamento lazy e decodificação assíncrona das fotografias dos cartões.
- Cálculo de alturas somente após fontes e mudança de largura, sem leitura/escrita de layout durante cada scroll.
- Sobreposição desativada com movimento reduzido ou pouca altura de tela. Acesso por teclado destaca o cartão focado, sem impedir o agrupamento após um toque comum.
- Conteúdo, contatos, Wi-Fi, checkout, textos de regras, endereços sem CEP, cópia de delivery sem apartamento e URLs Maps permanecem inalterados.

## Publicação e conferência

Projeto `site`, branch `main`, publicação automática pela Vercel. Criar commit separado para permitir comparação e retorno por revert.

Conferência limitada às novidades em mobile: oito cartões, ausência de pin e código horizontal, entrada suave, agrupamento vertical de cartões no topo da tela, navegação por âncoras e ausência de overflow lateral/erros. Não executar testes desktop ou repetir verificações de conteúdo já confirmado.

## Atualização dos contatos — V3.8.1

Contato anfitriões: Bárbara e Daniel em duas colunas, com nome, número e ícone SVG do WhatsApp, nessa ordem e centralizados. Bárbara: (49) 99822-3452, https://wa.link/af1j4z. Daniel: (49) 99822-3711, https://wa.link/g36t7i. Os links do rodapé das duas páginas usam os mesmos destinos. Centralizar também conteúdo e botão dos cartões Wi-Fi e checkout. Preservar o restante do layout e da rolagem.

## Identidade e leitura — V3.9

Estado anterior preservado no commit `1dd3c26`, sincronizado com GitHub e árvore limpa antes das alterações.

- Cabeçalho de ambas as páginas usa a logo horizontal adaptada da imagem fornecida, preservando os elementos e o estilo tipográfico da marca.
- Menu em painel com acabamento oliva/areia, botão arredondado, fechamento por toque fora e Escape. Preservar a ordem e Praias imediatamente após Endereços.
- Regras básicas passam a usar os mesmos componentes rule, rule-number e rule-check da cozinha. Manter o texto integral das oito regras e os dois avisos de saída/danos; títulos apenas organizam a leitura.
- Rodapé das duas páginas usa a mesma logo, contatos de Bárbara/Daniel com links fornecidos, endereço do Lavitta, link exato do Google Maps e Instagram.
- Logo original e adaptada preservadas em assets; prompt e ferramenta registrados em BRANDING.md.
- Conferência restrita aos elementos alterados em 320 e 390 px: logos carregadas, regras e avisos presentes, menu navegável/fechável, footer sem overflow e contatos corretos. Não repetir testes da rolagem já aprovada nem executar testes desktop.

- Títulos dos locais atualizados nesta publicação: **Beto Carrero 1.6km**; **Farmácia Preço Popular 900m**, com **(fecha 22h)** em linha própria logo abaixo. Preservar endereços, links Maps e informação sobre o caminho do Beto Carrero.
