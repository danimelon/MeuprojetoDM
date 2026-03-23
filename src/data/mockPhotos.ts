export type MockPhoto = {
  name: string;
  mood: string;
  background: string;
  glow: string;
  accent: string;
};

export const mockPhotos: MockPhoto[] = [
  {
    name: 'Morning Café',
    mood: 'warm indoor light',
    background: '#B49476',
    glow: '#E9D4B5',
    accent: '#D6E2F9',
  },
  {
    name: 'Blue Street',
    mood: 'cool editorial city',
    background: '#7C8FA7',
    glow: '#C8D5E6',
    accent: '#E7D9C8',
  },
  {
    name: 'Summer Diary',
    mood: 'sunny nostalgic travel',
    background: '#C89E72',
    glow: '#F3D8AB',
    accent: '#DAD0C3',
  },
];
