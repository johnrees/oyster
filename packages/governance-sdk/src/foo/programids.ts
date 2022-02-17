import fetch from 'isomorphic-fetch';

fetch(
  'https://raw.githubusercontent.com/solana-labs/governance-ui/main/public/realms/mainnet-beta.json',
)
  .then(x => x.json())
  .then(realms => {
    console.log(new Set(realms.map(r => r.programId)));
  });
