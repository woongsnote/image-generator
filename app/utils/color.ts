export function getRandomColor(): [number, number, number] {
  return [Math.random() * 255, Math.random() * 255, Math.random() * 255];
}

export function getRandomDirection(): string {
  const directions = ["to right", "to top", "to bottom", "to left"];
  const randomIndex = Math.floor(Math.random() * directions.length);
  return directions[randomIndex];
}

export function generateRandomSolidStyle(color: number[]): string {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

export function generateRandomGradientStyle(
  color1: number[],
  color2: number[],
  direction: string
): string {
  return `linear-gradient(${direction}, rgb(${color1[0]}, ${color1[1]}, ${color1[2]}), rgb(${color2[0]}, ${color2[1]}, ${color2[2]}))`;
}
