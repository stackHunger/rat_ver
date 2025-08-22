import React, { useState, useEffect } from 'react'
import WalletConnect from './components/WalletConnect.jsx'
import MintBookForm from './components/MintBookForm.jsx'
import NFTGallery from './components/NFTGallery.jsx'
import Compare from './components/Compare.jsx'
                                                                                                                                                                                                                                                                    import SocialFeatures from './components/SocialFeatures.jsx'
import DiscoveryFeatures from './components/DiscoveryFeatures.jsx'
import { getProvider, getContract } from './utils/contract'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [stats, setStats] = useState({ totalBooks: 0, totalUsers: 0, recentMints: 0 })
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('0')

  useEffect(() => {
    const loadStats = async () => {
      try {
        const contract = getContract()
        if (contract) {
          const totalSupply = await contract.totalSupply()
          setStats(prev => ({ ...prev, totalBooks: totalSupply.toNumber() }))
        }
      } catch (e) {
        console.log('Could not load stats:', e.message)
      }
    }
    loadStats()
  }, [])

  useEffect(() => {
    const loadWalletInfo = async () => {
      const provider = getProvider()
      if (!provider) return
      
      try {
        const accounts = await provider.send('eth_accounts', [])
        if (accounts[0]) {
          setAddress(accounts[0])
          const balance = await provider.getBalance(accounts[0])
          setBalance((parseFloat(balance) / 1e18).toFixed(4))
        }
      } catch (e) {
        console.log('Could not load wallet info:', e.message)
      }
    }
    loadWalletInfo()
  }, [])

  const truncateAddress = (addr) => addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : ''

  return (
    <div className="min-h-screen bg-biblio-bg">
      {/* Enhanced Navigation */}
      <nav className="sticky top-0 z-50 bg-biblio-bg/95 backdrop-blur-sm border-b border-biblio-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-biblio-gold to-biblio-blue border border-biblio-border/60 flex items-center justify-center shadow-glow">
                <span className="font-serif text-black text-xl font-bold">B</span>
              </div>
              <div className="font-serif text-2xl text-biblio-heading font-bold">BookNFT</div>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-biblio-muted">
              <button 
                onClick={() => setActiveSection('home')} 
                className={`hover:text-biblio-heading transition-colors font-medium ${activeSection === 'home' ? 'text-biblio-gold' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveSection('library')} 
                className={`hover:text-biblio-heading transition-colors font-medium ${activeSection === 'library' ? 'text-biblio-gold' : ''}`}
              >
                Library
              </button>
              <button 
                onClick={() => setActiveSection('discover')} 
                className={`hover:text-biblio-heading transition-colors font-medium ${activeSection === 'discover' ? 'text-biblio-gold' : ''}`}
              >
                Discover
              </button>
              <button 
                onClick={() => setActiveSection('create')} 
                className={`hover:text-biblio-heading transition-colors font-medium ${activeSection === 'create' ? 'text-biblio-gold' : ''}`}
              >
                Create
              </button>
              <button 
                onClick={() => setActiveSection('compare')} 
                className={`hover:text-biblio-heading transition-colors font-medium ${activeSection === 'compare' ? 'text-biblio-gold' : ''}`}
              >
                Compare
              </button>
              <button 
                onClick={() => setActiveSection('social')} 
                className={`hover:text-biblio-heading transition-colors font-medium ${activeSection === 'social' ? 'text-biblio-gold' : ''}`}
              >
                Community
              </button>
            </div>

            <div className="flex items-center gap-4">
              {address && (
                <div className="hidden md:flex items-center gap-3 text-sm">
                  <div className="px-3 py-1 rounded-full bg-biblio-surface/60 border border-biblio-border">
                    <span className="text-biblio-muted">BNB:</span>
                    <span className="text-biblio-gold ml-1">{balance}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-biblio-surface/60 border border-biblio-border">
                    <span className="text-biblio-muted">Network:</span>
                    <span className="text-green-400 ml-1">Testnet</span>
                  </div>
                </div>
              )}
              <WalletConnect />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Neural Gateway Hero Section */}
        {activeSection === 'home' && (
          <section className="relative mb-20 min-h-screen">
            {/* Quantum Neural Background */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-quantum-void via-neural-aurora to-quantum-void"></div>
              <div className="absolute inset-0 opacity-40">
                <div className="neural-constellation-container">
                  <div className="neural-nodes">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="neural-node" style={{
                        '--delay': `${i * 0.3}s`,
                        '--x': `${10 + i * 8}%`,
                        '--y': `${20 + i * 6}%`,
                        '--pulse': `${2 + i * 0.5}s`
                      }}></div>
                    ))}
                  </div>
                  <div className="neural-connections">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="neural-connection" style={{
                        '--delay': `${i * 0.4}s`,
                        '--duration': `${3 + i * 0.5}s`
                      }}></div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Holographic Swarm */}
              <div className="absolute inset-0 opacity-30">
                <div className="holographic-swarm">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="avatar-orb" style={{
                      '--delay': `${i * 0.2}s`,
                      '--orbit': `${20 + i * 5}s`,
                      '--x': `${15 + i * 6}%`,
                      '--y': `${25 + i * 4}%`
                    }}>
                      <div className="avatar-core"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Neural Gateway Content */}
            <div className="relative z-10 text-center py-32 px-6">
              <div className="max-w-6xl mx-auto">
                {/* Neural Signature */}
                <div className="neural-signature mb-8 animate-fade-in-up">
                  <div className="text-sm text-quantum-blue font-mono tracking-wider">
                    NEURAL SIGNATURE: {address ? `${address.slice(0,6)}...${address.slice(-4)}` : 'UNSYNCED'}
                  </div>
                </div>

                {/* Main Headline with Neuro-Responsive Animation */}
                <h1 className="font-serif text-7xl md:text-9xl lg:text-[12rem] text-neural-white leading-none mb-8 animate-fade-in-up neuro-responsive">
                  Own Your Reading Journey
                </h1>
                
                {/* AI-Generated Sub-headline */}
                <p className="text-2xl md:text-3xl text-quantum-blue max-w-5xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  Forge Eternal Bonds with AI-Evolved Book Realms – Your Legacy Awaits, <span className="text-neural-gold font-bold">{address ? 'Neural Synced' : 'Quantum Ready'}</span>
                </p>

                                 {/* Collective Mind Consensus */}
                 <div className="collective-mind-consensus mb-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                   <div className="bg-quantum-surface/15 backdrop-blur-md border border-quantum-border rounded-2xl p-6 max-w-2xl mx-auto">
                     <div className="flex items-center justify-center gap-4 mb-3">
                       <div className="w-3 h-3 rounded-full bg-quantum-green animate-pulse"></div>
                       <span className="text-quantum-gold font-semibold">87% of Synced Minds Recommend 'Dune'</span>
                     </div>
                     <button className="text-quantum-blue hover:text-quantum-gold transition-colors text-sm">
                       Sync to Vote & Earn Neural Credits
                     </button>
                   </div>
                 </div>

                {/* Quantum-Entangled CTAs */}
                <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                  <button 
                    onClick={() => setActiveSection('library')}
                    className="quantum-entangled-btn primary-cta px-12 py-6 rounded-3xl bg-gradient-to-r from-quantum-void to-neural-aurora text-neural-white font-bold text-xl shadow-quantum hover:shadow-neural transition-all duration-500 transform hover:scale-110"
                  >
                    <span className="relative z-10">Enter the Multiverse</span>
                    <div className="quantum-particles"></div>
                  </button>
                  <button 
                    onClick={() => setActiveSection('create')}
                    className="quantum-entangled-btn secondary-cta px-12 py-6 rounded-3xl border-2 border-quantum-blue text-quantum-blue font-bold text-xl hover:bg-quantum-blue hover:text-neural-void transition-all duration-500"
                  >
                    <span className="relative z-10">Neural Sync Wallet</span>
                    <div className="biometric-indicator"></div>
                  </button>
                </div>

                                 {/* Neural Stats */}
                 <div className="neural-stats grid grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                   <div className="text-center">
                     <div className="text-3xl font-bold text-quantum-gold mb-2">15,420+</div>
                     <div className="text-quantum-blue text-sm">Synced Minds</div>
                   </div>
                   <div className="text-center">
                     <div className="text-3xl font-bold text-quantum-green mb-2">2.3M+</div>
                     <div className="text-quantum-blue text-sm">Neural Credits</div>
                   </div>
                   <div className="text-center">
                     <div className="text-3xl font-bold text-quantum-purple mb-2">847</div>
                     <div className="text-quantum-blue text-sm">Quantum Realms</div>
                   </div>
                 </div>
              </div>
            </div>
          </section>
        )}

        {/* Quantum-Adaptive Value Proposition Section */}
        {activeSection === 'home' && (
          <section className="mb-20">
                         <div className="quantum-fluid-grid grid md:grid-cols-4 gap-8">
               <div className="quantum-column text-center p-8 rounded-3xl bg-quantum-surface/15 border border-quantum-border hover:bg-quantum-surface/25 transition-all duration-500 transform hover:scale-110 group backdrop-blur-md">
                 <div className="neural-icon-container w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-quantum-blue/15 to-quantum-green/15 flex items-center justify-center group-hover:shadow-quantum transition-all duration-500">
                   <div className="quantum-tunnel-icon w-12 h-12 relative">
                     <div className="absolute inset-0 bg-quantum-blue rounded-full animate-ping"></div>
                     <div className="absolute inset-2 bg-quantum-green rounded-full animate-pulse"></div>
                     <div className="absolute inset-4 bg-quantum-purple rounded-full"></div>
                   </div>
                 </div>
                 <h3 className="text-2xl font-bold mb-4 text-quantum-white">Quantum Ownership</h3>
                 <p className="text-quantum-blue leading-relaxed">Transcend traditional ownership with quantum-entangled NFTs that evolve symbiotically with your neural patterns.</p>
                 <div className="mt-4">
                   <button className="text-quantum-green hover:text-quantum-gold transition-colors text-sm">
                     Neural Project →
                   </button>
                 </div>
               </div>
              
                             <div className="quantum-column text-center p-8 rounded-3xl bg-quantum-surface/15 border border-quantum-border hover:bg-quantum-surface/25 transition-all duration-500 transform hover:scale-110 group backdrop-blur-md">
                 <div className="neural-icon-container w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-quantum-purple/15 to-quantum-red/15 flex items-center justify-center group-hover:shadow-quantum transition-all duration-500">
                   <div className="infinite-rarity-icon w-12 h-12 relative">
                     <div className="absolute inset-0 border-2 border-quantum-purple rounded-full animate-spin"></div>
                     <div className="absolute inset-2 border-2 border-quantum-red rounded-full animate-spin" style={{animationDirection: 'reverse'}}></div>
                     <div className="absolute inset-4 bg-quantum-gold rounded-full animate-pulse"></div>
                   </div>
                 </div>
                 <h3 className="text-2xl font-bold mb-4 text-quantum-white">Infinite Rarities</h3>
                 <p className="text-quantum-blue leading-relaxed">Discover NFTs that mutate and evolve through AI contributions, creating infinite variations of literary masterpieces.</p>
                 <div className="mt-4">
                   <button className="text-quantum-green hover:text-quantum-gold transition-colors text-sm">
                     Explore Mutations →
                   </button>
                 </div>
               </div>
              
              <div className="quantum-column text-center p-8 rounded-3xl bg-quantum-surface/20 border border-quantum-border hover:bg-quantum-surface/40 transition-all duration-500 transform hover:scale-110 group backdrop-blur-md">
                <div className="neural-icon-container w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-quantum-green/20 to-quantum-blue/20 flex items-center justify-center group-hover:shadow-quantum transition-all duration-500">
                  <div className="symbiotic-community-icon w-12 h-12 relative">
                    <div className="absolute inset-0 bg-quantum-green rounded-full animate-pulse"></div>
                    <div className="absolute inset-2 bg-quantum-blue rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute inset-4 bg-quantum-purple rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-neural-white">Symbiotic Communities</h3>
                <p className="text-quantum-blue leading-relaxed">Join neural hive minds where collective consciousness shapes the evolution of literary realms and NFT ecosystems.</p>
                <div className="mt-4">
                  <button className="text-quantum-green hover:text-neural-gold transition-colors text-sm">
                    Join Hive Mind →
                  </button>
                </div>
              </div>
              
              <div className="quantum-column text-center p-8 rounded-3xl bg-quantum-surface/20 border border-quantum-border hover:bg-quantum-surface/40 transition-all duration-500 transform hover:scale-110 group backdrop-blur-md">
                <div className="neural-icon-container w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-quantum-red/20 to-quantum-gold/20 flex items-center justify-center group-hover:shadow-quantum transition-all duration-500">
                  <div className="eternal-evolution-icon w-12 h-12 relative">
                    <div className="absolute inset-0 border-2 border-quantum-red rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-2 border-quantum-gold rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '3s'}}></div>
                    <div className="absolute inset-4 bg-quantum-green rounded-full animate-bounce"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-neural-white">Eternal Evolution</h3>
                <p className="text-quantum-blue leading-relaxed">Witness your NFTs transcend time through AI-driven evolution, adapting to cultural shifts and user interactions.</p>
                <div className="mt-4">
                  <button className="text-quantum-green hover:text-neural-gold transition-colors text-sm">
                    View Evolution →
                  </button>
                </div>
              </div>
            </div>
            
            {/* Personalization Layer */}
            <div className="mt-12 text-center">
              <div className="bg-quantum-surface/20 border border-quantum-border rounded-3xl p-6 backdrop-blur-md">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-quantum-green animate-pulse"></div>
                  <span className="text-neural-gold font-semibold">Neural Profile Analysis</span>
                </div>
                <p className="text-quantum-blue mb-4">
                  Your neural profile aligns with philosophical epics—unlock hidden dimensions?
                </p>
                <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-quantum-blue to-quantum-green text-neural-void font-bold hover:shadow-quantum transition-all duration-300">
                  Unlock Dimensions
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Living Multiverse Nexus - Featured Collections */}
        {activeSection === 'home' && (
          <section className="mb-20">
            <div className="bg-quantum-surface/20 border border-quantum-border rounded-3xl p-8 backdrop-blur-md">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-bold text-neural-white mb-2">Living Multiverse Nexus</h2>
                  <p className="text-quantum-blue">Sentient collections that breathe and interact</p>
                </div>
                <div className="flex gap-4">
                  <button className="px-4 py-2 rounded-2xl bg-quantum-surface/40 border border-quantum-border text-quantum-blue hover:text-neural-gold transition-colors">
                    <span className="mr-2">🧠</span>
                    Neural Filter
                  </button>
                  <button 
                    onClick={() => setActiveSection('library')}
                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-quantum-blue to-quantum-green text-neural-void font-semibold hover:shadow-quantum transition-all duration-300"
                  >
                    Traverse Realms →
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide">
                  {[
                    { 
                      title: 'The Great Gatsby', 
                      author: 'F. Scott Fitzgerald', 
                      collectors: 234, 
                      edition: '1 of 500', 
                      cover: '📚',
                      symbiosisScore: 94,
                      evolutionStage: 'Quantum',
                      neuralFusion: true,
                      price: '2.4 ETH',
                      prediction: '+23%'
                    },
                    { 
                      title: '1984', 
                      author: 'George Orwell', 
                      collectors: 189, 
                      edition: '1 of 300', 
                      cover: '📖',
                      symbiosisScore: 87,
                      evolutionStage: 'Neural',
                      neuralFusion: false,
                      price: '1.8 ETH',
                      prediction: '+15%'
                    },
                    { 
                      title: 'Pride and Prejudice', 
                      author: 'Jane Austen', 
                      collectors: 156, 
                      edition: '1 of 400', 
                      cover: '📘',
                      symbiosisScore: 92,
                      evolutionStage: 'Ethereal',
                      neuralFusion: true,
                      price: '3.1 ETH',
                      prediction: '+31%'
                    },
                    { 
                      title: 'The Hobbit', 
                      author: 'J.R.R. Tolkien', 
                      collectors: 298, 
                      edition: '1 of 600', 
                      cover: '🐉',
                      symbiosisScore: 89,
                      evolutionStage: 'Mythic',
                      neuralFusion: true,
                      price: '4.2 ETH',
                      prediction: '+42%'
                    },
                    { 
                      title: 'Dune', 
                      author: 'Frank Herbert', 
                      collectors: 145, 
                      edition: '1 of 250', 
                      cover: '🚀',
                      symbiosisScore: 96,
                      evolutionStage: 'Cosmic',
                      neuralFusion: true,
                      price: '5.7 ETH',
                      prediction: '+67%'
                    },
                    { 
                      title: 'Brave New World', 
                      author: 'Aldous Huxley', 
                      collectors: 167, 
                      edition: '1 of 350', 
                      cover: '🔮',
                      symbiosisScore: 91,
                      evolutionStage: 'Prophetic',
                      neuralFusion: false,
                      price: '2.9 ETH',
                      prediction: '+28%'
                    }
                  ].map((book, index) => (
                    <div key={index} className="flex-shrink-0 w-80 group">
                      <div className="sentient-book-card bg-quantum-surface/40 border border-quantum-border rounded-3xl overflow-hidden shadow-quantum hover:shadow-neural transition-all duration-500 transform hover:scale-110 group-hover:-translate-y-4">
                        <div className="relative">
                          <div className="w-full h-56 bg-gradient-to-br from-quantum-blue/20 to-quantum-purple/20 flex items-center justify-center relative overflow-hidden">
                            <span className="text-7xl relative z-10">{book.cover}</span>
                            <div className="absolute inset-0 neural-network-overlay opacity-20"></div>
                          </div>
                          <div className="absolute top-4 right-4 flex gap-2">
                            <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                              <span className="text-xs text-white font-semibold">{book.edition}</span>
                            </div>
                            <div className="bg-quantum-green/80 backdrop-blur-sm rounded-full px-3 py-1">
                              <span className="text-xs text-neural-void font-semibold">{book.symbiosisScore}%</span>
                            </div>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <div className="bg-quantum-purple/80 backdrop-blur-sm rounded-full px-3 py-1">
                              <span className="text-xs text-neural-white font-semibold">{book.evolutionStage}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold text-neural-white mb-2 text-lg">{book.title}</h3>
                          <p className="text-quantum-blue mb-4">by {book.author}</p>
                          
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-quantum-blue">Symbiosis Score</span>
                              <span className="text-neural-gold font-semibold">{book.symbiosisScore}%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-quantum-blue">Current Price</span>
                              <span className="text-quantum-green font-semibold">{book.price}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-quantum-blue">Prediction</span>
                              <span className="text-quantum-green font-semibold">{book.prediction}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-quantum-blue text-sm">Owned by {book.collectors}</span>
                            <div className="flex gap-2">
                              {book.neuralFusion && (
                                <button className="text-quantum-green hover:text-neural-gold transition-colors text-sm">
                                  Neural Fusion
                                </button>
                              )}
                              <button className="text-quantum-blue hover:text-neural-gold transition-colors text-sm opacity-0 group-hover:opacity-100">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* AI Neural Network Curator */}
                <div className="mt-8 bg-quantum-surface/20 border border-quantum-border rounded-3xl p-6 backdrop-blur-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-quantum-blue to-quantum-green flex items-center justify-center">
                      <span className="text-lg">🧠</span>
                    </div>
                    <div>
                      <h3 className="text-neural-white font-semibold">AI Neural Network Curator</h3>
                      <p className="text-quantum-blue text-sm">Suggested path based on your neural patterns</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-4 py-2 rounded-2xl bg-quantum-surface/40 border border-quantum-border text-quantum-blue hover:text-neural-gold transition-colors">
                      Traverse the Sci-Fi Vortex
                    </button>
                    <button className="px-4 py-2 rounded-2xl bg-quantum-surface/40 border border-quantum-border text-quantum-blue hover:text-neural-gold transition-colors">
                      Explore Quantum Attributes
                    </button>
                    <button className="px-4 py-2 rounded-2xl bg-quantum-surface/40 border border-quantum-border text-quantum-blue hover:text-neural-gold transition-colors">
                      Branching Realities
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Neural Simulation Engine - How It Works */}
        {activeSection === 'home' && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-neural-white mb-4">Neural Simulation Engine</h2>
              <p className="text-2xl text-quantum-blue max-w-4xl mx-auto">Pilot your avatar through quantum flowcharts and experience mind-meld minting</p>
            </div>
            
            <div className="bg-quantum-surface/20 border border-quantum-border rounded-3xl p-8 backdrop-blur-md">
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { 
                    step: '1', 
                    title: 'Neural Sync', 
                    desc: 'Establish quantum entanglement with your neural patterns', 
                    icon: '🧠',
                    zkProof: 'Privacy-Enhanced',
                    oracleCalls: 'Real-time biometrics'
                  },
                  { 
                    step: '2', 
                    title: 'Quantum Selection', 
                    desc: 'Navigate through AI-curated dimensions of literary realms', 
                    icon: '🌌',
                    zkProof: 'Zero-knowledge browsing',
                    oracleCalls: 'Predictive recommendations'
                  },
                  { 
                    step: '3', 
                    title: 'Mind-Meld Mint', 
                    desc: 'Fuse your consciousness with the NFT creation process', 
                    icon: '⚡',
                    zkProof: 'Secure minting proofs',
                    oracleCalls: 'Gas optimization'
                  },
                  { 
                    step: '4', 
                    title: 'Eternal Evolution', 
                    desc: 'Witness your NFT transcend through AI-driven metamorphosis', 
                    icon: '🦋',
                    zkProof: 'Evolution verification',
                    oracleCalls: 'Cultural adaptation'
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-quantum-blue to-quantum-green flex items-center justify-center text-3xl font-bold text-neural-void group-hover:scale-110 transition-all duration-500 shadow-quantum">
                        {item.icon}
                      </div>
                      {index < 3 && (
                        <div className="hidden md:block absolute top-10 left-full w-full h-1 bg-gradient-to-r from-quantum-blue to-transparent transform translate-x-4">
                          <div className="w-3 h-3 bg-quantum-green rounded-full absolute -top-1 right-0 animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-neural-white mb-2">{item.title}</h3>
                    <p className="text-quantum-blue mb-4">{item.desc}</p>
                    
                    {/* ZK Proof and Oracle Info */}
                    <div className="space-y-2 text-xs">
                      <div className="bg-quantum-surface/40 rounded-lg p-2">
                        <div className="text-quantum-green font-semibold">{item.zkProof}</div>
                      </div>
                      <div className="bg-quantum-surface/40 rounded-lg p-2">
                        <div className="text-quantum-purple font-semibold">{item.oracleCalls}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Neural Simulation Controls */}
              <div className="mt-12 text-center">
                <div className="bg-quantum-surface/40 border border-quantum-border rounded-3xl p-6 backdrop-blur-md">
                  <h3 className="text-neural-white font-semibold mb-4">Neural Simulation Controls</h3>
                  <div className="flex justify-center gap-4">
                    <button className="px-6 py-3 rounded-2xl bg-quantum-surface/60 border border-quantum-border text-quantum-blue hover:text-neural-gold transition-colors">
                      <span className="mr-2">🎮</span>
                      Start Simulation
                    </button>
                    <button className="px-6 py-3 rounded-2xl bg-quantum-surface/60 border border-quantum-border text-quantum-blue hover:text-neural-gold transition-colors">
                      <span className="mr-2">🔮</span>
                      View Flowchart
                    </button>
                    <button className="px-6 py-3 rounded-2xl bg-quantum-surface/60 border border-quantum-border text-quantum-blue hover:text-neural-gold transition-colors">
                      <span className="mr-2">📊</span>
                      Oracle Stats
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Collective Consciousness Hub - Testimonials */}
        {activeSection === 'home' && (
          <section className="mb-20">
            <div className="bg-quantum-surface/20 border border-quantum-border rounded-3xl p-8 backdrop-blur-md">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-neural-white mb-4">Collective Consciousness Hub</h2>
                <p className="text-xl text-quantum-blue">Neural hive mind interface with AI-synthesized voices</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  { 
                    quote: "My neural patterns have evolved through BookNFT's quantum realms. Each NFT feels like an extension of my consciousness.", 
                    author: "Dr. Sarah Chen", 
                    role: "Neural Architect", 
                    avatar: "👩‍💼",
                    neuralSignature: "0x8f2a...",
                    consciousnessLevel: "Transcendent",
                    aiVoice: true
                  },
                  { 
                    quote: "The symbiotic relationship between my mind and the NFT ecosystem has created something beyond traditional ownership.", 
                    author: "Marcus Rodriguez", 
                    role: "Quantum Author", 
                    avatar: "👨‍💻",
                    neuralSignature: "0x3e9b...",
                    consciousnessLevel: "Ethereal",
                    aiVoice: true
                  },
                  { 
                    quote: "I've witnessed my collection breathe and evolve through the collective neural network. It's pure consciousness.", 
                    author: "Emma Thompson", 
                    role: "Consciousness Explorer", 
                    avatar: "👩‍🎓",
                    neuralSignature: "0x7c4d...",
                    consciousnessLevel: "Cosmic",
                    aiVoice: true
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="consciousness-bubble bg-quantum-surface/40 border border-quantum-border rounded-3xl p-6 hover:bg-quantum-surface/60 transition-all duration-500 transform hover:scale-105">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-quantum-blue to-quantum-green flex items-center justify-center text-xl">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-neural-white">{testimonial.author}</div>
                        <div className="text-sm text-quantum-green">{testimonial.role}</div>
                      </div>
                      {testimonial.aiVoice && (
                        <div className="ml-auto">
                          <div className="w-6 h-6 rounded-full bg-quantum-purple flex items-center justify-center">
                            <span className="text-xs text-neural-white">AI</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-quantum-blue italic leading-relaxed">"{testimonial.quote}"</p>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-quantum-blue">Neural Signature:</span>
                        <span className="text-quantum-green font-mono">{testimonial.neuralSignature}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-quantum-blue">Consciousness Level:</span>
                        <span className="text-neural-gold font-semibold">{testimonial.consciousnessLevel}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-quantum-border/50">
                      <button className="text-quantum-blue hover:text-neural-gold transition-colors text-sm">
                        <span className="mr-2">🎤</span>
                        Play AI Voice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Oracle-Verified AMA Section */}
              <div className="bg-quantum-surface/40 border border-quantum-border rounded-3xl p-6 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-quantum-purple to-quantum-red flex items-center justify-center">
                    <span className="text-lg">🔮</span>
                  </div>
                  <div>
                    <h3 className="text-neural-white font-semibold">Oracle-Verified AMA</h3>
                    <p className="text-quantum-blue text-sm">Crowdsourced questions via neural voting</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-quantum-surface/60 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-neural-white font-semibold">Q: How do neural patterns affect NFT evolution?</span>
                        <span className="text-quantum-green text-sm">87 votes</span>
                      </div>
                      <div className="text-quantum-blue text-sm">Answered by Dr. Chen via AI synthesis</div>
                    </div>
                    
                    <div className="bg-quantum-surface/60 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-neural-white font-semibold">Q: What's the future of consciousness in NFTs?</span>
                        <span className="text-quantum-green text-sm">156 votes</span>
                      </div>
                      <div className="text-quantum-blue text-sm">Answered by Marcus via neural projection</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-quantum-surface/60 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-neural-white font-semibold">Q: How do quantum attributes work?</span>
                        <span className="text-quantum-green text-sm">203 votes</span>
                      </div>
                      <div className="text-quantum-blue text-sm">Answered by Emma via consciousness stream</div>
                    </div>
                    
                    <div className="bg-quantum-surface/60 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-neural-white font-semibold">Q: Can I merge multiple consciousnesses?</span>
                        <span className="text-quantum-green text-sm">94 votes</span>
                      </div>
                      <div className="text-quantum-blue text-sm">Answered by Collective AI via neural synthesis</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-quantum-blue to-quantum-green text-neural-void font-semibold hover:shadow-quantum transition-all duration-300">
                    Submit Neural Question
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Quantum Stats Counter & Oracle Dashboard */}
        {activeSection === 'home' && (
          <section className="mb-20">
            <div className="bg-quantum-surface/20 border border-quantum-border rounded-3xl p-8 backdrop-blur-md">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-neural-white mb-4">Quantum Oracle Dashboard</h2>
                <p className="text-xl text-quantum-blue">Fluctuating metrics with AI foresight and predictive holograms</p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-8 mb-12">
                {[
                  { 
                    number: '25,934', 
                    label: 'Total Books Minted', 
                    icon: '📚',
                    trend: '+23%',
                    prediction: '32,847 by Q2 2025',
                    quantumState: 'Entangled'
                  },
                  { 
                    number: '4,201', 
                    label: 'Active Collectors', 
                    icon: '👥',
                    trend: '+15%',
                    prediction: '5,234 by Q2 2025',
                    quantumState: 'Superposition'
                  },
                  { 
                    number: '1,602', 
                    label: 'Stories Published', 
                    icon: '✍️',
                    trend: '+31%',
                    prediction: '2,847 by Q2 2025',
                    quantumState: 'Coherent'
                  },
                  { 
                    number: '847', 
                    label: 'Quantum Realms', 
                    icon: '🌌',
                    trend: '+42%',
                    prediction: '1,234 by Q2 2025',
                    quantumState: 'Transcendent'
                  }
                ].map((stat, index) => (
                  <div key={index} className="quantum-stat-card text-center p-8 bg-quantum-surface/40 border border-quantum-border rounded-3xl hover:bg-quantum-surface/60 transition-all duration-500 transform hover:scale-105">
                    <div className="text-5xl mb-4">{stat.icon}</div>
                    <div className="text-4xl font-bold text-neural-gold mb-2">{stat.number}</div>
                    <div className="text-quantum-blue font-semibold mb-3">{stat.label}</div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-quantum-green">↑</span>
                        <span className="text-quantum-green font-semibold">{stat.trend}</span>
                      </div>
                      <div className="text-quantum-purple font-mono text-xs">
                        {stat.prediction}
                      </div>
                      <div className="bg-quantum-surface/60 rounded-lg p-2">
                        <span className="text-neural-gold font-semibold">{stat.quantumState}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Predictive Holograms */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-quantum-surface/40 border border-quantum-border rounded-3xl p-6 backdrop-blur-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-quantum-blue to-quantum-green flex items-center justify-center">
                      <span className="text-lg">📈</span>
                    </div>
                    <div>
                      <h3 className="text-neural-white font-semibold">Future Value Trajectory</h3>
                      <p className="text-quantum-blue text-sm">Orbital Rise Prediction</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-quantum-blue">Current Market Cap</span>
                      <span className="text-neural-gold font-semibold">$47.2M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-quantum-blue">Predicted Q2 2025</span>
                      <span className="text-quantum-green font-semibold">$89.7M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-quantum-blue">Growth Rate</span>
                      <span className="text-quantum-purple font-semibold">+89.2%</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-quantum-border/50">
                    <div className="w-full bg-quantum-surface/60 rounded-full h-2">
                      <div className="bg-gradient-to-r from-quantum-blue to-quantum-green h-2 rounded-full" style={{width: '89%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-quantum-surface/40 border border-quantum-border rounded-3xl p-6 backdrop-blur-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-quantum-purple to-quantum-red flex items-center justify-center">
                      <span className="text-lg">🧠</span>
                    </div>
                    <div>
                      <h3 className="text-neural-white font-semibold">Mind Legacy Index</h3>
                      <p className="text-quantum-blue text-sm">Your Impact on the Ecosystem</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-quantum-blue">Neural Influence</span>
                      <span className="text-neural-gold font-semibold">847th</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-quantum-blue">Consciousness Score</span>
                      <span className="text-quantum-green font-semibold">94.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-quantum-blue">Evolution Impact</span>
                      <span className="text-quantum-purple font-semibold">+23.7%</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-quantum-border/50">
                    <div className="w-full bg-quantum-surface/60 rounded-full h-2">
                      <div className="bg-gradient-to-r from-quantum-purple to-quantum-red h-2 rounded-full" style={{width: '94%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Oracle Integration Status */}
              <div className="mt-8 bg-quantum-surface/40 border border-quantum-border rounded-3xl p-6 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-quantum-green flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                    <div>
                      <h3 className="text-neural-white font-semibold">Oracle Integration Status</h3>
                      <p className="text-quantum-blue text-sm">All neural networks synchronized</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-quantum-green font-semibold">100% Operational</div>
                    <div className="text-quantum-blue text-sm">847 oracles active</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Eternal Loop Portal - Final CTA */}
        {activeSection === 'home' && (
          <section className="mb-20">
            <div className="eternal-loop-portal bg-gradient-to-r from-quantum-void/20 via-neural-aurora/30 to-quantum-void/20 border border-quantum-gold/30 rounded-3xl p-16 text-center backdrop-blur-md relative overflow-hidden">
              {/* Quantum Particles Background */}
              <div className="absolute inset-0 quantum-particles-bg opacity-20"></div>
              
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-quantum-blue to-quantum-green flex items-center justify-center mb-6">
                    <span className="text-3xl">🌌</span>
                  </div>
                  <h2 className="text-5xl font-bold text-neural-white mb-4">Ready to Transcend Reality?</h2>
                  <p className="text-2xl text-quantum-blue mb-8 max-w-3xl mx-auto">
                    Join the neural hive mind and forge your eternal legacy in the quantum literary multiverse.
                  </p>
                </div>
                
                {/* Oracle Predictions */}
                <div className="mb-8">
                  <div className="bg-quantum-surface/40 border border-quantum-border rounded-3xl p-6 backdrop-blur-md max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-3 h-3 rounded-full bg-quantum-red animate-pulse"></div>
                      <span className="text-neural-gold font-semibold">Oracle Prediction</span>
                    </div>
                    <p className="text-quantum-blue">
                      Rarity Vortex Closing in <span className="text-quantum-red font-bold">5 Neural Cycles</span> — 
                      <span className="text-quantum-green font-semibold"> 89% probability of exponential growth</span>
                    </p>
                  </div>
                </div>
                
                {/* Quantum-Entangled CTA */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                  <button 
                    onClick={() => setActiveSection('create')}
                    className="quantum-entangled-btn primary-cta px-16 py-6 rounded-3xl bg-gradient-to-r from-quantum-blue to-quantum-green text-neural-void font-bold text-xl shadow-quantum hover:shadow-neural transition-all duration-500 transform hover:scale-110"
                  >
                    <span className="relative z-10">Mind-Mint Now</span>
                    <div className="quantum-particles"></div>
                  </button>
                  <button 
                    onClick={() => setActiveSection('library')}
                    className="quantum-entangled-btn secondary-cta px-16 py-6 rounded-3xl border-2 border-quantum-gold text-quantum-gold font-bold text-xl hover:bg-quantum-gold hover:text-neural-void transition-all duration-500"
                  >
                    <span className="relative z-10">Explore Multiverse</span>
                    <div className="biometric-indicator"></div>
                  </button>
                </div>
                
                {/* Neural Tether Status */}
                <div className="bg-quantum-surface/40 border border-quantum-border rounded-3xl p-6 backdrop-blur-md max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="w-3 h-3 rounded-full bg-quantum-green animate-pulse"></div>
                    <span className="text-neural-gold font-semibold">Neural Tether Active</span>
                  </div>
                  <p className="text-quantum-blue text-sm">
                    Your consciousness is permanently linked to the BookNFT multiverse. 
                    <span className="text-quantum-green font-semibold"> Legacy preservation: 99.9%</span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Library Section */}
        {activeSection === 'library' && (
          <section className="mb-10">
            <div className="bg-biblio-surface/60 border border-biblio-border rounded-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-bold text-biblio-heading mb-2">Your Digital Library</h2>
                  <p className="text-biblio-muted">Manage and explore your book collection</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 rounded-xl bg-biblio-surface/40 border border-biblio-border hover:bg-biblio-surface/60 transition-all duration-200">
                    <span className="mr-2">🔍</span>
                    Search
                  </button>
                  <button className="px-6 py-3 rounded-xl bg-biblio-surface/40 border border-biblio-border hover:bg-biblio-surface/60 transition-all duration-200">
                    <span className="mr-2">⚙️</span>
                    Filter
                  </button>
                </div>
              </div>
              <NFTGallery variant="self" />
            </div>
          </section>
        )}

        {/* Discover Section */}
        {activeSection === 'discover' && (
          <section className="mb-10">
            <div className="bg-biblio-surface/60 border border-biblio-border rounded-2xl p-8">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-biblio-heading mb-2">Discover New Books</h2>
                <p className="text-biblio-muted">Explore and find your next favorite read</p>
              </div>
              <DiscoveryFeatures />
            </div>
          </section>
        )}

        {/* Create Section */}
        {activeSection === 'create' && (
          <section className="mb-10">
            <div className="bg-biblio-surface/60 border border-biblio-border rounded-2xl p-8">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-biblio-heading mb-2">Create a New Masterpiece</h2>
                  <p className="text-xl text-biblio-muted">Transform your favorite book into a unique NFT</p>
                </div>
                <MintBookForm />
              </div>
            </div>
          </section>
        )}

        {/* Compare Section */}
        {activeSection === 'compare' && (
          <section className="mb-10">
            <div className="bg-biblio-surface/60 border border-biblio-border rounded-2xl p-8">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-biblio-heading mb-2">Compare Collections</h2>
                <p className="text-biblio-muted">See how your collection stacks up against others</p>
              </div>
              <Compare />
            </div>
          </section>
        )}

        {/* Social Section */}
        {activeSection === 'social' && (
          <section className="mb-10">
            <div className="bg-biblio-surface/60 border border-biblio-border rounded-2xl p-8">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-biblio-heading mb-2">Community & Social</h2>
                <p className="text-biblio-muted">Connect with fellow readers and share your collections</p>
              </div>
              <SocialFeatures />
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center py-12 border-t border-biblio-border/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center gap-8 mb-6 text-sm text-biblio-muted">
              <a href="#" className="hover:text-biblio-heading transition-colors font-medium">FAQ</a>
              <a href="#" className="hover:text-biblio-heading transition-colors font-medium">Terms</a>
              <a href="#" className="hover:text-biblio-heading transition-colors font-medium">Privacy</a>
              <a href="#" className="hover:text-biblio-heading transition-colors font-medium">Support</a>
            </div>
            <div className="text-biblio-muted text-sm">
              Built on BNB Smart Chain — Testnet only · Powered by Shadow Stack
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}


