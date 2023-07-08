import useSWR from 'swr';

export type Counts = {
  count: number;
  size: number;
};

export type Entry = {
  version: string; 
  time: Date; 
  rev: string
  total_code: Counts; 
  dol: Counts; 
  rels: Counts; 
};

const PROGRESS_JSON_PATH = 'https://progress.deco.mp/data/twilightprincess/gcn_usa/?mode=all';
const LATEST_PROGRESS_JSON_PATH = 'https://progress.deco.mp/data/twilightprincess/gcn_usa/default/?mode=shield&measure=code'

export async function loadEntries(): Promise<Entry[]> {
  const res = await fetch(PROGRESS_JSON_PATH);
  const data = await res.json();

  const entries: Entry[] = [];
  const metrics = data.twilightprincess.gcn_usa.default;

  for (const metric of metrics) {
    const version = 'gcn_usa';
    const time = new Date(metric.timestamp * 1000);
    const rev = metric.git_hash;
    const total_code: Counts = {
      count: metric.measures.code,
      size: metric.measures['code/total'],
    };
    const dol: Counts = {
      count: metric.measures.dol,
      size: metric.measures['dol/total'],
    };
    const rels: Counts = {
      count: metric.measures.rels,
      size: metric.measures['rels/total'],
    };

    entries.push({
      version,
      time,
      rev,
      total_code,
      dol,
      rels,
    });
  }

  return entries;
}

export async function getCurrentProgressText(): Promise<string> {
  const res = await fetch(LATEST_PROGRESS_JSON_PATH).then(res => res.json());
  return res.message;
}

export function useCurrentProgressText() {
  return useSWR("*progressText", getCurrentProgressText);
}