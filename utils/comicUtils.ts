import fs from 'fs';
import path from 'path';

export interface ComicMetadata {
  title: string;
  publishedDate: string;
  description: string;
}

export interface ComicData {
  id: string;
  path: string;
  number: number;
  metadata: ComicMetadata;
}

export function getComicMetadata(comicId: string): ComicMetadata {
  try {
    const dataPath = path.join(process.cwd(), 'data/comics.json');
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContents);
    
    if (data[comicId]) {
      return data[comicId];
    }
    
    // Return default metadata if not found
    return {
      title: `Issue #${comicId.replace('comic', '')}`,
      publishedDate: '',
      description: `UX Strip Issue #${comicId.replace('comic', '')}`
    };
  } catch (error) {
    console.error('Error reading comic metadata:', error);
    
    // Return default metadata if error
    return {
      title: `Issue #${comicId.replace('comic', '')}`,
      publishedDate: '',
      description: `UX Strip Issue #${comicId.replace('comic', '')}`
    };
  }
}

export function getAllComicsWithMetadata(comicPaths: string[]): ComicData[] {
  return comicPaths.map((path, index) => {
    const comicId = path.split('/').pop()?.split('.')[0] || '';
    const metadata = getComicMetadata(comicId);
    
    return {
      id: comicId,
      path,
      number: comicPaths.length - index,
      metadata
    };
  });
}
