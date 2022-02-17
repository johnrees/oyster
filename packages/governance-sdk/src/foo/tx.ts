import * as borsh from 'borsh';
import { BN } from 'bn.js';
// import fetch from 'isomorphic-fetch';
import bs58 from 'bs58';
import {
  AddSignatoryArgs,
  CancelProposalArgs,
  CastVoteArgs,
  // CreateAccountGovernanceArgs,
  CreateMintGovernanceArgs,
  CreateNativeTreasuryArgs,
  CreateProgramGovernanceArgs,
  CreateProposalArgs,
  CreateRealmArgs,
  CreateTokenGovernanceArgs,
  CreateTokenOwnerRecordArgs,
  DepositGoverningTokensArgs,
  // ExecuteInstructionArgs,
  FinalizeVoteArgs,
  // FlagInstructionErrorArgs,
  GovernanceChatInstruction,
  GovernanceInstruction,
  GOVERNANCE_CHAT_SCHEMA,
  GOVERNANCE_SCHEMA_V1,
  // InsertInstructionArgs,
  PostChatMessageArgs,
  RelinquishVoteArgs,
  // RemoveInstructionArgs,
  SetGovernanceConfigArgs,
  SetRealmAuthorityArgs,
  SetRealmConfigArgs,
  SignOffProposalArgs,
  UpdateProgramMetadataArgs,
  WithdrawGoverningTokensArgs,
} from '..';

// const sig =
//   'n1zLErn7a1r5NmPKFi1rHBidywoG9NPDmdvRBLdcwA1ZnZNyQxM7H3PtNyCVcbPpDAXV4bCQPaGRd13YgRpUVCt';

//   fetch('https://api.mainnet-beta.solana.com', {
//   method: 'POST',
//   headers: {
//     'content-type': 'application/json',
//   },
//   body: JSON.stringify({
//     jsonrpc: '2.0',
//     id: 1,
//     method: 'getTransaction',
//     params: [sig, 'jsonParsed'],
//   }),
// })
//   .then((x: any) => x.json())
//   .then((x: any) => {
//     x.result.transaction.message.instructions.forEach((ix:any) => {
//       const accs = ix.accounts.reduce((acc,curr,i) => {
//         acc[accounts[i]] = curr;
//         return acc;
//       }, {})
//       console.log(JSON.stringify({accs,ix}, null, 2))
//     })

//   });

// console.log(decode('zP')[0])

// console.log(borsh.deserialize(GOVERNANCE_SCHEMA_V1, CastVoteArgs, decode('zP')))

const programs = {
  gCHAtYKrUUktTVzE4hEnZdLV4LXrdBf6Hh9qMaJALET: {
    schema: GOVERNANCE_CHAT_SCHEMA,
    instruction: GovernanceChatInstruction,
    args: {
      PostMessage: PostChatMessageArgs,
    },
  },
  // AVoAYTs36yB5izAaBkxRG67wL1AMwG3vo41hKtUSb8is: {
  GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw: {
    schema: GOVERNANCE_SCHEMA_V1,
    instruction: GovernanceInstruction,
    args: {
      CreateRealm: CreateRealmArgs,
      DepositGoverningTokens: DepositGoverningTokensArgs,
      WithdrawGoverningTokens: WithdrawGoverningTokensArgs,
      // SetGovernanceDelegate: SetGovernanceDelegateArgs,
      // CreateAccountGovernance: CreateAccountGovernanceArgs,
      CreateProgramGovernance: CreateProgramGovernanceArgs,

      CreateProposal: CreateProposalArgs,
      AddSignatory: AddSignatoryArgs,
      // RemoveSignatory: RemoveSignatoryArgs,

      // InsertInstruction: InsertInstructionArgs,
      // RemoveInstruction: RemoveInstructionArgs,
      CancelProposal: CancelProposalArgs,
      SignOffProposal: SignOffProposalArgs,
      CastVote: CastVoteArgs,
      FinalizeVote: FinalizeVoteArgs,
      RelinquishVote: RelinquishVoteArgs,
      // ExecuteInstruction: ExecuteInstructionArgs,

      CreateMintGovernance: CreateMintGovernanceArgs,
      CreateTokenGovernance: CreateTokenGovernanceArgs,
      SetGovernanceConfig: SetGovernanceConfigArgs,
      // FlagInstructionError: FlagInstructionErrorArgs,
      SetRealmAuthority: SetRealmAuthorityArgs,
      SetRealmConfig: SetRealmConfigArgs,
      CreateTokenOwnerRecord: CreateTokenOwnerRecordArgs,
      UpdateProgramMetadata: UpdateProgramMetadataArgs,
      CreateNativeTreasury: CreateNativeTreasuryArgs,
    },
  },
} as any;

export const get = (pubkey: string, data: any) => {
  const { schema, instruction, args } = programs[pubkey];
  const val = bs58.decode(data)
  // console.log({
  //   schema, instruction, args, o: Object.entries(instruction), val: val[0]
  // })


  // Object.entries(GovernanceInstruction).find(([k, v]) => v === decode('11W723TcX84w')[0]),
  const key = instruction[val[0].toString()];

  return {
    key,
    val: borsh.deserialize(schema, args[key], val),
  };
};

// console.log(
//   get(
//     // 'gCHAtYKrUUktTVzE4hEnZdLV4LXrdBf6Hh9qMaJALET',
//     // '11D7za9hWLtuzeEkiyKCn43xE8LJs',
//     // 'AVoAYTs36yB5izAaBkxRG67wL1AMwG3vo41hKtUSb8is',
//     // 'zP'
//     'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw',
//     '13NH69cepeXfusdFKtz8yZ3B1xKd61Un4av6aqHfhsVtdKVRTLuqy'
//   ),
// );

// accounts

// console.log( Buffer.from("zP","base64").toString("hex") );

// console.log(Buffer.from("cc","hex"))

// class Test {
//   x: number;
//   constructor(args: {x: number} ) {
//     this.x = args.x;
//   }
// }
// const schema = new Map([[Test, { kind: 'struct', fields: [['x', 'u8']] }]]);
// const buffer = borsh.deserialize(schema,Test,Buffer.from("zP","base64"))
// console.log(buffer)
