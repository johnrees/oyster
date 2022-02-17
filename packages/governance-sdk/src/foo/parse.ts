import bs58 from 'bs58';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import {
  BorshAccountParser,
  ChatAccountParser,
  ChatMessage,
  getGovernanceAccount,
  GovernanceAccountParser,
  GovernanceAccountType,
  ProgramAccount,
  Proposal,
  SignatoryRecord,
  TokenOwnerRecord,
  VoteRecord,
} from '..';
import { get } from './tx';
export const conn = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

const data = [
  {
    accountId: '8aUvka8k4v1i3yjM8BvzgqoEtAaYYbATU3DcmypZtdbD',
    data2:
      '3Xr15FsKTRwfszP2nj97ar9R6UgzmSYbXvSvpaYwbJJCJo7WvVT5tJNtBqCNwbkHShWcdLfgZxS7JS1cbqLFshceW4',
    data3: 6,
    owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw',
  },
  // {
  //   accountId: '8ae4taNSPP7pbWb7wPqExefqhZnyHh6LAZVpbUDjr8Qn',
  //   data2:
  //     '2hiWK4q9kkR82Pjyr5BjdfLDNAHDG77quoaDC257HABHk5HNSnBLWVRbjxLL5E9yW4yhoHHucmFnqyT8BqsgaojAHZxpKu5M6Vd2EJ3zK7DaFsyDk9dxGTXBdYBnqMeruSD82N12DmnAvvQk8af5sYGSQ5V5D83WJvM6VgH4qEzKbAx1i89DvjXysNecdKPpDHb2U9jg4Nv6zthtTZ',
  //   data3: 2,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw',
  // },
  // {
  //   accountId: '8aexkMtWpKtkjn1cBkVVx9Ptf12UfEHHmDURSghxUvAW',
  //   data2:
  //     '2jLr4WAoPrw5USVbu4VmyfNsNJdDYvEB64a6Q68uiUeUgMk1RAX4oQNdR8xzdbKPU65ZRxBTK4CB1pgP5ewGNokbmLodgUm9f9iwShEEoPSjFz3QPQcbrCJT4AnGgu3ewnVNGATvtAgruSDekZWNga4n1ZNFfVKwMbdGuXGwLRPwR6v978gRwpeqgq8r66t65GC5HyURkNRG6DwXHR',
  //   data3: 2,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw',
  // },
  // {
  //   accountId: '8bB5pdoZATHjV1neWxyQBckDHkzmsKs4H19aV3sN2AnV',
  //   data2: '3RpgaVnkSvXtqoN6bdoGL1kS1RgjzuY3JweZZJKJLQViE8QvTLd3oJ7AaHguazgkH2EXNjFsk2zHjtSbfMVkwyMmtc',
  //   data3: 6,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8bBQvmvJ5vJozz9Xjc1gg2BgzAMcwt1ZsCVgK3XU9B9W',
  //   data2: 'B1xYVbZRpVqRHPLyh6WtAtvcrHcBJ9YC89PwdYUxBELmf3sxmyxonA8VD65zXniZNiYhha2KPt7bFUQGY5b2JhZ2yu2xisjchytd4B',
  //   data3: 7,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8bP3kgChGxXS7uUNZYwxpj76q96a2mZbmwb4R7NKy5C9',
  //   data2: '38UVdZVNf4YXDgPyBMtnznfhDheYoGKXnzpgkDLZajAGjf6U3sufdjJ5X8LhprLHFaUNc1i5YeQjfBDLZPXbLBMkxkBeZgnumVrd6JinCJpZmMBwn9cG9GJzb77Lj8BsfcsNHrQJBEnX7jJJXGYH8qSZLsTpPuGW1LLqejkKo3YV2yCDeHg27CYbq876269LtHPYxTXyPzGas9krNb',
  //   data3: 2,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8bRWzfCwxajaEcLQXDAKha4k9jVAsBB7MTxBonqEtPNG',
  //   data2: '6vben2NQ2RkmrZpAxzFYgkPZVCkXRQdwuo6PJ78wg13EgwmfzLEPJVhsVndebp4R3zhW8eA5F5zANoFgznaNAo7vmEmQQqhMu19NAe1aKh2W6yen3PgfCk7mnR4E4y9C1yuzVLEiLyHcCMP5rs9',
  //   data3: 3,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8bsE4SEL94nTNoVAw6LLVXmPrjhe1XB7n3X9BGw6m2EN',
  //   data2: 'AjmWkNLbQpdoZLS6iHokJsf19MesGKZ8vscHLRhkP1piq4ko4SHoFHMQi3fHpTQLhfZsPJo8usYs86Fay2FTqnh5bTQFd22beiaSf9',
  //   data3: 7,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8c9Gre7jZmZr4wp2sMAdSgTWzXyeUd7ecufq7UtRbcXh',
  //   data2: 'B78cXvcwonbvWjTtpXpodEVUH2wT7d8A2st5Zy4VbE27fXg2NwVYXhrHF2Bw5G3RveoVYykNzo694hCuFwth34kVPXigCMiHtyMyAP',
  //   data3: 7,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8cFSZapZfJgmUDLJm1NRCYGxNQTYNaGvVbEmE7gzYkY1',
  //   data2: '2cZamcfcT2JVbNP8uu8JCoYqbjx1RGJbte24riYJgti8af6m8e6bVaDEjbSEwpvn3hKpES2rJvp8DU93GXaYC1ra78kLWh425PWLDtCoXvhtoqEWpcW63pyoAajhyVXL7G9PG3oXEycDxkCn3fdRCN2s57Dyn2ty9we6TgoTtfiphkQkDfhppgzCd7uY4SFyrAJE5QyC46VtDkDTaF',
  //   data3: 2,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8cJxGrfHq7ANXj3mm4uFjQ5YhV33dEGvKbDatA91v2D2',
  //   data2: 'AzRk9bxeLF1e9AezRoKbMC8FEdZqWs4kxVJZWsUqWmvbCRA5EsrXNZDrQ9bANcTsYvHgVT5CCEEQgKACJP8bRXKowXbQ9n9u1Xd45m',
  //   data3: 7,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8cPQ4Kz32Tk4DW8vvNE4Xg1Rppmbbk5x3MjnMYvfaQ5d',
  //   data2: 'AnYAK3FhDASedqvw7VJhrfrC4HtYWsc9bHRTadR9zta65pQvkDV1ZqXsJ9wzNZxRHx557x4pZXnT6y5Hkkw5qwTwuhuX6m91iQLvdqWasWSBrEki5MvWJbbosjojnojA6EBBscV5uT8tJjinEdHL5kc1kAJDUS5o9N9AsRDt54aSZy5HcojQq46RHvzkTbCp419k3R49Sy88AUDu86ctphDNqg8n3T7hW2cMBcN1ys9CNHZJfbrtpXzF2AmAYMf7AMhNgR3qWT4n6NgcXqxDP43wCoYoS5zQTPp5bNFjGc9qxygwQT8BDTEBD4ko6RWTp9bqgxMgscyUwPdPZPdXHHaxaUpgdDsgRADcG5h1JHAcsLjX4dw3mC5AAC52hj4hjZPWR21FwwS1uwKKsfM64ww4q8ekuvXhAWZKXtebQDsawVgBRdbuWDLtxpx2keRF8xRg7PVT6CEaSSBF7roaqcCT3mefmurmqYFyV3ifpBomAYqYF9qsewERv73njxi6ra6M3eAnfVzAXd7BP4q465bmjZ9T7stktGa3y6Y5Nx8kSUxpEoUR4TkoxoELgnLYw6x9T27c21QFFG4aowmkyYC',
  //   data3: 5,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8cQApDQ1VfYuNRgaopDLRwbTHpsDY4qeDRQKsuk6HnpH',
  //   data2: 'GFBihVvMPUTSGhMq5EzmKDNSwqyGukzZwt8ZoVrDRva9dDeBZbFKgSoSeJ2jgvWGZmzHEhCSbWm3XjwHqpQGGcfRHqEHxHVVt1UVZpM3UvqeRx3uvmdMgKGwPZXpD7Yi2WfLV6XyHSCEGATr9HR',
  //   data3: 9,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8cer2773F5Va6SiUKxhB59NyKqKpMuzgjkBZmHLvrjbd',
  //   data2: 'AoyYCqdWWtpFPa7yWykXFWiDujgtMhzgv75MshjpYQScFCgQfcKqDkHVJDf78CQ6qMxp3ud1MgHL74A9FJnecdGbtH1t1KgN8u7BUj',
  //   data3: 7,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8cwxzJ9M1k4rhaesnorFzDAz7FZ5mTQhUmsUuLWLL85P',
  //   data2: 'AtHx31p1Uqxfj7Xb4Zm6e6GzTLbE9uFtPCDMQeCxtcf9SpSKQ537D7DjcnUzUQQPA1eSGNJbVnavwu4d5UCB8wF9gwLXpaNabxL3QT',
  //   data3: 7,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8d1W7ESMCwaCk7od1gWDmts1xLytoXt3Cobr7HWjcFdg',
  //   data2: 'B6owgqhSfU5HvvuYmyLBmxzNkmuZ8xM2NHGRXdbGo2FpQnEVvHsV9XPqY1YSW92cHpUsRaddnsof7LqGC9UpAh25S5F33UdDfKwXLj',
  //   data3: 7,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // }
  // {
  //   accountId: '8d7zpXyAqeLrqjTXjTZTacYemD3hQLzowyRUQZA3k8RJ',
  //   data2: '376TAwVtisDZJ8aS93AcDNYLzjS91c3gLX41ac1ac2GuhZj6TSRpnwbxhtkndnN2beyid7QEmNsvW1YHuDK52ruBzNCF7Rk6TcgKkW65JmMArotXJDCZeFDkDHCRzMwV8arRYh6dD7j1uWDcgw2g3jg4u55pqbb1hHJAXgZQDYF6ky6cAiqSqKvCxz5T7gd5hb3StbsseueT6fUJyu',
  //   data3: 2,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8dEFpRBAuc7AGHKV9B3kezLK7LK6KT2h3JozEXhcxQps',
  //   data2: '2cZamcfcT2JVbNP8uu8JCoYqbjx1RGJbte24riYJgti8af6m8e6bVaDEjbSEwpvn3hKpES2rJvp8DU93GXaYC1raBNZuuorNDCCQP57K6Exxz55nWnQ6skrgSaQSbq4aiPLUswayxinm8nsZ7Y7vVLaAZVEGjoG8ZzB6Tm1o2ummY4Mtia5tzcXaAYQzrv4J9fmTaikvSTpuqLEEeK',
  //   data3: 2,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8dKUCxQKPXHfSi1f1burshJR3N3mjtRmiBxH1i5fXUsb',
  //   data2: '4u7Jd5e97XTF8pJAHEyWTy7Z5gDqxtVNasrR1h6jMQxF6TY6fKnib8cL9bg19J4ajpmZztsFf49dvrqbVt3j458xMrDgT3b4kU3wRFySHuT2obyvnTe9K8St5zm1o2pMDHPmuq8swzBFzFpWfbFgqanc7syup7Wk4BSMa7ebzWVnUw9oTxQNY5kSx93wkcr1MHrHDW8nU8qxQYkwsSHP3ZnLPGp8kNifSV81vxPEo66UsWC3ax7Mwwe5fTgHf1xcAduYLMiUh4yamAXyFWczRvY9Rtja1qtxg3PThuSbxCeDhsnHbvQsGdjdrB24J8T93bYjmpGnuQQF38mGQjr8NjQmCHv2k7soq6Fs4aSXMrtAnaz9n8qNCqG2V47v3vLURxLpRVTxY7UaXQZrMwMizfzECv1KFnaYqiA3vMsMb6Vc48EPuKYDNmadMX7LrdrET',
  //   data3: 5,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: 'Bqm6fVYGUsqvLtDAcC7gbdpXBQvgB4b8M57pnkT6N56a',
  //   data2: '3K3g3V7VfSXN7ciaqdkNurLCSYujK2nxK9ATWZ1UF8YhFf7gBeUirwcPDcPDZ1vj8CEhrbvh65DtJ8tJNokY7jPmG1ZHrovUZBNvuBNcQJxxkYw8by6xHEg8TGiHahRNbAYBEjEAvH4VqtRddqJ9TVpUPL5DA1mk6t7KybBTiJkKnBnmUH9SoF423qSvA1wMDxkV61jUdZvupthvhm',
  //   data3: 2,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: 'EhVbFwKzZb1wLmKBWkG19oHuo5hPmmAYJwLcyukU38QV',
  //   data2: '3K3g3V7VfSXN7ciaqdkNurLCSYujK2nxK9ATWZ1UF8YhFf7gBeUirwcPDcPDZ1vj8CEhrbvh65DtJ8tJNokY7jPmE1QUiZYfxLoAwjnJLh9WS7hcZeLzRvLsUiA1u9FFh49PhJTAd5ReNRf23DdzkDL7DtFm3iKKjtvk4NbMnqFGTk4baZVbYoSW79x3VDDgw8663fdjFYJ4gfBBEP',
  //   data3: 2,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '7bPC3RwcnxnnvUSQUCASDJQQwYdPTeFvkhQfLn4RYM6D',
  //   data2: 'A2P6xZr8JKa1YyedNweXUS7cSuy4iYqT7tqtWV3kUgx8tuKPUtsqvKpkTNLW8ibiBg4EXWtxBujVTN4KrLG7CkDXqU1qv9F3KEKg1d',
  //   data3: 7,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '2tmUgD26JKbmAjnd9DGuZwpwh161L8LK2EJLgRc4AmTL',
  //   data2: '2M9sLspzYp4T2RsKVThz9vqcMQ2w1GVjLkMugsxDkM5KhwAz93mT8kM14zX6BFBQGkifyZUR2MuMAkJ8wYWSS7TQPhnG8sZaaiMCtmNPMFXXrxZvk2QpxvWULsbHa35uBqT8TiadB2qtffkfxvfub3341rNGmfq1RgJv72V1559fsnqTNNGUqMvWqrmtfDYQCy3NuAgs5eZfKUXzUp35ckAUn627UZrFzLPh6sFvEUTA6WhFYjCoCw6p1HJFQWFtgHbDiYmb2GsN53JCN5gNVrEvNoQxmQj4SSY9Fw8AnMJUK3qqTm5vsN7fD9JfQYSVDPENXL6QaYuwp3rs5U6foid3gm7dqELB8pNLV6DJYd2TaSkLtLo1S1idBC7t8LRccoWrWZCKmC338ZboXR3juiftwtFwz7ZFZUm6xNDMaSdWLmWESF61m',
  //   data3: 5,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: '8dnpoQPqhNMbyJMq4a2zFAqsW8CMeHTwSBZDqo5p5idP',
  //   data2: 'AQGMfoArnMpHVLWL7wV5o4fZFrjPopecvYnjsLNv73qHox9WmjtDpRUJyJv4CXXyRWzTBT6gHWut97EQespkeh1BqAMpRwj5D77SMd',
  //   data3: 7,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: 'AJ18QDY7rk8q2x1JNBWg9fx2Xpryetp2ZQUCdNunBvJ4',
  //   data2: 'AybUEie2ZbVyG8LUnuxBcjksnuJoZR27scvvgoHUi68TmYkJG26cLiAUz8kpYKugUtpEyp2ZsjfM4Yhkwpox3ZytbUkhhXxEDQDZgT',
  //   data3: 7,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: 'AJAdWSWdzibrU2cVSvc12kkpStGy2HVVnRjiboftZ5Dm',
  //   data2: 'B9G2ZrHyYUxpCaw5eUdvXtoEX3nN4FWQUu8i2CHWLggjjkwpUT91M3DoyEbv66snQhsiJmTxrUYGwBBLMTGfwh2YLG1w7ba1i1AauD',
  //   data3: 7,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: 'AJMDgSkvcMHHiYDX5EWwfDWghGYHjCBVQ4cLSY4kHy9U',
  //   data2: '3ME7v6dd6qLMWZcY1GtwkL1hCzKQZu6GgxVzW6LFpJ2DYAQpqwFhT8NuzB21ZEshS9uWertKQdFdZJ9apeQELAmUAU',
  //   data3: 6,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // }
  // {
  //   accountId: 'AJdZzx6vovYA5oj6LR8hMZQpURLv5ECkbcPPMyN5kYdf',
  //   data2: 'ASYKHQuXatdMKtfben3VCrWgkneEUWTXUuk4ZBSxV6W1nXa2JpQ4Hn8fWSV1LizLAGaNvsHDErjA77prwrRPVy3FBxxt1yCwPDYeR5',
  //   data3: 7,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: 'AJrSEWErdxnpeQwDsEREN7ce2A4Jn2rRzs7rsMCeCk4u',
  //   data2: '2cZamcfcT2JVbNP8uu8JCoYqbjx1RGJbte24riYJgti8af6m8e6bVaDEjbSEwpvn3hKpES2rJvp8DU93GXaYC1raDcufd2dknhuPx1TkBUkhD9iHdVWgF1pwkvViFTxFvgga9GXRRCyojypmuFZiytGYhzThdnq3v8zt6Ec3b9wWxA9JX845sRwPfYoRqmXvm9zq7bWxNVsMK4Ptkw',
  //   data3: 2,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: 'AJujw2Ut2M33pnwEVvmMC9ZttzVgHKN3eMuHGJEL6dCB',
  //   data2: 'Adkr66T2yqxZLcmmx6mES9uZAvMTeECCRJXQFw17FtP1gPZVjXrEnedaXpLHaS4obtKYm8rn9SenQ9ofqm8cbfmqK5xc9NkDVReP83kFoZ1EkbCMdWstKQp7zZzkvvWV2JMm8eZkKosBK7qCyvUqQzwpwG6KsR9oJ7tgQoLa9CwbbZ2cgT2tUep59VBp8s6T6gtxa7MCDo35',
  //   data3: 1,
  //   owner: 'gCHAtYKrUUktTVzE4hEnZdLV4LXrdBf6Hh9qMaJALET'
  // }
  // {
  //   accountId: 'AJzySE8cQPcARhLtdxusDva8NAFvbYGFZDzxvFvN897D',
  //   data2: '9yUyPRVNbFwKgbovscdDWWJwS9jhJwSdxivf7JcjTf58FEkrkt12F3vhNTdFqNshVqTTwMtPajSCr6wbd1zw2TJKegvsH7HyrhSzqM',
  //   data3: 7,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: 'AK1oXW8FHNUAy6pWuGkWwLJ7UievtqGaZBTUBV9C5Nsf',
  //   data2: '3kmb35gkmbRbiTZxCyaks2sVvMcSgbNnjjtiTAm7YuG55iRLQSM9v7pxFKVprmTNKCb3Uw65DkdsUgcJR9bVmdS8YSTzJMZWBnK9FkMK88TQpuSrFdyAzPUZgRPjBRg997DGjQdVeNxtvcHXWToh6BuGEQyMa1WnC7',
  //   data3: 1,
  //   owner: 'gCHAtYKrUUktTVzE4hEnZdLV4LXrdBf6Hh9qMaJALET'
  // },
  // {
  //   accountId: 'AK2ti1viJ9pUSwJB5fyXuJx9dFGKg1CYygfT7c37ZV8T',
  //   data2: 'AjfFvhg7aKLwBCcVGEpRngqmGENRkh8uKuPLMjuHMU6jqRuFUrL1iMNnvu3gMF4Lb6YVm2yErjFhpkbV8FuiL1rLUrT3CF2qpUGcd5',
  //   data3: 7,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: 'AKKw8Qz7Z51K7tvn2kAdRCrLemQYPp2Ry2ZdeUQe2qVL',
  //   data2: '4JsYtvD4PLSTFGJiNh4SAd5HjaD2JM8rgk1sLzqa3wJaGbRF1ySfnB5R7dnsXYgaa544xYGbPWy5qnSrqCMV4BNt5AaMeRKhHoc49LSNUuFvkukxdaZPc27dNHSfSrHy46EsBJMk1HPb7mLH8tbQGeJWrx5LxKeWpidMarV5B8QHhgtGrrF7YwZHDdV2sdsyXZZHss2dktEocqSGVGzFKHcw8FH9PJuxiBVVb4suLM69WgMGgqcVEtAjxmzHoXoM9ahTz1nDfPfLt9YuD',
  //   data3: 8,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: 'AKaiMJDzwekUeafNNPf9U8yxpojYmpRtiaB7MXwQsMtg',
  //   data2: '3d19t37fypJUXrtvmG4cfTxkoBwZonnf17HHu4oHmN4xBJNgTzvk2Jhqkxs5T3aWMMYBdSbEG4q5uK9Gjq2gWy9nz85uymf6Q6uyA7KCpqz3gkCzw2Q2kAPL8LH4ZC3Kk6hRWSTAaNH5bVknxEFtVqP5CPXoXSti5UCPYLiobMeUrze4KmjSUS8SGZSG549MW7iQ2jqBs97d15HSW54H8tLAMrR534wScXkz4kXfgfzwoz6humdCQHG21zHTpP4K4nKBpkTXnJSjXgFyEz93kauNZWDJ1JJ3zeMMNMjUgYQepXGiFxw73sEwSXmTdjfYaA63MGpjb9WLRBjLowgJMFGcitivLMmosQUCuELKYjqfHboSa9nEBp3wyi6vBU3Fg7LAuKkgP6AcMeCwiKsyKzmWp1AnBVp3wPkyq9jfhhKv9Vu85z1sRcn4u3ufHHVPqakz1UTGx7Qdb3CEd5xwxgDxG9FQncuPmnCJzF5QxBaJ8F1ZkxaAceYHK4YaG8vfkgP9QG5jwfdK31mJXGToCG2yvGuif77fSuZReWTAzpiPpZu6fZyvj6FbjM9HWXNqSwJvvYhHR7f9wvSxH1psZMznqZqPuKVj3om3SdyKjFQYwF7iGnykd4sw5YK61TqqX8PfZ2hJVveoWB5Zz41DXWqLVoGSFKREnokwPdjKwyAB5nxvafsmc3h7qdMq62W8kJQRomLduTXX5pKAV5QxsVFu5kkXy1wvPk2p1Wf4qCg3Kc7hjjhG78R5g69PqBPFVZfAVd1TY4sJbfsLLTr7tQ7BCTmBHJxqY6xpFYSt78N9cHNcSxxb3NNChdSqCC5GkVpQJPiB2ui18FiZExXkisgoNqkKegGSjFsbhb1irSskfmzKRcJRr2J9gH56eGHstyPsVr5S7Pt37sJnWZBuEhg3dgCroZmXF35izgw5npLETxZXcEXK5k9vsUwitWopWHfCBTXj62EZwutL84j79gRTK1EwGPwW4j9RUnA9UrtBMxMeb6CyQ7xATFkmHnTsyP44FG5gy4GffcKWUALHGrXivCruTesgjXwTJv7omp19yvwJ7GFfQxd6oZLsYWL',
  //   data3: 8,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: 'AKf2eqyz4N9aBe5pojznTcsMRyGV4Q5PjjAckExxKWH3',
  //   data2: '6XqhLQpDSi7DntDEZguFkKjEmwHfE7SK2LAjtLXSMiPBJQPoEAN2j8gUhnck1E4YhP3qRtXLbbDMMExUGNUzskUfFpRV86hJqeunhMbHNM9YtUKPRGK32bru4i9wCBTRpeTqzKies5K6yNYuhobUVB7iLX1',
  //   data3: 1,
  //   owner: 'gCHAtYKrUUktTVzE4hEnZdLV4LXrdBf6Hh9qMaJALET'
  // },
  // {
  //   accountId: 'AKuzQCwUPduAKb8RLYxphWhwxfyaoXhe7gvNEJkTr9yR',
  //   data2: 'AjbUhpjsMGzR2KKWJL5rvqxBRx8cj7sfyfbou2B4kfDP2bTCegHSCsLJHwpK3vLwWNBJTFyRb5gCDiKVje5FMvyB2ywe2fFsjGASwh',
  //   data3: 7,
  //   owner: 'GqTPL6qRf5aUuqscLh8Rg2HTxPUXfhhAXDptTLhp1t2J'
  // },
  // {
  //   accountId: 'AL2GW8rBvfFHLAhzEroaXohsM5Lfu8gBmKdCu34PRY6H',
  //   data2: '3BWjHJTbB5bjK4bWxscWUQwc1em8MXXFGeM18N7Uf7W8RhpQaAJqnCwRsTQ4RTdE7ca3rsqR5hC8Ww14vupWwXDnRmWf39pkrTtnPJF7QzVtk29ZSexSZsoTsmPKH7z7GeNjvH2SBzxYXRCupcx8XKZWp86aG6JiqF8bsCCM8wrh29YfWXEMXG12S9QD1UA7m5tRM77z2oErpT5VMh',
  //   data3: 2,
  //   owner: 'GqTPL6qRf5aUuqscLh8Rg2HTxPUXfhhAXDptTLhp1t2J'
  // },
  // {
  //   accountId: 'ALRF4AbXnAagH4iwsM3Zv6sXh7yWA24RW5QzU9dfq2Zy',
  //   data2: 'AvoPvkksefzfr7utBGugUZnCvnhMRUVR3SX7PyKuEHQesCstkxZy3Bi9Wm77Xz3bmiD61sg8DdSVFLFrUrx8S9frMDg4WRuE7KCcUX',
  //   data3: 7,
  //   owner: 'GqTPL6qRf5aUuqscLh8Rg2HTxPUXfhhAXDptTLhp1t2J'
  // },
  // {
  //   accountId: 'ALsgPSvYNHxexfiVA28LyDZZrZRLDdMaVYpZcWezsChG',
  //   data2: 'Qdnog7J8Q7bzEzR8kXfqvtEctMKP6nBFaa5J8922ysEsvL6pQdNBbrZjwbj27skgTkBmBCzsnmZz2aLjCZYEzPnNAQt61L89wU8AefGYoye3cpVbiALAVH6nfvFXmpYv898V1au8cNjEssoAdzoWRqye7ddM3UYadgBc5CHPfQCTKsQaUHYS5Jz9cWFRfe44phkXKs5vnC48rh7DB1VR',
  //   data3: 1,
  //   owner: 'gCHAtYKrUUktTVzE4hEnZdLV4LXrdBf6Hh9qMaJALET'
  // },
  // {
  //   accountId: 'ALwmKFmFM8rpn32pyYqK1K922LWFSZarv6Nu58ZPubM1',
  //   data2: '2iQA61dLZ896HfqA9ZQmvNcRj1nqcpsXuC9Vgv3TJFujGfKcrRtRxk2Py2BLnejKw4sXrqaci5sJgkAHUJFHhBd2XP1rEHZSkL7oYqKFbX2DoC2o1BsvhFza34S1GvEJFHKyn6NYnTT8TadmRboG9pLeG2A7Gc6u5ttjxEXVRLrbHgELbc6oJzUCN6rc4SEMNyJ3aLDSg7duaXGT7d',
  //   data3: 2,
  //   owner: 'AVoAYTs36yB5izAaBkxRG67wL1AMwG3vo41hKtUSb8is'
  // },
  // {
  //   accountId: 'AM5wg8aYbJxvT88MLZJ1Nh9xYZPuv47a7tQg7ioCtfJh',
  //   data2: '3K3g3V7VfSXN7ciaqdkNurLCSYujK2nxK9ATWZ1UF8YhFf7gBeUirwcPDcPDZ1vj8CEhrbvh65DtJ8tJNokY7jPmCBpVJsQXwtjgz3sJXm6p3jhcP3QYARZAq5TxvYgf2Evk38wxTFnpnuGuHeoe1gWPkvrcnYEG4gTXmp6jcecD94EYkqVRnCAQqECUK6tadTMECmobc9UghwG2q5',
  //   data3: 2,
  //   owner: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
  // },
  // {
  //   accountId: 'AMFgGx5daCmRokuQNPMv47avMZKntFDfnEAy8DCoJR5o',
  //   data2: '3BWjHJTbB5bjK4bWxscWUQwc1em8MXXFGeM18N7Uf7W8RhpQaAJqnCwRsTQ4RTdE7ca3rsqR5hC8Ww14vupWwXDnPgkZyVRZxqnVYwtdHb67phth3d1WiL1fZxHf1p2cR1ZC6azpNdx47CNioq7advdvtxSAVLFrFdnecv2HdkawSNkRKd1aUVFFjWc5mDwPye2sopqjhotf2yyVrP',
  //   data3: 2,
  //   owner: 'GqTPL6qRf5aUuqscLh8Rg2HTxPUXfhhAXDptTLhp1t2J'
  // },
  // {
  //   accountId: 'AMRC14FwwWkT5TG2ibXdLTUnVrnd2N4YsTifzCeRR22X',
  //   data2: '3iSNTL8EUThY8wbFBpgEtGZzQQT3MtarXJFWKR9vJ1jbGsv1t6Dtsesx8NYTkFc2mdQeC257EU8C6ThATMQHsWSH5kvbH4HhK2RWCYpZyEybe7wdvdBWjcagNT83UdTYneGYkr1GSobS7N6TAhJFFfxAseGR82cnFmr3KAMh8KK9x4gaCzjhDBCugWhtE3invLoeSM4uV9N',
  //   data3: 1,
  //   owner: 'Ghope52FuF6HU3AAhJuAAyS2fiqbVhkAotb7YprL5tdS'
  // }
  // {
  //   accountId: 'AMkui8Ery2xca3Ug3YsuPpkHJrm3vQ4EkoDNJCfNSoCR',
  //   data2: 'AyJrbhHqFvbp1GHu6RL7h1k7Ak18WL8sw24s9Li6wGLNArVgpUpsa1Xd1EcRpgdrD9mgT54xULwJVUT2ujM1PvJ39iPHqbskq3HF8K',
  //   data3: 7,
  //   owner: 'GqTPL6qRf5aUuqscLh8Rg2HTxPUXfhhAXDptTLhp1t2J'
  // },
  // {
  //   accountId: 'AMrZjjL9td6F4AvUEmGVj51jHM9BNkZiX1gTUnuxZagz',
  //   data2: 'Hx1TNvsxXB4XB5ioGAFjbePRutptpTy4nmh9vgK9jpms1FSENG4dPgxjHT6WBnMU5tt5FFnCP3mBK4Dzf8LSyPfH1zVfvmdjHfj9pxevwCY6Cywhkrh3RaTy2435KpvgM12z4EkyaBzHzyvcAjq',
  //   data3: 10,
  //   owner: '5sGZEdn32y8nHax7TxEyoHuPS3UXfPWtisgm8kqxat8H'
  // },
  {
    accountId: 'AMxsFwBJUzBRBHTGpRqPFakr6Qji2nhTAXEV3b3ed6R7',
    data2: '6FB16L7GB7KSbfNyipCXakbosjenHDwpGfwR7uWkQgJcXSSFrygCFoNdmx93zwN7UYQ6vVtgoTcuUMLz4dsZWvLa9pcFNux17QKmjPAcY6bxF3F79gVBG2Eqs5j9c1jGZBAQhLm5xWxFv63X8H8ferKneDb1j7Y94yqrWj',
    data3: 1,
    owner: 'gCHAtYKrUUktTVzE4hEnZdLV4LXrdBf6Hh9qMaJALET'
  },
  {
    accountId: 'ANxDUKV4uscLJXTMCMAHSiyMSZvUQChcvNifKpxtjYMt',
    data2: 'GNHBBWdqDjp2C7qja1XHtr6pGWXMqLaVFA7Mr73vjw8RNNkfKwX8kGVjhhMu3bKvUXAz6yoe1KHuRhBoTUag9wJuMw29wY1qVaUL96V5cehv7AUhhrPZcUx32AuWRV2DRuDdujNbgxADNbuNpaWjpGc3NK6RWFYMpiB',
    data3: 1,
    owner: 'gCHAtYKrUUktTVzE4hEnZdLV4LXrdBf6Hh9qMaJALET'
  },
  {
    accountId: 'ATdcU4uHaJR1s1ak47VPR16pSiqVSBREEpUAzPvLUBNf',
    data2: '2zsWNrsVGeY5rVgR8DgGrPFDdo8UJV4nZsihdGxWaLf3zVpnbnpTD63qjsGXjjkmPui7GMZmi7S93mK345zgw991SuLZ5vUCGDLUttHBG93RiMPcGWiUr2NqYx7ToZRCw2BMVbQkZSFr5axWAcSJUH8hgm6Qxy1XYH8L1Z3VRDLgegHEqXmABp9pbFiqtpK9Utsxo5rXru6yHQA9oNUhiWvJu7bJmVWFmbgVq9Ba9reEHy7qyANopZL9bwgtyCWD8uZ7z7F8wDiRkCVogsrVey9e7kNTSwvdrkzaTASFG2GKtBLhDRJXVxUc6AMRW3sHJ3sgkttHGSpmcB3eAcWEirXYbPzc6Q4CEd878c49CFWPePyyZymBc5R1638a3i25u3GkQh8Ze7BmUc1DT6fAuM4MB82ewYJ4GJRJVy6NFfG933oMiB4EF7uiGgLG6g8U4UPKGqq35BYs3pmCCEVx2UEbFS4H9HfMjDth9PHyNtL4KumaFikiAmAU5Lw1H',
    data3: 1,
    owner: 'gCHAtYKrUUktTVzE4hEnZdLV4LXrdBf6Hh9qMaJALET'
  }
] as const;

