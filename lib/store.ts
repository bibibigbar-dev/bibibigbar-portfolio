import { promises as fs } from "fs";
import path from "path";
import { createSeedStore } from "./seed";
import type { AppStore } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");

let writeQueue: Promise<void> = Promise.resolve();

async function ensureStoreFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    const seed = createSeedStore();
    await fs.writeFile(STORE_PATH, JSON.stringify(seed, null, 2), "utf8");
  }
}

export async function readStore(): Promise<AppStore> {
  await ensureStoreFile();
  const raw = await fs.readFile(STORE_PATH, "utf8");
  return JSON.parse(raw) as AppStore;
}

export async function writeStore(store: AppStore): Promise<void> {
  await ensureStoreFile();
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export async function updateStore(
  updater: (store: AppStore) => AppStore | Promise<AppStore>
): Promise<AppStore> {
  const run = writeQueue.then(async () => {
    const current = await readStore();
    const next = await updater(current);
    await writeStore(next);
    return next;
  });

  writeQueue = run.then(
    () => undefined,
    () => undefined
  );

  return run;
}
