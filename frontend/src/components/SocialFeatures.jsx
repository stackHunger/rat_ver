import React, { useState } from 'react'

export default function SocialFeatures() {
  const [selectedBook, setSelectedBook] = useState(null)
  const [shareUrl, setShareUrl] = useState('')

  const socialPlatforms = [
    { name: 'Twitter', icon: '🐦', color: 'bg-blue-500' },
    { name: 'Discord', icon: '🎮', color: 'bg-indigo-500' },
    { name: 'Telegram', icon: '📱', color: 'bg-blue-400' },
    { name: 'Reddit', icon: '🤖', color: 'bg-orange-500' }
  ]

  const generateShareUrl = (bookId) => {
    const baseUrl = window.location.origin
    return `${baseUrl}/book/${bookId}`
  }

  const shareToSocial = (platform, bookId) => {
    const url = generateShareUrl(bookId)
    const text = `Check out this amazing book NFT I just discovered on BookNFT! 📚✨`
    
    const shareUrls = {
      Twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      Discord: `https://discord.com/channels/@me?content=${encodeURIComponent(text + ' ' + url)}`,
      Telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      Reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`
    }
    
    window.open(shareUrls[platform], '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Social Sharing Section */}
      <div className="bg-biblio-surface/40 border border-biblio-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-biblio-heading mb-4">Share Your Collection</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socialPlatforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => shareToSocial(platform.name, 'sample-book-id')}
              className={`p-4 rounded-lg ${platform.color} hover:brightness-110 transition-all duration-200 text-white font-semibold flex flex-col items-center gap-2`}
            >
              <span className="text-2xl">{platform.icon}</span>
              <span className="text-sm">Share on {platform.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-biblio-surface/40 border border-biblio-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-biblio-heading mb-4">Community Highlights</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-biblio-surface/60 rounded-lg">
            <div className="text-3xl font-bold text-biblio-gold mb-2">1,247</div>
            <div className="text-biblio-muted">Total Books Minted</div>
          </div>
          <div className="text-center p-4 bg-biblio-surface/60 rounded-lg">
            <div className="text-3xl font-bold text-biblio-blue mb-2">89</div>
            <div className="text-biblio-muted">Active Collectors</div>
          </div>
          <div className="text-center p-4 bg-biblio-surface/60 rounded-lg">
            <div className="text-3xl font-bold text-green-400 mb-2">23</div>
            <div className="text-biblio-muted">Books This Week</div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-biblio-surface/40 border border-biblio-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-biblio-heading mb-4">Top Collectors</h3>
        <div className="space-y-3">
          {[
            { rank: 1, address: '0x1234...5678', books: 45, avatar: '👑' },
            { rank: 2, address: '0x8765...4321', books: 38, avatar: '🥈' },
            { rank: 3, address: '0xabcd...efgh', books: 32, avatar: '🥉' },
            { rank: 4, address: '0x9876...5432', books: 28, avatar: '4️⃣' },
            { rank: 5, address: '0xdcba...hgfe', books: 25, avatar: '5️⃣' }
          ].map((collector) => (
            <div key={collector.rank} className="flex items-center justify-between p-3 bg-biblio-surface/60 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-biblio-gold/20 flex items-center justify-center">
                  <span className="text-lg">{collector.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-biblio-heading">{collector.address}</div>
                  <div className="text-sm text-biblio-muted">Rank #{collector.rank}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-biblio-gold">{collector.books}</div>
                <div className="text-xs text-biblio-muted">books</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-biblio-surface/40 border border-biblio-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-biblio-heading mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'minted', book: 'The Great Gatsby', user: '0x1234...5678', time: '2 min ago' },
            { action: 'shared', book: '1984', user: '0x8765...4321', time: '5 min ago' },
            { action: 'minted', book: 'Pride and Prejudice', user: '0xabcd...efgh', time: '12 min ago' },
            { action: 'compared', book: 'collections', user: '0x9876...5432', time: '18 min ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-biblio-surface/60 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-biblio-blue/20 flex items-center justify-center">
                <span className="text-sm">
                  {activity.action === 'minted' ? '📚' : 
                   activity.action === 'shared' ? '📤' : '📊'}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-sm text-biblio-heading">
                  <span className="font-semibold">{activity.user}</span> {activity.action} 
                  {activity.action === 'minted' ? ' ' : ' '}
                  <span className="text-biblio-gold">{activity.book}</span>
                </div>
                <div className="text-xs text-biblio-muted">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embed Badge */}
      <div className="bg-biblio-surface/40 border border-biblio-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-biblio-heading mb-4">Embed Your Collection</h3>
        <div className="space-y-4">
          <p className="text-biblio-muted">Share your collection on your website or social media</p>
          <div className="bg-biblio-surface/60 border border-biblio-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono text-biblio-muted">Embed Code:</span>
              <button 
                onClick={() => navigator.clipboard.writeText('<iframe src="https://booknft.com/embed/collection/0x1234...5678" width="400" height="600"></iframe>')}
                className="text-xs text-biblio-blue hover:text-biblio-gold transition-colors"
              >
                Copy
              </button>
            </div>
            <code className="text-xs text-biblio-muted break-all">
              &lt;iframe src="https://booknft.com/embed/collection/0x1234...5678" width="400" height="600"&gt;&lt;/iframe&gt;
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
