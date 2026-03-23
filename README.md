# Verso

App mobile premium de edição de fotos com filtros inspirados em câmeras icônicas e uma experiência clean, chic e intuitiva.

## Visão do produto

O Verso existe para transformar o cotidiano em arte visual. A primeira versão do app prioriza:

- filtros inspirados em linguagens de câmeras clássicas, instantâneas e digitais cult;
- visual minimalista com azul cobalto como cor de destaque;
- navegação simples para explorar filtros, edição e assinatura premium;
- bordas e frames como extras visuais opcionais para finalizar a imagem.

## Stack inicial

- Expo
- React Native
- TypeScript

## Como rodar

```bash
npm install
npm run start
```

Depois, use o Expo Go ou um simulador para abrir o app.

## Estrutura

- `App.tsx`: shell principal do app com troca de telas por aba.
- `src/screens/`: telas principais do fluxo inicial (`Home`, `Editor`, `Premium`, `Profile`).
- `src/components/`: peças reutilizáveis como botão, cabeçalho, títulos de seção, cards e barra inferior.
- `src/data/`: filtros, coleções e extras visuais exibidos nas telas.
- `src/theme/`: tokens visuais de cor e espaçamento.
- `docs/verso-preview.svg`: mockup visual estático do app para revisão rápida de direção de produto.

## MVP atual

- shell com múltiplas telas e navegação base por abas;
- home conectada ao editor por estado compartilhado;
- coleções de filtros Film, Instant e Digital;
- editor com foto mock selecionável, troca de filtro, intensidade e comparação antes/depois;
- sessão compartilhada entre Home, Editor e Perfil para manter foto/filtro escolhidos;
- extras visuais opcionais para finalizar a imagem;
- base mais preparada para evoluir para imagem real e exportação além de um único `App.tsx`.

## Preview visual

Para revisar a direção visual sem depender de simulador ou Expo rodando, abra:

- `docs/verso-preview.svg`

Esse arquivo reúne um preview estático das telas de Home, Editor, Premium e Perfil.
