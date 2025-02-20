import '@site/src/chartGlobals';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Chart } from 'react-chartjs-2';
import Head from '@docusaurus/Head';
import * as progressUtils from '@site/src/progressUtils';
import Layout from '@theme/Layout';

import styles from './progress.module.css';

function InfoRow({ title, value, secondLevel = false }) {
  return (
    <p className={clsx(styles.infoRow, secondLevel && styles.secondLevel)}>
      <span className="key">{secondLevel && '- '}{title}</span>{' '}
      <span className="value">{value}</span>
    </p>
  );
}

function formatPercent(x, digits = 3) {
  return (100 * x).toFixed(digits) + '%';
}

function formatProgress(category, total) {
  return formatPercent(category / total);
}

function formatSizeAsMb(sizeBytes, digits = 3) {
  return (sizeBytes / 1_000_000).toFixed(digits);
}

export default function Progress() {
  const [totalCode, setTotalCode] = useState('?.???/??.??? MB - ??.???%');
  const [totalData, setTotalData] = useState('?.???/??.??? MB - ??.???%');
  const [fuzzyMatch, setFuzzyMatch] = useState('?.???/??.??? MB - ??.???%');

  const [entries, setEntries] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function load() {
      const entries = await progressUtils.loadEntries();
      setEntries(entries);

      const last = entries[0];

      setTotalCode(`${formatSizeAsMb(last.total_code.count)}/${formatSizeAsMb(last.total_code.size)} MB - ${formatProgress(last.total_code.count, last.total_code.size)}`);
      setTotalData(`${formatSizeAsMb(last.total_data.count)}/${formatSizeAsMb(last.total_data.size)} MB - ${formatProgress(last.total_data.count, last.total_data.size)}`);
      setFuzzyMatch(`${formatSizeAsMb(last.fuzzy_match.count)}/${formatSizeAsMb(last.fuzzy_match.size)} MB - ${formatProgress(last.fuzzy_match.count, last.fuzzy_match.size)}`);

      setChartData({
        datasets: [
          {
            label: 'Total code %',
            data: entries.map(entry => ({
              x: entry.time,
              y: entry.total_code.count / entry.total_code.size,
            })),
            pointRadius: 0,
            pointHoverRadius: 0,
            pointBackgroundColor: '#f1c40f',
            borderColor: '#f1c40f',
            cubicInterpolationMode: 'monotone',
          },
        ],
      });
    }

    load();
  }, []);

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        title: { display: false, text: 'Date' },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
      y: {
        title: { display: true, text: 'Decompiled %' },
        beginAtZero: true,
        ticks: {
          callback: (value, _index, _values) => formatPercent(value, 2),
        },
      },
    },
    hover: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        position: 'nearest',
        callbacks: {
          label: (item) => {
            const entry = entries[item.dataIndex];
            const lines = [];
            lines.push('Total Code %: ' + formatProgress(entry.total_code.count, entry.total_code.size));
            if (item.datasetIndex === 1) return lines;
            lines.push('Total Data %: ' + formatProgress(entry.total_data.count, entry.total_data.size));
            lines.push('Commit: ' + entry.rev);
            return lines;
          },
        },
        displayColors: false,
        borderColor: '#fff',
        borderWidth: 1,
      },
    },
  };

  return (
    <Layout noFooter title="Progress" description="Current progress of the Twilight Princess decompilation project">
      <Head>
        <html className={clsx('container-tp-background')} id={styles.page} />
      </Head>
      
      <div className={styles.container}>
        <h1>Decompilation Progress</h1>
        <p>
          <span style={{fontSize: '1rem'}}>Check out <a href="https://decomp.dev/zeldaret/tp">decomp.dev</a> for more detailed progress metrics!</span>
        </p>
        <InfoRow title="Total Code" value={totalCode} />
        <InfoRow title="Total Data" value={totalData} />
        <div className="chart-container" style={{ marginTop: 30, minHeight: 300 }}>
          {chartData && (
            <Chart
              aria-label="Decompilation progress chart"
              role="img"
              type="line"
              data={chartData}
              options={chartOptions}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
