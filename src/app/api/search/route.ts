import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Turbopack çökmesine karşı veriyi anlık okuyan sistem
function getDreamsData() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/dreams.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
}

const allDreams = getDreamsData();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLocaleLowerCase('tr') || '';

  if (query.length < 2) {
    return NextResponse.json([]);
  }

  // 22.000 veri içinde sadece başlığı eşleşen ilk 5 rüyayı bul ve anında gönder
  const results = allDreams
    .filter((dream: any) => dream.keyword.toLocaleLowerCase('tr').includes(query))
    .slice(0, 5);

  return NextResponse.json(results);
}