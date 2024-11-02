import React from 'react';
import styles from './ButtonRow.module.css';

interface ButtonRowProps {
  setSelectedCategory: (category: string) => void;
}

const ButtonRow: React.FC<ButtonRowProps> = ({ setSelectedCategory }) => {
  return (
    <div className={styles.wrap}>
      <button className={`${styles.button} ${styles.blue}`} onClick={() => setSelectedCategory('Yield Lotto')}>All Vaults</button>
      <button className={styles.button} onClick={() => setSelectedCategory('Open Source')}>Open Source</button>
      <button className={`${styles.button} ${styles.green}`} onClick={() => setSelectedCategory('Projects')}>Projects</button>
      <button className={`${styles.button} ${styles.purple}`} onClick={() => setSelectedCategory('Research')}>Research</button>
      <button className={`${styles.button} ${styles.yellow}`} onClick={() => setSelectedCategory('NFTs')}>NFTs</button>
      <button className={`${styles.button} ${styles.blue}`} onClick={() => setSelectedCategory('Culture/Meme')}>Culture/Meme</button>
      <button className={styles.button} onClick={() => setSelectedCategory('Good Causes')}>Good Causes</button>
      <button className={`${styles.button} ${styles.green}`} onClick={() => setSelectedCategory('Creators')}>Creators</button>
      <button className={`${styles.button} ${styles.purple}`} onClick={() => setSelectedCategory('Artists')}>Artists</button>
      <button className={`${styles.button} ${styles.yellow}`} onClick={() => setSelectedCategory('NSFW')}>NSFW</button>
      <button className={`${styles.button} ${styles.blue}`} onClick={() => setSelectedCategory('Longtail')}>Longtail</button>
      <button className={styles.button} onClick={() => setSelectedCategory('Eth Denver')}>Eth Denver</button>
      <button className={`${styles.button} ${styles.green}`} onClick={() => setSelectedCategory('DeScience')}>DeScience</button>
      <button className={`${styles.button} ${styles.purple}`} onClick={() => setSelectedCategory('ReFinance')}>ReFinance</button>
      <button className={`${styles.button} ${styles.yellow}`} onClick={() => setSelectedCategory('Self Growth')}>Self Growth</button>
    </div>
  );
};

export default ButtonRow;
