// look in ~/Code/johnrees/governance-ui

// import { AccountsQuery } from 'glasseater'
import bs58 from 'bs58';
import {
  getGovernanceSchema,
  GOVERNANCE_CHAT_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '..';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { get } from './tx';

export const conn = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

const SCHEMA = getGovernanceSchema(1);

// const chatMessages = new AccountsQuery(SCHEMA, ChatMessage)
// chatMessages.for(GOVERNANCE_CHAT_PROGRAM_ID).select(['body'])
// chatMessages.fetch().then(console.log)

async function go() {
  // console.log()

  // console.log(await get(GOVERNANCE_CHAT_PROGRAM_ID.toBase58(), "uetMh3tmK7Ac5Wd6yPvHT3mys7CkqXESyDYTuWtXP5Ynpd1FU5r9m2mfHrH4a9PovQA4Ev4g8bHvdtq8cD5UtRy"))
  const signatures = await conn.getSignaturesForAddress(
    GOVERNANCE_CHAT_PROGRAM_ID,
    // new PublicKey("B1CxhV1khhj7n5mi5hebbivesqH9mvXr5Hfh2nD2UCh6")
    {
      limit: 1,
    },
  );

  for (const { signature } of signatures) {
    await conn.getTransaction(signature);
    console.log(signature);
    // console.log(await get(GOVERNANCE_CHAT_PROGRAM_ID.toString(), signature));
  }

  // const transactions = await conn.getParsedConfirmedTransactions(
  //   signatures.map(s => s.signature)
  // )
  // console.log(JSON.stringify(transactions,null,2))
}
// go();

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

programIds.forEach(programId => {
  console.log(
    programId,
    conn.onProgramAccountChange(new PublicKey(programId), change => {
      console.log({
        accountId: change.accountId.toString(),
        // data: change.accountInfo.data.toString('hex'),
        data2: bs58.encode(change.accountInfo.data),
        data3: bs58.decode(bs58.encode(change.accountInfo.data))[0],
        owner: change.accountInfo.owner.toString(),
      });
    }),
  );
});

// console.log(bs58.decode("11HHyjV23r9RSRm")[0])
