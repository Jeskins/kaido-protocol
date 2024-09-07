import {
  SIWECreateMessageArgs,
  SIWESession,
  SIWEVerifyMessageArgs,
} from "@web3modal/siwe";

export type Address = `0x${string}`;

export type Action = {
  txId: string;
  actionId: string;
  timeStamp: string;
};
export type Position = {
  id: string;
  token0: string;
  token1: string;
  depositedToken0: string;
  depositedToken1: string;
  collectedFeesToken0: string;
  collectedFeesToken1: string;
  feeTier: string;
  minThreshold: string;
  maxThreshold: string;
  status: "In range" | "Closed" | "Out of range";
};

export type TokenDetailed = {
  derivedETH: string;
  feesUSD: string;
  name: string;
  symbol: string;
  totalValueLocked: string;
  totalValueLockedUSD: string;
  totalValueLockedUSDUntracked: string;
};

export type Pool = {
  feeTier: string;
};

export type Tick = {
  collectedFeesToken0: string;
  collectedFeesToken1: string;
  collectedFeesUSD: string;
  createdAtBlockNumber: string;
  createdAtTimestamp: string;
  feeGrowthOutside0X128: string;
  feeGrowthOutside1X128: string;
  feesUSD: string;
  id: string;
  liquidityGross: string;
  liquidityNet: string;
  liquidityProviderCount: string;
  poolAddress: string;
  price0: string;
  price1: string;
  tickIdx: string;
  untrackedVolumeUSD: string;
  volumeToken0: string;
  volumeToken1: string;
  volumeUSD: string;
};

export type PositionDetailed = {
  collectedFeesToken0: string;
  collectedFeesToken1: string;
  collectedToken0: string;
  collectedToken1: string;
  depositedToken0: string;
  depositedToken1: string;
  feeGrowthInside0LastX128: string;
  feeGrowthInside1LastX128: string;
  id: string;
  liquidity: string;
  owner: string;
  pool: Pool;
  tickLower: Tick;
  tickUpper: Tick;
  token0: TokenDetailed;
  token1: TokenDetailed;
  transaction: {
    id: string;
  };
};

export interface Convo {
  id: string;
  isAI: boolean;
  message: string;
}
export interface ClassifyResponse {
  response: string;
  action: string;
  params: string;
  suggestions: string[];
}
export type KintoSDK = {
  connect: () => Promise<KintoAccountInfo>;
  sendTransaction: (txs: TxCall[]) => Promise<void>;
  createNewWallet: () => Promise<void>;
};
export interface balance {
  eth: string;
  usdc: string;
  weth: string;
  usdt: string;
  link: string;
}
export interface AppMetadata {
  parent: `0x${string}`;
  paymasterBalance: number;
  tokenId: number;
  dsaEnabled: boolean;
  rateLimitPeriod: number;
  rateLimitNumber: number;
  gasLimitPeriod: number;
  gasLimitCost: number;
  name: string;
  devEOAs: string[];
  appContracts: string[];
}
export interface KintoAccountInfo {
  exists: boolean;
  approval?: boolean;
  walletAddress?: `0x${string}`;
  app: AppMetadata;
  appKey?: `0x${string}`;
}
export interface TxCall {
  to: `0x${string}`;
  data: `0x${string}`;
  value: bigint;
}

export interface SIWEConfig {
  // Required
  getNonce: () => Promise<string>;
  createMessage: (args: SIWECreateMessageArgs) => string;
  verifyMessage: (args: SIWEVerifyMessageArgs) => Promise<boolean>;
  getSession: () => Promise<SIWESession | null>;
  signOut: () => Promise<boolean>;

  // Optional
  onSignIn?: (session?: SIWESession) => void;
  onSignOut?: () => void;
  // Defaults to true
  enabled?: boolean;
  // In milliseconds, defaults to 5 minutes
  nonceRefetchIntervalMs?: number;
  // In milliseconds, defaults to 5 minutes
  sessionRefetchIntervalMs?: number;
  // Defaults to true
  signOutOnDisconnect?: boolean;
  // Defaults to true
  signOutOnAccountChange?: boolean;
  // Defaults to true
  signOutOnNetworkChange?: boolean;
}

export interface KYCViewerInfo {
  isIndividual: boolean;
  isCorporate: boolean;
  isKYC: boolean;
  isSanctionsSafe: boolean;
  getCountry: string;
  getWalletOwners: Address[];
}
