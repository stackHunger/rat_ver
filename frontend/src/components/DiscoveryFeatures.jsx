import React, { useState } from 'react'

export default function DiscoveryFeatures() {
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const genres = [
    { id: 'all', name: 'All Genres', icon: '📚' },
    { id: 'fiction', name: 'Fiction', icon: '📖' },
    { id: 'non-fiction', name: 'Non-Fiction', icon: '📘' },
    { id: 'sci-fi', name: 'Science Fiction', icon: '🚀' },
    { id: 'mystery', name: 'Mystery', icon: '🔍' },
    { id: 'romance', name: 'Romance', icon: '💕' }
  ]

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-biblio-surface/40 border border-biblio-border rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-biblio-muted mb-2">Search Books</label>
            <input
              type="text"
              placeholder="Search by title, author, or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-biblio-surface/60 border border-biblio-border focus:outline-none focus:ring-2 focus:ring-biblio-gold focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-biblio-muted mb-2">Sort By</label>
            <select className="px-4 py-3 rounded-lg bg-biblio-surface/60 border border-biblio-border focus:outline-none focus:ring-2 focus:ring-biblio-gold focus:border-transparent transition-all duration-200">
              <option value="recent">Recently Minted</option>
              <option value="popular">Most Popular</option>
              <option value="rare">Rarest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Genre Filter */}
      <div className="bg-biblio-surface/40 border border-biblio-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-biblio-heading mb-4">Browse by Genre</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                selectedGenre === genre.id
                  ? 'bg-biblio-gold text-black border-biblio-gold'
                  : 'bg-biblio-surface/60 border-biblio-border hover:bg-biblio-surface/80'
              }`}
            >
              <div className="text-2xl mb-2">{genre.icon}</div>
              <div className="text-sm font-semibold">{genre.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-biblio-surface/40 border border-biblio-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-biblio-heading mb-4">Recommended for You</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-biblio-surface/60 border border-biblio-border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-biblio-gold/20 flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <div className="font-semibold text-biblio-heading">Based on Your Collection</div>
                <div className="text-sm text-biblio-muted">Books similar to what you own</div>
              </div>
            </div>
            <div className="space-y-2">
              {['The Catcher in the Rye', 'To Kill a Mockingbird', 'Lord of the Flies'].map((book, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-biblio-surface/40 rounded">
                  <span className="text-sm text-biblio-heading">{book}</span>
                  <button className="text-xs text-biblio-blue hover:text-biblio-gold transition-colors">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-biblio-surface/60 border border-biblio-border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-biblio-blue/20 flex items-center justify-center">
                <span className="text-xl">🔥</span>
              </div>
              <div>
                <div className="font-semibold text-biblio-heading">Trending Now</div>
                <div className="text-sm text-biblio-muted">Most popular this week</div>
              </div>
            </div>
            <div className="space-y-2">
              {['Dune', 'The Handmaid\'s Tale', 'Brave New World'].map((book, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-biblio-surface/40 rounded">
                  <span className="text-sm text-biblio-heading">{book}</span>
                  <span className="text-xs text-biblio-gold font-semibold">+{15 - index * 3} mints</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
