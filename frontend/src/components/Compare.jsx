import React, { useEffect, useState } from 'react'
import NFTGallery from './NFTGallery.jsx'
import { getProvider, getContract } from '../utils/contract'

export default function Compare() {
  const [friend, setFriend] = useState('')
  const [selfAddr, setSelfAddr] = useState('')
  const [winner, setWinner] = useState('')
  const [counts, setCounts] = useState({ self: 0, friend: 0 })

  useEffect(() => {
    const init = async () => {
      const provider = getProvider()
      if (!provider) return
      const accounts = await provider.send('eth_accounts', [])
      setSelfAddr(accounts[0] || '')
    }
    init()
  }, [])

  const onCompare = async () => {
    setWinner('')
    const contract = getContract()
    if (!contract) return setWinner('Contract not ready')
    try {
      const selfTokens = selfAddr ? await contract.tokensOfOwner(selfAddr) : []
      const friendTokens = friend ? await contract.tokensOfOwner(friend) : []
      const selfCount = selfTokens.length || 0
      const friendCount = friendTokens.length || 0
      setCounts({ self: selfCount, friend: friendCount })
      if (selfCount === friendCount) setWinner('Tie — both read the same number of books')
      else if (selfCount > friendCount) setWinner('You have read more books!')
      else setWinner('Your friend has read more books!')
    } catch (e) {
      setWinner(e.message || 'Failed to compare')
    }
  }

  return (
    <div className="space-y-6">
      {/* Comparison Input */}
      <div className="bg-biblio-surface/40 border border-biblio-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-biblio-heading mb-4">Compare Collections</h3>
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-biblio-muted mb-2">Friend's Wallet Address</label>
            <input 
              className="w-full px-4 py-3 rounded-lg bg-biblio-surface/60 border border-biblio-border focus:outline-none focus:ring-2 focus:ring-biblio-gold focus:border-transparent transition-all duration-200" 
              placeholder="0x1234...5678" 
              value={friend} 
              onChange={(e) => setFriend(e.target.value)} 
            />
          </div>
          <button 
            onClick={onCompare} 
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-biblio-gold to-yellow-500 text-black font-semibold hover:shadow-lg transition-all duration-200"
          >
            Compare
          </button>
        </div>
      </div>

      {/* Comparison Result */}
      {winner && (
        <div className="bg-biblio-surface/40 border border-biblio-border rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-biblio-gold to-yellow-500 flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <div>
              <div className="text-xl font-bold text-biblio-heading">{winner}</div>
              <div className="text-biblio-muted">
                {!!counts.self || !!counts.friend ? `You: ${counts.self} books | Friend: ${counts.friend} books` : ''}
              </div>
            </div>
          </div>
          
          {/* Visual Comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-biblio-surface/60 rounded-lg">
              <div className="text-3xl font-bold text-biblio-gold mb-1">{counts.self}</div>
              <div className="text-sm text-biblio-muted">Your Books</div>
            </div>
            <div className="text-center p-4 bg-biblio-surface/60 rounded-lg">
              <div className="text-3xl font-bold text-biblio-blue mb-1">{counts.friend}</div>
              <div className="text-sm text-biblio-muted">Friend's Books</div>
            </div>
          </div>
        </div>
      )}

      {/* Collections Display */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-biblio-surface/40 border border-biblio-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-biblio-gold/20 flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <div className="font-bold text-biblio-heading">Your Collection</div>
              <div className="text-sm text-biblio-muted">
                {selfAddr ? `${selfAddr.slice(0,6)}...${selfAddr.slice(-4)}` : 'Not connected'}
              </div>
            </div>
          </div>
          <NFTGallery address={selfAddr} variant="self" />
        </div>
        
        <div className="bg-biblio-surface/40 border border-biblio-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-biblio-blue/20 flex items-center justify-center">
              <span className="text-xl">👥</span>
            </div>
            <div>
              <div className="font-bold text-biblio-heading">Friend's Collection</div>
              <div className="text-sm text-biblio-muted">
                {friend ? `${friend.slice(0,6)}...${friend.slice(-4)}` : 'Enter address to compare'}
              </div>
            </div>
          </div>
          <NFTGallery address={friend} variant="friend" />
        </div>
      </div>
    </div>
  )
}


