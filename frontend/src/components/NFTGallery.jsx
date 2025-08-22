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

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-biblio-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-biblio-heading font-semibold">Loading your collection...</div>
        <div className="text-biblio-muted text-sm">Fetching your book NFTs</div>
      </div>
    </div>
  )
  
  if (error) return (
    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-4">
        <span className="text-white text-xl">✕</span>
      </div>
      <div className="text-red-400 font-semibold mb-2">Failed to load collection</div>
      <div className="text-red-300 text-sm">{error}</div>
    </div>
  )
  
  if (!items.length) return (
    <div className="text-center py-12">
      <div className="w-24 h-24 rounded-full bg-biblio-surface/60 border border-biblio-border flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">📚</span>
      </div>
      <div className="text-biblio-heading font-semibold text-xl mb-2">Your digital shelves are empty</div>
      <div className="text-biblio-muted mb-6">Mint your first book to begin your collection</div>
      <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-biblio-gold to-yellow-500 text-black font-semibold hover:shadow-lg transition-all duration-200">
        Create Your First Book
      </button>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {items.map(({ tokenId, meta }) => (
            <div key={tokenId} className="group bg-biblio-surface/40 border border-biblio-border rounded-xl overflow-hidden shadow-glow hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="relative">
                {meta?.image ? (
                  <img 
                    src={meta.image} 
                    alt={meta?.attributes?.find(a => a.trait_type === 'Title')?.value || meta?.name || 'Book cover'} 
                    className="w-full h-48 object-cover group-hover:brightness-110 transition-all duration-300" 
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-biblio-gold/20 to-biblio-blue/20 flex items-center justify-center">
                    <span className="text-6xl">📖</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs text-white font-mono">#{tokenId}</span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="font-bold text-biblio-heading truncate" title={meta?.attributes?.find(a => a.trait_type === 'Title')?.value || meta?.name}>
                  {meta?.attributes?.find(a => a.trait_type === 'Title')?.value || meta?.name}
                </div>
                <div className="text-sm text-biblio-muted truncate" title={meta?.attributes?.find(a => a.trait_type === 'Author')?.value}>
                  by {meta?.attributes?.find(a => a.trait_type === 'Author')?.value || 'Unknown'}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-biblio-gold font-semibold">
                    {meta?.attributes?.find(a => a.trait_type === 'Pages')?.value || '-'} pages
                  </span>
                  <span className="text-biblio-muted">NFT</span>
                </div>
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


