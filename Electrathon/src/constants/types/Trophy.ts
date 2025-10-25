export interface Trophy {
  id: string;
  title: string;
  description: string;
  year: number;
  imageUrl?: string;
  category: 'competition' | 'achievement' | 'recognition';
}
