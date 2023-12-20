export const vaultFactoryABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'contract VaultV2', name: 'vault', type: 'address' },
      {
        indexed: true,
        internalType: 'contract VaultFactoryV2',
        name: 'vaultFactory',
        type: 'address'
      }
    ],
    name: 'NewFactoryVault',
    type: 'event'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'allVaults',
    outputs: [{ internalType: 'contract VaultV2', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'contract IERC20', name: '_asset', type: 'address' },
      { internalType: 'string', name: '_name', type: 'string' },
      { internalType: 'string', name: '_symbol', type: 'string' },
      { internalType: 'contract IERC4626', name: '_yieldVault', type: 'address' },
      { internalType: 'contract PrizePool', name: '_prizePool', type: 'address' },
      { internalType: 'address', name: '_claimer', type: 'address' },
      { internalType: 'address', name: '_yieldFeeRecipient', type: 'address' },
      { internalType: 'uint32', name: '_yieldFeePercentage', type: 'uint32' },
      { internalType: 'address', name: '_owner', type: 'address' }
    ],
    name: 'deployVault',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'deployedVaults',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'deployerNonces',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalVaults',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const
