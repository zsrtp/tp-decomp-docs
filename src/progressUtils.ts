import useSWR from 'swr';

export type Counts = {
  count: number;
  size: number;
};

export type Entry = {
  version: string; 
  time: Date; 
  rev: string
  fuzzy_match: Counts;
  total_code: Counts; 
  total_data: Counts;
};

const PROGRESS_JSON_PATH = 'https://progress.deco.mp/data/twilightprincess/GZ2E01/?mode=all';
const LATEST_PROGRESS_JSON_PATH = 'https://progress.deco.mp/data/twilightprincess/GZ2E01/all/?mode=shield&measure=matched_code'

export async function loadEntries(): Promise<Entry[]> {
  const res = await fetch(PROGRESS_JSON_PATH);
  const data = await res.json();

  const entries: Entry[] = [];
  const metrics = data.twilightprincess.GZ2E01.all;

  for (const metric of metrics) {
    const version = 'GZ2E01';
    const time = new Date(metric.timestamp * 1000);
    const rev = metric.git_hash;
    const total_code: Counts = {
      count: metric.measures.matched_code,
      size: metric.measures['matched_code/total'],
    };
    const total_data: Counts = {
      count: metric.measures.matched_data,
      size: metric.measures['matched_data/total'],
    };
    const fuzzy_match: Counts = {
      count: metric.measures.fuzzy_match,
      size: metric.measures['fuzzy_match/total'],
    };

    entries.push({
      version,
      time,
      rev,
      fuzzy_match,
      total_code,
      total_data,
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