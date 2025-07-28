export interface Level {
  id: string;
  name: string;
  color: string; // Auto-assigned based on name using existing color logic
}

export interface LevelCardProps {
  level: Level;
  isSelected: boolean;
  onClick: (levelId: string) => void;
}