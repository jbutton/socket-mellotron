# 🎹 Socket Mellotron

A modern, real-time multiplayer Mellotron web application built with Next.js 15, Tone.js, and Socket.io.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

## 🎵 Features

- **Interactive Piano Keyboard**: Visual piano interface with 2-3 octaves
- **Authentic Mellotron Sounds**: Multiple sound banks (Strings, Choir, Flutes, Brass)
- **Real-time Multiplayer**: See and hear other users playing simultaneously
- **Audio Effects**: Reverb, Delay, ADSR envelope controls
- **Recording & Playback**: Record your sessions and play them back
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Low Latency**: Optimized for real-time performance

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router and Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Accessible component library
- **Tone.js** - Web Audio API wrapper for sound synthesis
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management

### Backend/Real-time
- **Next.js API Routes** - Backend API endpoints
- **Socket.io** - WebSocket server for multiplayer
- **Upstash Redis** *(optional)* - Presence/session management

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Modern web browser with Web Audio API support

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/socket-mellotron.git
   cd socket-mellotron
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Add Mellotron samples** *(required for audio)*
   - Place audio samples in `public/samples/[sound-bank]/`
   - See `public/samples/README.md` for sample requirements
   - Example: `public/samples/strings/C4.wav`

4. **Set up environment variables** *(optional)*
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎹 Usage

### Keyboard Controls

| Key | Note | Key | Note |
|-----|------|-----|------|
| A   | C    | S   | D    |
| D   | E    | F   | F    |
| G   | G    | H   | A    |
| J   | B    | K   | C    |

- **White keys**: A, S, D, F, G, H, J, K, L
- **Black keys**: W, E, T, Y, U (above corresponding white keys)

### Features

1. **Sound Banks**: Click on sound bank buttons to switch between different Mellotron tapes
2. **Volume Control**: Adjust master volume or mute audio
3. **Effects**: Fine-tune reverb, delay, and envelope settings
4. **Multiplayer**: Each connected user gets a unique color for their key presses
5. **Recording**: Start/stop recording to capture your performance

## 📁 Project Structure

```
socket-mellotron/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   ├── globals.css         # Global styles
│   │   └── api/
│   │       └── socket/         # Socket.io API route
│   ├── components/             # React components
│   │   ├── keyboard/           # Piano keyboard components
│   │   ├── sound-banks/        # Sound bank switcher
│   │   ├── controls/           # Volume and effects controls
│   │   ├── multiplayer/        # User presence and remote keys
│   │   └── ui/                 # Shadcn/ui components
│   ├── lib/                    # Utilities and logic
│   │   ├── audio/              # Tone.js audio engine
│   │   ├── socket/             # Socket.io client/server
│   │   ├── store/              # Zustand state management
│   │   └── utils.ts            # Helper functions
│   └── types/                  # TypeScript type definitions
│       ├── audio.ts
│       ├── socket.ts
│       └── user.ts
├── public/
│   └── samples/                # Audio sample files
│       ├── strings/
│       ├── choir/
│       ├── flutes/
│       └── brass/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🔧 Development

### Adding New Sound Banks

1. Create a new directory in `public/samples/[bank-name]/`
2. Add audio samples following the naming convention (C3.wav, D3.wav, etc.)
3. Update `src/lib/audio/soundBanks.ts` to include the new bank
4. Add bank icon/name to the UI in `src/components/sound-banks/SoundBankSwitcher.tsx`

### Customizing Keyboard Layout

Edit `src/components/keyboard/PianoKeyboard.tsx` to:
- Change number of octaves
- Modify key mappings
- Adjust visual styling

### Adding Effects

1. Create effect in `src/lib/audio/toneEngine.ts` using Tone.js
2. Add controls in `src/components/controls/EffectsPanel.tsx`
3. Wire up state management in `src/lib/store/useStore.ts`

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy

**Note**: Socket.io may require additional configuration for Vercel. Consider using Vercel's Edge Functions or a separate WebSocket server.

### Docker

```bash
docker build -t socket-mellotron .
docker run -p 3000:3000 socket-mellotron
```

## 🎯 Implementation Roadmap

### Phase 1: Setup & Basic Audio ✅
- [x] Next.js 15 project initialization
- [x] TypeScript and linting setup
- [x] Tailwind CSS + Shadcn/ui
- [ ] Basic keyboard UI component
- [ ] Tone.js audio playback integration
- [ ] Keyboard input mapping

### Phase 2: Sound Banks
- [ ] Source/record Mellotron samples
- [ ] Sound bank switcher UI
- [ ] Multiple samples per note with Tone.js Sampler
- [ ] ADSR envelope controls

### Phase 3: Real-time Features
- [ ] Socket.io server in Next.js API route
- [ ] Note broadcast on key press
- [ ] Visual feedback for remote key presses
- [ ] User presence with color assignment

### Phase 4: Advanced & Polish
- [ ] Recording/playback functionality
- [ ] Mobile/touch optimization
- [ ] Performance optimization
- [ ] Deploy to Vercel

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the classic Mellotron Mark II
- Built with [Tone.js](https://tonejs.github.io/)
- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Real-time communication via [Socket.io](https://socket.io/)

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/socket-mellotron](https://github.com/yourusername/socket-mellotron)

---

Made with ❤️ and TypeScript
