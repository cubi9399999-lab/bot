import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const STORAGE_FILES = [
    path.join(DATA_DIR, 'storage-a.json'),
    path.join(DATA_DIR, 'storage-b.json'),
];

const hashToIndex = (key: string) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash = (hash << 5) - hash + key.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % STORAGE_FILES.length;
};

const ensureFiles = async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    for (const file of STORAGE_FILES) {
        try {
            await fs.access(file);
        } catch {
            await fs.writeFile(file, '{}', 'utf8');
        }
    }
};

const readStore = async (file: string) => {
    try {
        const content = await fs.readFile(file, 'utf8');
        return content ? JSON.parse(content) : {};
    } catch (error: any) {
        if (error?.code === 'ENOENT') {
            return {};
        }
        throw error;
    }
};

const writeStore = async (file: string, data: Record<string, any>) => {
    await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
};

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: storageKey } = await params;
        await ensureFiles();
        const file = STORAGE_FILES[hashToIndex(storageKey)];
        const store = await readStore(file);
        const item = store[storageKey];

        if (!item) {
            return NextResponse.json({ message: 'Not Found' }, { status: 404 });
        }

        return NextResponse.json(item, { status: 200 });
    } catch (error) {
        console.error('Storage GET error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: storageKey } = await params;
        const payload = await req.json();
        await ensureFiles();

        const file = STORAGE_FILES[hashToIndex(storageKey)];
        const store = await readStore(file);
        store[storageKey] = payload;
        await writeStore(file, store);

        return NextResponse.json({ message: 'Saved' }, { status: 200 });
    } catch (error) {
        console.error('Storage PUT error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: storageKey } = await params;
        await ensureFiles();
        const file = STORAGE_FILES[hashToIndex(storageKey)];
        const store = await readStore(file);

        if (store[storageKey]) {
            delete store[storageKey];
            await writeStore(file, store);
        }

        return NextResponse.json({ message: 'Deleted' }, { status: 200 });
    } catch (error) {
        console.error('Storage DELETE error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

