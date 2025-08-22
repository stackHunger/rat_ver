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
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="w-full px-3 py-2 rounded bg-danger-950/40 border border-danger-700/40 focus:outline-none focus:ring-2 focus:ring-danger-500" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input className="w-full px-3 py-2 rounded bg-danger-950/40 border border-danger-700/40 focus:outline-none focus:ring-2 focus:ring-danger-500" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="w-full px-3 py-2 rounded bg-danger-950/40 border border-danger-700/40 focus:outline-none focus:ring-2 focus:ring-danger-500" placeholder="Pages" type="number" min="1" value={pages} onChange={(e) => setPages(e.target.value)} required />
        <input className="w-full px-3 py-2 rounded bg-danger-950/40 border border-danger-700/40 focus:outline-none focus:ring-2 focus:ring-danger-500" placeholder="Cover Image URL (https://...)" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
      </div>
      <div className="flex items-center gap-3">
        <button disabled={loading} className="px-4 py-2 rounded bg-danger-600 hover:bg-danger-500 disabled:opacity-60 shadow-glow">
          {loading ? 'Minting...' : 'Mint Book NFT'}
        </button>
        {txHash && (
          <a className="text-sm text-biblio-blue underline" href={`https://testnet.bscscan.com/tx/${txHash}`} target="_blank" rel="noreferrer">View Tx</a>
        )}
      </div>
      {error && <div className="text-red-400 text-sm">{error}</div>}
    </form>
  )
}


