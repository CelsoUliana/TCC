Projeto de TCC
======

--exemplificação--

> objetivo: 

criar uma aplicação para usuario que rode em duas aplicações: `web` e `mobile`. 

`para que tipo de usuario:` A ideia é que possa vir a ser comercial e atenda a proprietario de fazendas que queiram usar de sistemas de tecnologia para melhora de produtividade e ter redução de perdas. Como de saber o comportamento atual do gado que possui colares. (base)

> como: 

Por meio de dados coletados via `e-cattle` e dados de analise inteligente (ia) providos de uma servidor conectado ao e-cattle que faz a analise dos dados conforme requisição, transferindo estes dados prontos para a aplicação. 

> beneces da aplicação: 

Por usar `pwa` o usuario pode tanto abrir os dados no computador como andar pela fazenda com seu celular. Total controle sobre o gado que possui o colar. Analise inteligente dos dados.

dados que serão usados: `gps`, `giroscopio` ... (complete) 

- não é claro, para qndo este usuario estiver fora da fazenda.

para isso, ferramentas: 
tecnologias: 
- `PWA` (uso de manifest e dataStore)
- `node.js` (para backend e frontend)
- `javascript`
- `express` (rotas e intranet)

### backend
- `mongoDB` ou `postigis`
- modo de arquivamento: via `json/geojson` ou campos geo no postgis
- `scikit-learn`
- `node.js`
- `biblioteca` para capturar os dados do e-cattle

### frontend
- `bootstrap`
- `popper`
- `jquery`
- `openlayers` ou `leaflet`
- `ejs`
- `javascript (node.js)`

# funcionalidades 

## funcional

manifest --> ativar propriedade no mobile via manifest de informar o usuario sobre alguma sinalização provida do 
sistema de ia do servidor. 

usuario poder criar divisões de sua fazenda na aplicação e serem salvas essas divisões

mostrar o caminho do colar realizado pela cabeça de gado. 

mostrar o heat zone do mapa sinalizando onde o gado ficou por mais tempo 

poder desenhar implementos que ficam na fazenda: bebedouros, mangueiro, e outros. 

O usuario pode passar coordenadas para o programa para sinalizar a area de interesse. Tipo. O cara sabe os 
marcos da fazenda. ele então pode passar esses marcos um por um na aplicação. para que a area desenhada seja 
corretamente de acordo com sua area real. 

usuario pode desenhar sub-divisões dentro da fazenda ( estilo piquetes ) não sendo estas obrigatoriamente representações 
verdadeiras dos reais piquetes.

deletar linhas.

atualizar caminho percorrido.

salvar area.

trocar tile.

dar titulo as areas (conjunto a salvar area) 

selecionar parte do caminho para mais detalhes (pensei algo como se a pessoa tiver interesse em uma parte especifica
do mapa para mais detalhes ela pode selecionar area e o servidor reupa o json das coordenadas com intervalo menos)
ve se necessário?

pesquisar por colar unico

pesquisar por agrupamento de colares

pesquisar todos colares

abrir uma partição na aplicação que traga os dados de ia 


## não funcional

- trazer dados do gps do servidor com intervalos fixos de 10s

`[1, 1][2, 2][2, 2][2, 2][2, 2][2, 2][2, 2][2, 2][2, 2][1, 1][3, 3]`
o que será trazido será apenas `[1, 1][1, 1]`

tile padrão: OSM (openLayer Street Map) 
tile desejada: raster satelite

banco de dados: `mongoDB` ou `postGIS` (extensão postGRIS)

o `servidor` realiza todo processamento de dados.

modo de transferencia de dados é via `geoJson`

`A DEFINIR`
--------------------------------------------------------------------------------

definir qndo o servidor faz requisições ao e-cattle (visto que o usuario pode constantemente fazer requisiçõs ao server)
dar um nome pra aplicação 
saberdados que podem serão trazidos
definir as rotas dadas as funcionalidades descritas acima 

--------------------------------------------------------------------------------

# escrever tcc

Tem um negocio de Abis, ver com professora se será necessário citar
citar os 3 trabalhos referentes a area 
falar do projeto
falar do e-cathle

### falar das ferramentas que poderiam entrar 

`falar das licenças (uma seção para isto? ou conforme for falando de cada ferramenta já falar da licença?)`

```
geo-server
```
```
google maps 
- falar da ferramenta
- falar das taxas
open Street Map 
```
```
leaflet 
openStreetMap
```
```
php?
node.js
-o que traz pro javascript
```

```
bancos NoSQL
- porquê MongoDB seria a melhor escolha
bancos SQL
- porquè postGis seria melhor escolha
```
```
jquery
bootstrap 
popper?
```
```
express
outros framework?
```
```
scikit-learn vs weka
```
```
pwa vs. ionic e possibilidade de ambos
```
```
ejs?
```

## graficos e imagens que dá pra colocar

```
modo de entrada dos dados e saida (para cada caso) -> representação de imagens (fica pra parte 2) 
imagem do e-cattle com servidor nosso e aplicação em duas vias (web e mobile)
```

## Anexos 

1. requisitos 
2. modelagem de negocio da aplicação 
   - requests e responses da aplicação com servidos
   - requests e responses e-cattle com servidor 
3. diagramas de sequencia 
4. casos de uso?
