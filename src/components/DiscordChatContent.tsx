'use client'

interface DiscordChatContentProps {
  clubName: string
}

export function DiscordChatContent({ clubName }: DiscordChatContentProps) {
  const currentTime = "19:54"

  return (
    <div className="flex flex-col h-full">
      {/* Welcome Message Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Large Welcome Card */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🚀</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Welcome to {clubName}</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            This is the beginning of the #general channel. Here's where community members collaborate,
            share ideas, and build together. Start the conversation!
          </p>
        </div>

        {/* Sample Messages */}
        <div className="w-full max-w-4xl mt-8 space-y-4">
          {/* User message about business case */}
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-orange-400">Kingfish</span>
                <span className="text-xs text-[#72767d]">{currentTime}</span>
              </div>
              <div className="text-[#dcddde] text-sm leading-relaxed">
                In case we want to activate recommendation business for brokers as well. So whoever knows, that somebody
                wants to sell a property can enter the data of himself as well as for the real estate which can get sold) and once the deal has
                been closed, he will earn points in our own IPO point system, bit like milestones.
              </div>
              <div className="mt-2 text-xs text-[#72767d]">
                Replied to <span className="text-[#00b0f4]">@illhouse</span>
              </div>
            </div>
          </div>

          {/* Bot welcome message */}
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-[#5865f2] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">🤖</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-[#5865f2]">{clubName} bot</span>
                <span className="text-xs bg-[#5865f2] px-1 py-0.5 rounded text-white font-medium">BOT</span>
                <span className="text-xs text-[#72767d]">21:13</span>
              </div>
              <div className="text-[#dcddde] text-sm leading-relaxed">
                <p className="mb-2">Heya! We're excited to have you in the Midjourney Beta.</p>
                <p className="mb-2">
                  To expand the community sustainably, we're giving everyone a limited trial (around 25 queries), and then several options to
                  buy a full membership. Full memberships include: unlimited generations (or limited w/ a cheap tier), and generous commercial
                  terms.
                </p>
                <p className="mb-2">
                  <strong>DIRECTIONS (PLEASE READ)</strong> To create images: - Go to one of the "newbie" bot channels. See attached screenshot: https://
                  s.mj.run/newbie - Type /imagine and then whatever you want - The bot will send you 4 images in ~60 seconds - Click numbered
                  buttons underneath to get upscales (U) or variations (V)
                </p>
                <p className="mb-2">
                  For a visual guide on how to get started, visit <a href="#" className="text-[#00b0f4] hover:underline">https://midjourney.gitbook.io/docs/#create-your-first-image</a> To see trending
                  images from the community visit: <a href="#" className="text-[#00b0f4] hover:underline">https://s.mj.run/feed</a>
                </p>
                <p className="mb-2">
                  Once your trial has ended, you can subscribe by typing /subscribe or going to https://www.midjourney.com/account
                </p>
                <p>
                  To see all your creations: https://midjourney.com/ Need help? Join our support server at discord.gg/midjourney and ask in trial-
                  support. use /info to see account details, /settings to see your current settings and /help to see an overview
                </p>
              </div>
            </div>
          </div>

          {/* User Join Message */}
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-[#747f8d] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">👤</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-white">You</span>
                <span className="text-xs text-[#72767d]">21:13</span>
              </div>
              <div className="text-[#dcddde] text-sm">joined party</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}