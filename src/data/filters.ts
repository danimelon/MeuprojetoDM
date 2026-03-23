export type Filter = {
  name: string;
  family: 'Film' | 'Instant' | 'Digital';
  description: string;
  swatch: string;
};

export type Collection = {
  name: 'Film' | 'Instant' | 'Digital';
  description: string;
};

export type StyleExtra = {
  name: string;
  description: string;
  featured?: boolean;
};

export const collections: Collection[] = [
  {
    name: 'Film',
    description: 'Kodak, Leica, Yashica, Pentax e 35mm reinterpretados em tons quentes e editoriais.',
  },
  {
    name: 'Instant',
    description: 'Luz cremosa, papel fotográfico e memória impressa inspirados em câmeras instantâneas.',
  },
  {
    name: 'Digital',
    description: 'Flash, brilho e nostalgia point-and-shoot com energia de compactas cult e G7X.',
  },
];

export const filters: Filter[] = [
  {
    name: 'Golden Roll',
    family: 'Film',
    description: 'Warm golden film for everyday light.',
    swatch: '#B8895E',
  },
  {
    name: 'Dust Letter',
    family: 'Film',
    description: 'Faded film tones with diary-like warmth.',
    swatch: '#8A6B58',
  },
  {
    name: 'Quiet Lens',
    family: 'Film',
    description: 'An elegant lens-inspired editorial finish.',
    swatch: '#8A8075',
  },
  {
    name: 'Sunday 35',
    family: 'Film',
    description: 'Classic 35mm mood for slow, beautiful days.',
    swatch: '#A88D6C',
  },
  {
    name: 'Instant Cream',
    family: 'Instant',
    description: 'Soft instant tones with creamy light.',
    swatch: '#E5DCCF',
  },
  {
    name: 'Blue Paper',
    family: 'Instant',
    description: 'Clean instant light with cool paper tones.',
    swatch: '#9CB0CC',
  },
  {
    name: 'Soft Print',
    family: 'Instant',
    description: 'Printed softness for gentle everyday moments.',
    swatch: '#D8CEC6',
  },
  {
    name: 'Memory Frame',
    family: 'Instant',
    description: 'An instant-inspired memory you can feel.',
    swatch: '#CBB59B',
  },
  {
    name: 'Flash Note',
    family: 'Digital',
    description: 'Flash-forward digital nostalgia.',
    swatch: '#7FA2D0',
  },
  {
    name: 'Digi Bloom',
    family: 'Digital',
    description: 'Soft digital glow with throwback charm.',
    swatch: '#D2B7A7',
  },
  {
    name: 'Cool Compact',
    family: 'Digital',
    description: 'A polished compact-camera everyday look.',
    swatch: '#8594A3',
  },
  {
    name: 'Social Glow',
    family: 'Digital',
    description: 'Clean creator light with polished glow.',
    swatch: '#E5C7AD',
  },
];

export const highlightedFilters = [
  filters[0],
  filters[2],
  filters[5],
  filters[8],
  filters[11],
];

export const styleExtras: StyleExtra[] = [
  {
    name: 'Gallery',
    description: 'Borda fina e minimalista para finalizar a imagem.',
  },
  {
    name: 'Ivory',
    description: 'Acabamento creme suave para fotos quentes e clean.',
  },
  {
    name: 'Polaroid',
    description: 'Frame nostálgico para um toque visual mais casual.',
  },
  {
    name: 'Verse',
    description: 'Detalhe cobalto opcional para dar um toque autoral.',
    featured: true,
  },
];
