# Apê Parque Praia

Guia Mobile First de apresentação e apoio aos hóspedes, com identidade em verde oliva, areia e terracota. Projeto independente, publicado a partir da branch `main` de `pedrx30/apeparquepraia`.

## Publicação e visualização

A Vercel publica a pasta `dist`, conforme `vercel.json`. O site é estático, sem instalação de dependências ou compilação. A integração com GitHub publica novos commits na `main`.

Site: https://apeparquepraia.vercel.app/

Prévia local: execute `node server.mjs` nesta pasta e abra http://127.0.0.1:4173.

## Conteúdo e arquivos

- `dist/index.html`: boas-vindas com contatos, Wi-Fi e checkout; check-in; regras básicas; endereços; locais importantes; cozinha; sacada e rodapé.
- `dist/praias.html`: nove praias em dois grupos, com fotos, descrições e Google Maps.
- `dist/data.js`: dados dos oito cartões dos trilhos e das nove praias. No endereço de delivery, `unit` é somente exibido; `copyAddress` exclui o apartamento.
- `dist/styles.css`: estilo Mobile First aprovado.
- `dist/app.js`: menu, cópia de texto, navegação, vídeos locais e animações.
- `dist/assets/`: fotos locais fornecidas pelo cliente.
- `dist/vendor/`: GSAP 3.13.0 e ScrollTrigger, preservando os avisos de licença dos arquivos distribuídos.
- `ESCOPO-V3.6.md`: escopo consolidado e refinamentos aprovados.

## Movimento dos trilhos

Uma cena fixa comum evita a troca de pins e alterações de layout durante o scroll. Os dois trilhos têm timelines horizontais independentes. Entre eles, uma fase vertical corresponde exatamente à altura do primeiro painel. Ao terminar, a rolagem continua para cozinha e sacada. O percurso é reversível.

Os cartões horizontais acompanham a rolagem com suavização de 0,45 s e percurso maior por cartão. As seções surgem por opacidade conforme entram na tela, sem mudar a geometria da fixação. `dist/reveal-init.js` prepara a entrada antes da primeira pintura e possui proteção para deixar o conteúdo visível caso o script principal falhe.

As âncoras Endereços e Locais importantes levam ao início de suas respectivas fases. Cozinha e Sacada usam a posição final da cena para localizar corretamente o conteúdo. Movimento reduzido ou ausência do GSAP deixam o conteúdo no fluxo vertical.

## Próximas mídias do cliente

No início de `dist/app.js`, preencha `MEDIA.checkinVideo` e `MEDIA.balconyVideo` com caminhos de MP4 locais, por exemplo `assets/checkin.mp4` e `assets/sacada.mp4`. Os vídeos aparecem dentro da página, com controles nativos, sem autoplay ou anexos externos. Adicione legendas quando o conteúdo estiver disponível.

Os vídeos ainda não foram fornecidos. O texto definitivo do check-in também está pendente. Os vídeos enviados como referência de animação não fazem parte da publicação.

Para trocar fotos, substitua os arquivos correspondentes em `dist/assets`. Confirme o enquadramento no cartão após a troca. Para editar contatos e Wi-Fi, atualize a seção de boas-vindas; os contatos também aparecem no rodapé das duas páginas.

## SEO e navegação

Metadados em português, dados estruturados da hospedagem, canonical, robots.txt e sitemap incluídos. Ao conectar um domínio definitivo, atualize os URLs em ambos os HTMLs, robots.txt e sitemap.xml.

QR code da sacada: `https://apeparquepraia.vercel.app/#sacada`.

As descrições das praias, horários, distâncias e agrupamentos foram fornecidos pelo proprietário. Não representam consulta de balneabilidade ou certificação em tempo real.

## Operação

Sem banco de dados, formulários, rastreadores ou credenciais de infraestrutura no navegador. Links externos isolados por noopener/noreferrer. As fontes têm alternativas locais e são carregadas do Google Fonts. A Vercel aplica os cabeçalhos de `vercel.json`; `_headers` é mantido para provedores compatíveis.

A demonstração e suas gravações permanecem fora deste repositório. Somente o site aprovado, seus ativos e documentação são publicados.
