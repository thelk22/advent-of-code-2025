import { readFileSync } from "fs";

export function readFileLines(filePath: string): string[] {
  console.log(`Reading file from path: ${filePath}`);
  const text = readFileSync(filePath, "utf-8");
  return text.split(/\r?\n/).filter((line) => line.trim() !== "");
}
