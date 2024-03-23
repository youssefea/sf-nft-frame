import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { base,optimismSepolia } from 'viem/chains'

export const walletClient = createWalletClient({
  chain: optimismSepolia,
  transport:  http()
})

export const publicClient = createPublicClient({
  chain: optimismSepolia,
  transport: http()
})

export const account = privateKeyToAccount(`0x${process.env.WK}`)