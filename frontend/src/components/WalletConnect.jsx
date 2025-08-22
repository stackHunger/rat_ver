import React, { useEffect, useState } from 'react'
import { getProvider } from '../utils/contract'

const BNB_TESTNET_CHAIN_ID = '0x61' // 97

export default function WalletConnect() {
  const [address, setAddress] = useState('')
  const [chainOk, setChainOk] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const provider = getProvider()
    if (!provider) return
    provider.send('eth_accounts', []).then(async (accounts) => {
      if (accounts && accounts[0]) setAddress(accounts[0])
      const network = await provider.getNetwork()
      setChainOk(network.chainId === 97)
    }).catch(() => {})

    if (window.ethereum) {
      const handleAccounts = (accs) => setAddress(accs[0] || '')
      const handleChain = (chainId) => setChainOk(chainId === BNB_TESTNET_CHAIN_ID)
      window.ethereum.on('accountsChanged', handleAccounts)
      window.ethereum.on('chainChanged', handleChain)
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccounts)
        window.ethereum.removeListener('chainChanged', handleChain)
      }
    }
  }, [])

  const connect = async () => {
    setError('')
    try {
      if (!window.ethereum) throw new Error('MetaMask not found')
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAddress(accounts[0] || '')
      await ensureBNBTestnet()
    } catch (e) {
      setError(e.message || 'Failed to connect')
    }
  }

  const ensureBNBTestnet = async () => {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      if (chainId !== BNB_TESTNET_CHAIN_ID) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: BNB_TESTNET_CHAIN_ID }],
        })
      }
      setChainOk(true)
    } catch (switchError) {
      // Attempt to add if not available
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: BNB_TESTNET_CHAIN_ID,
            chainName: 'BNB Smart Chain Testnet',
            nativeCurrency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
            blockExplorerUrls: ['https://testnet.bscscan.com']
          }]
        })
        setChainOk(true)
      } catch (addError) {
        setError(addError.message || 'Failed to switch chain')
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 justify-between bg-danger-900/40 border border-danger-700/40 rounded-xl p-4 shadow-glow">
      <div>
        <div className="text-sm text-danger-300">Wallet</div>
        <div className="font-mono break-all">{address || 'Not connected'}</div>
        {!chainOk && address && (
          <div className="text-amber-300 text-sm mt-1">Wrong network — switch to BNB Testnet</div>
        )}
        {error && <div className="text-red-400 text-sm mt-1">{error}</div>}
      </div>
      <div className="flex gap-2">
        <button onClick={connect} className="px-4 py-2 rounded bg-danger-600 hover:bg-danger-500">
          {address ? 'Reconnect' : 'Connect MetaMask'}
        </button>
        {!chainOk && (
          <button onClick={ensureBNBTestnet} className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500">Switch Network</button>
        )}
      </div>
    </div>
  )
}


