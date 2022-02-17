import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { GOVERNANCE_CHAT_PROGRAM_ID } from '..';

const conn = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

const programIds = [
  'GqTPL6qRf5aUuqscLh8Rg2HTxPUXfhhAXDptTLhp1t2J',
  '5hAykmD4YGcQ7Am3N7nC9kyELq6CThAkU82nhNKDJiCy',
  'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw',
  'gSF1T5PdLc2EutzwAyeExvdW27ySDtFp88ri5Aymah6',
  'AVoAYTs36yB5izAaBkxRG67wL1AMwG3vo41hKtUSb8is',
  'GmtpXy362L8cZfkRmTZMYunWVe8TyRjX5B7sodPZ63LJ',
  'GMpXgTSJt2nJ7zjD1RwbT2QyPhKqD2MjAZuEaLsfPYLF',
  'bqTjmeob6XTdfh12px2fZq4aJMpfSY1R1nHZ44VgVZD',
  'Ghope52FuF6HU3AAhJuAAyS2fiqbVhkAotb7YprL5tdS',
  '5sGZEdn32y8nHax7TxEyoHuPS3UXfPWtisgm8kqxat8H',
  'smfjietFKFJ4Sbw1cqESBTpPhF4CwbMwN8kBEC1e5ui',
  'GMnke6kxYvqoAXgbFGnu84QzvNHoqqTnijWSXYYTFQbB',
  'GCockTxUjxuMdojHiABVZ5NKp6At8eTKDiizbPjiCo4m',
  GOVERNANCE_CHAT_PROGRAM_ID.toString(),
];

programIds.forEach(id => {
  console.log(id, conn.onLogs(new PublicKey(id), console.log));
});
