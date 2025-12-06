/**
 * Script to generate mock data for performance demos
 * Run with: npx tsx scripts/generateMockData.ts
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

interface ListItem {
  id: string;
  name: string;
  value: number;
  category: string;
}

const categories = ['Technology', 'Business', 'Science', 'Arts', 'Sports', 'Education'];
const adjectives = [
  'Amazing',
  'Incredible',
  'Fantastic',
  'Wonderful',
  'Brilliant',
  'Outstanding',
  'Exceptional',
  'Remarkable',
  'Impressive',
  'Extraordinary',
];
const nouns = [
  'Project',
  'Initiative',
  'Program',
  'System',
  'Platform',
  'Solution',
  'Framework',
  'Application',
  'Service',
  'Tool',
];

function generateMockData(count: number): ListItem[] {
  const items: ListItem[] = [];

  for (let i = 0; i < count; i++) {
    const adjective = adjectives[i % adjectives.length];
    const noun = nouns[Math.floor(i / adjectives.length) % nouns.length];
    const category = categories[i % categories.length];

    items.push({
      id: `item-${i}`,
      name: `${adjective} ${noun} ${i + 1}`,
      value: Math.floor(Math.random() * 1000),
      category,
    });
  }

  return items;
}

// Generate different sizes of data
const mockData = {
  small: generateMockData(1000),
  medium: generateMockData(10000),
  large: generateMockData(100000),
};

// Write to public folder
const outputPath = join(process.cwd(), 'public', 'mockData.json');
writeFileSync(outputPath, JSON.stringify(mockData, null, 2));

console.log('✅ Mock data generated successfully!');
console.log(`📁 Output: ${outputPath}`);
console.log(`📊 Sizes: small (1k), medium (10k), large (100k)`);
