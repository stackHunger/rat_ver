import React from 'react'
import WalletConnect from './components/WalletConnect.jsx'
import MintBookForm from './components/MintBookForm.jsx'
import NFTGallery from './components/NFTGallery.jsx'
import Compare from './components/Compare.jsx'

export default function App() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center justify-between py-4 mb-8 border-b border-biblio-border/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-biblio-blue/30 border border-biblio-border/60 flex items-center justify-center">
            <span className="font-serif text-biblio-gold text-lg">B</span>
          </div>
          <div className="font-serif text-xl text-biblio-heading">BookNFT</div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-biblio-muted">
          <a className="hover:text-biblio-heading" href="#home">Home</a>
          <a className="hover:text-biblio-heading" href="#library">My Library</a>
          <a className="hover:text-biblio-heading" href="#discover">Discover</a>
          <a className="hover:text-biblio-heading" href="#connect">Connect</a>
        </div>
        <div className="min-w-[260px]"><WalletConnect /></div>
      </nav>

      <section className="mb-10 grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-3">
          <h1 className="font-serif text-4xl md:text-5xl text-biblio-heading leading-tight">Own Your Reading Journey.</h1>
          <p className="mt-3 text-biblio-muted max-w-2xl">Read, Mint, and Own exclusive Book NFTs. Transform your digital library into a priceless collection.</p>
          <div className="mt-5 flex gap-3">
            <a href="#mint" className="px-5 py-3 rounded bg-biblio-gold text-black font-semibold shadow-glow hover:brightness-110">Connect Wallet</a>
            <a href="#library" className="px-5 py-3 rounded border border-biblio-border hover:bg-biblio-surface/60">Explore Library</a>
          </div>
        </div>
        <div className="md:col-span-2 bg-biblio-surface/60 border border-biblio-border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-3 text-biblio-heading">Create a New Masterpiece</h2>
          <MintBookForm />
        </div>
      </section>

      <section className="mb-6">
        <WalletConnect />
      </section>

      <section id="library" className="mb-10">
        <div className="bg-biblio-surface/60 border border-biblio-border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-3 text-biblio-heading">Your Collection</h2>
          <NFTGallery variant="self" />
        </div>
      </section>

      <section className="bg-biblio-surface/60 border border-biblio-border rounded-xl p-6 mb-10">
        <h2 className="font-semibold text-lg mb-3 text-biblio-heading">Shared Collections</h2>
        <Compare />
      </section>

      <footer className="text-center text-sm text-biblio-muted">
        Built on BNB Smart Chain — Testnet only · FAQ · Terms · Privacy
      </footer>
    </div>
  )
}


