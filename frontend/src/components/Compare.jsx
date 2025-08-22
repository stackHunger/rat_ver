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
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <input className="flex-1 px-3 py-2 rounded bg-danger-950/40 border border-danger-700/40 focus:outline-none focus:ring-2 focus:ring-danger-500" placeholder="Friend's wallet (0x...)" value={friend} onChange={(e) => setFriend(e.target.value)} />
        <button onClick={onCompare} className="px-4 py-2 rounded bg-danger-600 hover:bg-danger-500 shadow-glow">Compare</button>
      </div>
      {winner && (
        <div className="text-sm text-danger-300">
          {winner} {!!counts.self || !!counts.friend ? `(You: ${counts.self}, Friend: ${counts.friend})` : ''}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="font-semibold mb-2">You {selfAddr ? `(${selfAddr.slice(0,6)}...${selfAddr.slice(-4)})` : ''}</div>
          <NFTGallery address={selfAddr} variant="self" />
        </div>
        <div>
          <div className="font-semibold mb-2">Friend {friend ? `(${friend.slice(0,6)}...${friend.slice(-4)})` : ''}</div>
          <NFTGallery address={friend} variant="friend" />
        </div>
      </div>
    </div>
  )
}