// getGovernanceAccount(
//   conn,
//   new PublicKey('2tmUgD26JKbmAjnd9DGuZwpwh161L8LK2EJLgRc4AmTL'),
//   Proposal,
// ).then(console.log);

// const parse = (item:typeof data[number]) => {
//   const isChatAccount = item.owner === "gCHAtYKrUUktTVzE4hEnZdLV4LXrdBf6Hh9qMaJALET"
//   const parser = isChatAccount ? ChatAccountParser : GovernanceAccountParser;
//   const Klass = isChatAccount ? ChatMessage : GovernanceAccountType[item.data3];

//   parser(Klass)(
//     new PublicKey(item.owner),
//     {
//       data: bs58.decode(item.data2)
//     } as any
//   )
// }

console.log(
  (ChatAccountParser(ChatMessage)(
    new PublicKey('gCHAtYKrUUktTVzE4hEnZdLV4LXrdBf6Hh9qMaJALET'),
    {
      data: bs58.decode(
        '2zsWNrsVGeY5rVgR8DgGrPFDdo8UJV4nZsihdGxWaLf3zVpnbnpTD63qjsGXjjkmPui7GMZmi7S93mK345zgw991SuLZ5vUCGDLUttHBG93RiMPcGWiUr2NqYx7ToZRCw2BMVbQkZSFr5axWAcSJUH8hgm6Qxy1XYH8L1Z3VRDLgegHEqXmABp9pbFiqtpK9Utsxo5rXru6yHQA9oNUhiWvJu7bJmVWFmbgVq9Ba9reEHy7qyANopZL9bwgtyCWD8uZ7z7F8wDiRkCVogsrVey9e7kNTSwvdrkzaTASFG2GKtBLhDRJXVxUc6AMRW3sHJ3sgkttHGSpmcB3eAcWEirXYbPzc6Q4CEd878c49CFWPePyyZymBc5R1638a3i25u3GkQh8Ze7BmUc1DT6fAuM4MB82ewYJ4GJRJVy6NFfG933oMiB4EF7uiGgLG6g8U4UPKGqq35BYs3pmCCEVx2UEbFS4H9HfMjDth9PHyNtL4KumaFikiAmAU5Lw1H',
      ),
    } as any,
  ) as ProgramAccount<ChatMessage>).account.postedAt.toString()
);
