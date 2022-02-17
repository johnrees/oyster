import bs58 from 'bs58';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { Governance, GOVERNANCE_CHAT_PROGRAM_ID } from '..';
import { get } from './tx';

const conn = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

const programIds = [
  // 'GqTPL6qRf5aUuqscLh8Rg2HTxPUXfhhAXDptTLhp1t2J',
  // '5hAykmD4YGcQ7Am3N7nC9kyELq6CThAkU82nhNKDJiCy',
  // 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw',
  // 'gSF1T5PdLc2EutzwAyeExvdW27ySDtFp88ri5Aymah6',
  // 'AVoAYTs36yB5izAaBkxRG67wL1AMwG3vo41hKtUSb8is',
  // 'GmtpXy362L8cZfkRmTZMYunWVe8TyRjX5B7sodPZ63LJ',
  // 'GMpXgTSJt2nJ7zjD1RwbT2QyPhKqD2MjAZuEaLsfPYLF',
  // 'bqTjmeob6XTdfh12px2fZq4aJMpfSY1R1nHZ44VgVZD',
  // 'Ghope52FuF6HU3AAhJuAAyS2fiqbVhkAotb7YprL5tdS',
  // '5sGZEdn32y8nHax7TxEyoHuPS3UXfPWtisgm8kqxat8H',
  // 'smfjietFKFJ4Sbw1cqESBTpPhF4CwbMwN8kBEC1e5ui',
  // 'GMnke6kxYvqoAXgbFGnu84QzvNHoqqTnijWSXYYTFQbB',
  // 'GCockTxUjxuMdojHiABVZ5NKp6At8eTKDiizbPjiCo4m',
  GOVERNANCE_CHAT_PROGRAM_ID.toString(),
];

async function go() {
  for (const id of programIds) {
    const signatures = await conn.getSignaturesForAddress(new PublicKey(id), {
      limit: 50,
    });
    const txns = await conn.getParsedConfirmedTransactions(
      signatures.map(s => s.signature),
    );
    // console.log(
    //   JSON.stringify(
    //     txns.map(t => t?.transaction.message.instructions),
    //     null,
    //     2,
    //   ),
    // );
    const parsedTxns = txns.flatMap(
      t =>
        t?.transaction.message.instructions.filter(ix =>
          programIds.includes(ix.programId.toString()),
        ),
      2,
    );
    // console.log(parsedTxns.map(tx => tx?.programId.toString()))
    parsedTxns
      .map(tx => [tx?.programId.toString(), tx?.data])
      .forEach(pair => {
        // console.log(pair);
        try {
          const res = get(...pair)
          if (res.key !== "CastVote") {
            console.log(res);
          }
        } catch(err) {
          console.error({error: pair})
        }
      });
  }
}

go();
