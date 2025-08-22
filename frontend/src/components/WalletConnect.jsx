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
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 justify-between bg-biblio-surface/60 border border-biblio-border rounded-xl p-4 shadow-glow">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <div className="text-sm text-biblio-muted">Wallet Status</div>
        </div>
        <div className="font-mono text-sm break-all text-biblio-heading">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
        </div>
        {!chainOk && address && (
          <div className="text-amber-300 text-sm mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Switch to BNB Testnet
          </div>
        )}
        {error && <div className="text-red-400 text-sm mt-1 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400"></span>
          {error}
        </div>}
      </div>
      <div className="flex gap-2">
        <button 
          onClick={connect} 
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-biblio-gold to-yellow-500 text-black font-semibold hover:shadow-lg transition-all duration-200"
        >
          {address ? 'Reconnect' : 'Connect Wallet'}
        </button>
        {!chainOk && (
          <button 
            onClick={ensureBNBTestnet} 
            className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-all duration-200"
          >
            Switch Network
          </button>
        )}
      </div>
    </div>
  )
}


