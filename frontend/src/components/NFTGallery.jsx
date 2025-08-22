import React, { useEffect, useState } from 'react'
import { getContract, getProvider, parseDataUriJson } from '../utils/contract'

export default function NFTGallery({ address: externalAddress, variant = 'self' }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setError('')
      const provider = getProvider()
      if (!provider) return
      try {
        setLoading(true)
        const contract = getContract()
        if (!contract) throw new Error('Contract not ready')
        let owner = externalAddress
        if (!owner) {
          const accounts = await provider.send('eth_accounts', [])
          owner = accounts[0]
        }
        if (!owner) { setItems([]); return }
        const tokenIds = await contract.tokensOfOwner(owner)
        const entries = []
        for (let i = 0; i < tokenIds.length; i++) {
          const tokenId = tokenIds[i].toString()
          const uri = await contract.tokenURI(tokenId)
          const meta = parseDataUriJson(uri)
          entries.push({ tokenId, meta })
        }
        setItems(entries)
      } catch (e) {
        setError(e.message || 'Failed to load NFTs')
      } finally {
        setLoading(false)
      }
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalAddress])

  const [view, setView] = useState('grid') // grid | list

  if (loading) return <div className="text-biblio-heading">Loading...</div>
  if (error) return <div className="text-red-400 text-sm">{error}</div>
  if (!items.length) return (
    <div className="text-zinc-400 text-sm flex items-center gap-3">
      <span className="w-8 h-8 rounded-full bg-biblio-surface/80 border border-biblio-border flex items-center justify-center">📖</span>
      <span>Your digital shelves are empty. Mint your first book to begin your collection.</span>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-end mb-3">
        <div className="inline-flex rounded border border-biblio-border overflow-hidden">
          <button onClick={() => setView('grid')} className={`px-3 py-1 ${view==='grid' ? 'bg-biblio-gold text-black' : 'hover:bg-biblio-surface/60'}`}>Grid</button>
          <button onClick={() => setView('list')} className={`px-3 py-1 ${view==='list' ? 'bg-biblio-gold text-black' : 'hover:bg-biblio-surface/60'}`}>List</button>
        </div>
      </div>
      {view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(({ tokenId, meta }) => (
            <div key={tokenId} className="bg-biblio-surface/60 border border-biblio-border rounded-lg overflow-hidden shadow-glow">
              {meta?.image ? (
                <img src={meta.image} alt={meta?.name || 'Book cover'} className="w-full h-44 object-cover" />
              ) : (
                <div className="w-full h-44 bg-zinc-900 flex items-center justify-center text-zinc-400">No Image</div>
              )}
              <div className="p-3 space-y-1">
                <div className="font-semibold truncate" title={meta?.attributes?.find(a => a.trait_type === 'Title')?.value || meta?.name}>{meta?.attributes?.find(a => a.trait_type === 'Title')?.value || meta?.name}</div>
                <div className="text-sm text-biblio-muted truncate" title={meta?.attributes?.find(a => a.trait_type === 'Author')?.value}>by {meta?.attributes?.find(a => a.trait_type === 'Author')?.value || 'Unknown'}</div>
                <div className="text-xs text-zinc-300">Pages: {meta?.attributes?.find(a => a.trait_type === 'Pages')?.value || '-'}</div>
                <div className="text-xs text-zinc-500">Token #{tokenId}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-biblio-border/60 border border-biblio-border rounded-lg overflow-hidden">
          {items.map(({ tokenId, meta }) => (
            <div key={tokenId} className="flex items-center gap-4 p-3 bg-biblio-surface/40">
              <div className="w-14 h-20 rounded overflow-hidden border border-biblio-border bg-zinc-900">
                {meta?.image && <img src={meta.image} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{meta?.attributes?.find(a => a.trait_type === 'Title')?.value || meta?.name}</div>
                <div className="text-sm text-biblio-muted">by {meta?.attributes?.find(a => a.trait_type === 'Author')?.value || 'Unknown'}</div>
              </div>
              <div className="text-xs text-zinc-300">Pages: {meta?.attributes?.find(a => a.trait_type === 'Pages')?.value || '-'}</div>
              <div className="text-xs text-zinc-500">#{tokenId}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


