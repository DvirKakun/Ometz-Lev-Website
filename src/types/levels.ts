export interface Level {
  id: string;
  name: string;
  color: string; // Hex color code from Prismic
}

export interface LevelCardProps {
  level: Level;
  isSelected: boolean;
  onClick: (levelId: string) => void;
}