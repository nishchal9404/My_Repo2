const content = {
  passcode: '2107',
  pages: {
    passcodeLock: {
      header: 'Enter a passcode 🔐',
      signature: '— with love 💕'
    },
    celebrationGreeting: {
      header: '🎉 HAPPY BIRTHDAY! 🎂',
      subtext: "Wishing you the most magical day ever!"
    },
    giftHub: {
      header: '🎁 GIFTS FOR YOU',
      subtext: 'Click any gift to open',
      giftBoxes: [
        { id: 'takeSelfie', emoji: '📸', label: 'Take A Selfie' },
        { id: 'ourSongs', emoji: '🎵', label: 'Our Songs' },
        { id: 'secretMessage', emoji: '🎀', label: 'Secret Message' },
        { id: 'complimentGarden', emoji: '🌸', label: 'Compliment Garden' }
      ]
    }
  },
  interactions: {
    candleBlow: {
      header: '🎂 Make a Wish!',
      subtext: 'Click the candle to blow it out!'
    },
    photoMemory: {
      header: '📷 Our Memories',
      subtext: 'A little scrapbook just for you 💕',
      photos: [
        'https://picsum.photos/seed/girl1/400/400',
        'https://picsum.photos/seed/girl2/300/300',
        'https://picsum.photos/seed/girl3/300/300',
        'https://picsum.photos/seed/girl4/300/300',
        'https://picsum.photos/seed/girl5/300/300'
      ],
      captions: ['Us 🌸', 'Always smiling ✨', 'My fav 💕', 'Forever us 💖', 'Best day 🎀']
    },
    ourSongs: {
      header: '🎵 Our Songs',
      subtext: 'Every song that reminds me of you 💕',
      songs: [
        {
          title: 'Since Tum',
          artist: 'JANI',
          reason: 'Since Tum😉',
          url: 'https://open.spotify.com/track/1L9yQJ9xrW6M3Z8kP2vR5t'
        },
        {
          title: 'Humsafar',
          artist: 'Taimour Baig',
          reason: 'Tu mein aur ek cup chai☕',
          url: 'https://open.spotify.com/track/7KQZvh0c5YWXgM5wKRHfqA'
        },
        {
          title: 'Ishq Wala Love',
          artist: 'Various Artists',
          reason: '🥰',
          url: 'https://open.spotify.com/track/3N1P9a6qB5CdE8FgH1jK2l'
        },
        {
          title: 'Kaise Bataaoon',
          artist: 'KK',
          reason: 'Words fall short, but this song says it all 🌹',
          url: 'https://open.spotify.com/track/4K2Q5zN8vB1CdE9FgH2jK3l'
        },
        {
          title: 'The Fate of Ophelia',
          artist: 'Taylor Swift',
          reason: 'obviously a taylor swift song🙄',
          url: 'https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v'
        }
      ]
    },
    secretMessage: {
      header: '🎀 A Secret Message',
      subtext: 'Scratch to reveal your surprise 🤫',
      message: "Hey you 🎀 I don't say this enough, but having you in my life is one of the best things that's ever happened to me. You make everything more fun, more warm, and more real. Thank you for being my person. Happy Birthday, Devu 💞🤗"
    },
    complimentGarden: {
      header: '🌸 Your Compliment Garden',
      subtext: 'Tap anywhere to bloom a flower 🌷',
      compliments: [
        "I'm lucky to have someone as amazing as you 💞",
        'You make every day feel a little brighter ❤️✨',
        "You're the most beautiful part of my day 🌅",
        "You have the kindest heart I've ever known 💝",
        'You make happiness look effortless 😊💫',
        'Your laugh is my favorite sound 🎶😄',
        'You inspire me to be a better person 🌟',
        "You're beautiful inside and out 🌸💖",
        'Your smile is my favorite view 😍',
        'Every moment with you feels special ✨💕',
        'You make ordinary days unforgettable 🌈',
        'You have the most beautiful soul 🧘‍♀️💜',
        'Your eyes tell the sweetest stories 👀🌹',
        "No matter how many people I meet, you'll always be my favorite 💟",
        'Being with you feels like home 🏠❤️',
        "You're effortlessly adorable 🎀",
        'Your presence makes everything better 🌻✨',
        'You light up every room you walk into 💡💛',
        "You're the best thing that's happened to me 🍀💖",
        'I admire your strength and kindness 🦋💚'
      ]
    },
    loveLetter: {
      header: '💌 A Letter For You',
      note: `My dearest,

On your special day, I want you to know how much you mean to me. Every moment with you is a gift I treasure deeply.

You light up every room you walk into, and my world is infinitely brighter because you're in it.

Happy Birthday, my love. Here's to many more adventures together. 🌹

Forever yours,
With all my love 💕`
    }
  }
};

export default content;
