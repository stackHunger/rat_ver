import React, { useState } from 'react'
import { getContract } from '../utils/contract'

export default function MintBookForm() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [pages, setPages] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setTxHash('')
    try {
      const contract = getContract()
      if (!contract) throw new Error('Contract not ready. Set CONTRACT_ADDRESS.')
      setLoading(true)
      const tx = await contract.mintBook(title.trim(), author.trim(), Number(pages), coverUrl.trim())
      setTxHash(tx.hash)
      await tx.wait()
      setTitle('')
      setAuthor('')
      setPages('')
      setCoverUrl('')
    } catch (e) {
      setError(e.message || 'Transaction failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Book Details */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-biblio-muted mb-2">Book Title *</label>
            <input 
              className="w-full px-4 py-3 rounded-lg bg-biblio-surface/40 border border-biblio-border focus:outline-none focus:ring-2 focus:ring-biblio-gold focus:border-transparent transition-all duration-200" 
              placeholder="Enter book title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-biblio-muted mb-2">Author *</label>
            <input 
              className="w-full px-4 py-3 rounded-lg bg-biblio-surface/40 border border-biblio-border focus:outline-none focus:ring-2 focus:ring-biblio-gold focus:border-transparent transition-all duration-200" 
              placeholder="Enter author name" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              required 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-biblio-muted mb-2">Number of Pages *</label>
            <input 
              className="w-full px-4 py-3 rounded-lg bg-biblio-surface/40 border border-biblio-border focus:outline-none focus:ring-2 focus:ring-biblio-gold focus:border-transparent transition-all duration-200" 
              placeholder="e.g., 320" 
              type="number" 
              min="1" 
              value={pages} 
              onChange={(e) => setPages(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-biblio-muted mb-2">Cover Image URL</label>
            <input 
              className="w-full px-4 py-3 rounded-lg bg-biblio-surface/40 border border-biblio-border focus:outline-none focus:ring-2 focus:ring-biblio-gold focus:border-transparent transition-all duration-200" 
              placeholder="https://example.com/cover.jpg" 
              value={coverUrl} 
              onChange={(e) => setCoverUrl(e.target.value)} 
            />
          </div>
        </div>
      </div>

      {/* Cover Preview */}
      {coverUrl && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-biblio-muted">Cover Preview</label>
          <div className="w-32 h-40 rounded-lg overflow-hidden border border-biblio-border bg-biblio-surface/40">
            <img 
              src={coverUrl} 
              alt="Book cover preview" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="w-full h-full flex items-center justify-center text-biblio-muted text-sm" style={{display: 'none'}}>
              Invalid URL
            </div>
          </div>
        </div>
      )}

      {/* Minting Status */}
      {loading && (
        <div className="bg-biblio-surface/40 border border-biblio-border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-biblio-gold border-t-transparent rounded-full animate-spin"></div>
            <div>
              <div className="font-semibold text-biblio-heading">Minting in Progress...</div>
              <div className="text-sm text-biblio-muted">Please wait while your book NFT is being created</div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Hash */}
      {txHash && (
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-green-400">Minting Successful!</div>
              <a 
                className="text-sm text-biblio-blue underline hover:text-biblio-gold transition-colors" 
                href={`https://testnet.bscscan.com/tx/${txHash}`} 
                target="_blank" 
                rel="noreferrer"
              >
                View Transaction
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white text-sm">✕</span>
            </div>
            <div className="text-red-400 text-sm">{error}</div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button 
        disabled={loading} 
        className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-biblio-gold to-yellow-500 text-black font-bold shadow-glow hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:transform-none"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            Minting Book NFT...
          </div>
        ) : (
          'Mint Book NFT'
        )}
      </button>
    </form>
  )
}


