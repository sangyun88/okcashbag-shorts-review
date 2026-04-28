const SCENES = [
  { // 1 스타벅스 아메리카노
    bg: 'radial-gradient(ellipse at 40% 55%, #5c2800 0%, #2a1000 55%, #0d0400 100%)',
    blobs: [
      { color: '#c87830', size: 240, top: '8%',  left: '-12%', dur: '7s', delay: '0s',   anim: 'blobFloat' },
      { color: '#7B3F00', size: 180, top: '48%', right: '-8%', dur: '9s', delay: '1.8s', anim: 'blobFloat2' },
      { color: '#ff9a00', size: 100, top: '72%', left: '20%',  dur: '6s', delay: '0.8s', anim: 'blobFloat' },
    ],
    emoji: '☕', emojiTop: '28%',
    particles: 'steam', particleColor: 'rgba(200,140,60,0.55)',
  },
  { // 2 올리브영 선크림
    bg: 'radial-gradient(ellipse at 60% 40%, #ffe8f0 0%, #c9a0dc 45%, #1d2b64 100%)',
    blobs: [
      { color: '#ff9bbf', size: 200, top: '5%',  left: '-8%',  dur: '8s', delay: '0s',   anim: 'blobFloat' },
      { color: '#e86fad', size: 140, top: '55%', right: '-6%', dur: '7s', delay: '2s',   anim: 'blobFloat2' },
      { color: '#fff',    size: 90,  top: '30%', left: '60%',  dur: '5s', delay: '1s',   anim: 'blobFloat' },
    ],
    emoji: '✨', emojiTop: '27%',
    particles: 'sparkle', particleColor: 'rgba(255,180,220,0.8)',
  },
  { // 3 BBQ 치킨
    bg: 'radial-gradient(ellipse at 35% 50%, #7a2800 0%, #3d1200 50%, #1a0800 100%)',
    blobs: [
      { color: '#ff6b35', size: 260, top: '3%',  left: '-15%', dur: '6s', delay: '0s',   anim: 'blobFloat' },
      { color: '#ffd04e', size: 160, top: '50%', right: '-10%',dur: '8s', delay: '1.5s', anim: 'blobFloat2' },
      { color: '#c0392b', size: 120, top: '70%', left: '10%',  dur: '7s', delay: '0.5s', anim: 'blobFloat' },
    ],
    emoji: '🍗', emojiTop: '26%',
    particles: 'steam', particleColor: 'rgba(255,130,50,0.5)',
  },
  { // 4 메가커피 아이스
    bg: 'radial-gradient(ellipse at 50% 45%, #003d6b 0%, #001f40 55%, #000a1a 100%)',
    blobs: [
      { color: '#0099cc', size: 220, top: '6%',  left: '-10%', dur: '8s', delay: '0s',   anim: 'blobFloat' },
      { color: '#00ccff', size: 150, top: '52%', right: '-8%', dur: '6s', delay: '2.2s', anim: 'blobFloat2' },
      { color: '#e0fe4c', size: 80,  top: '75%', left: '15%',  dur: '5s', delay: '1s',   anim: 'blobFloat' },
    ],
    emoji: '🧊', emojiTop: '28%',
    particles: 'sparkle', particleColor: 'rgba(0,200,255,0.6)',
  },
  { // 5 배스킨라빈스
    bg: 'radial-gradient(ellipse at 55% 45%, #ffd6e8 0%, #a8edea 50%, #1a1a2e 100%)',
    blobs: [
      { color: '#ff9ec2', size: 200, top: '5%',  left: '-10%', dur: '7s', delay: '0s',   anim: 'blobFloat' },
      { color: '#7ef0e0', size: 160, top: '48%', right: '-6%', dur: '9s', delay: '1.8s', anim: 'blobFloat2' },
      { color: '#ff69b4', size: 90,  top: '70%', left: '25%',  dur: '6s', delay: '0.8s', anim: 'blobFloat' },
    ],
    emoji: '🍦', emojiTop: '27%',
    particles: 'sparkle', particleColor: 'rgba(255,160,200,0.7)',
  },
  { // 6 도미노피자
    bg: 'radial-gradient(ellipse at 45% 50%, #7a0020 0%, #3d0010 50%, #1a0008 100%)',
    blobs: [
      { color: '#c0392b', size: 240, top: '4%',  left: '-14%', dur: '7s', delay: '0s',   anim: 'blobFloat' },
      { color: '#8e44ad', size: 170, top: '50%', right: '-8%', dur: '8s', delay: '2s',   anim: 'blobFloat2' },
      { color: '#ffd04e', size: 100, top: '68%', left: '12%',  dur: '6s', delay: '1s',   anim: 'blobFloat' },
    ],
    emoji: '🍕', emojiTop: '26%',
    particles: 'steam', particleColor: 'rgba(220,80,50,0.5)',
  },
  { // 7 GS25 도시락
    bg: 'radial-gradient(ellipse at 40% 50%, #134e5e 0%, #0a2a30 55%, #020d10 100%)',
    blobs: [
      { color: '#1abc9c', size: 210, top: '6%',  left: '-12%', dur: '8s', delay: '0s',   anim: 'blobFloat' },
      { color: '#2ecc71', size: 140, top: '50%', right: '-8%', dur: '7s', delay: '1.6s', anim: 'blobFloat2' },
      { color: '#27ae60', size: 95,  top: '72%', left: '18%',  dur: '6s', delay: '0.7s', anim: 'blobFloat' },
    ],
    emoji: '🍱', emojiTop: '28%',
    particles: 'sparkle', particleColor: 'rgba(30,200,150,0.6)',
  },
  { // 8 투썸 딸기케이크
    bg: 'radial-gradient(ellipse at 50% 48%, #7a0030 0%, #3d0018 50%, #1a0008 100%)',
    blobs: [
      { color: '#ff4d80', size: 220, top: '4%',  left: '-10%', dur: '7s', delay: '0s',   anim: 'blobFloat' },
      { color: '#ff9ec2', size: 160, top: '50%', right: '-8%', dur: '9s', delay: '2s',   anim: 'blobFloat2' },
      { color: '#ff1744', size: 90,  top: '68%', left: '20%',  dur: '6s', delay: '0.9s', anim: 'blobFloat' },
    ],
    emoji: '🍓', emojiTop: '27%',
    particles: 'sparkle', particleColor: 'rgba(255,80,120,0.65)',
  },
  { // 9 버거킹 와퍼
    bg: 'radial-gradient(ellipse at 45% 50%, #7a4000 0%, #3d1c00 55%, #1a0a00 100%)',
    blobs: [
      { color: '#f39c12', size: 240, top: '3%',  left: '-14%', dur: '7s', delay: '0s',   anim: 'blobFloat' },
      { color: '#e74c3c', size: 160, top: '50%', right: '-8%', dur: '8s', delay: '1.8s', anim: 'blobFloat2' },
      { color: '#ffd200', size: 100, top: '70%', left: '14%',  dur: '5s', delay: '0.8s', anim: 'blobFloat' },
    ],
    emoji: '🍔', emojiTop: '26%',
    particles: 'steam', particleColor: 'rgba(240,160,40,0.5)',
  },
  { // 10 뚜레쥬르 소금빵
    bg: 'radial-gradient(ellipse at 40% 50%, #5c3a1e 0%, #2c1a08 55%, #0d0800 100%)',
    blobs: [
      { color: '#d4a574', size: 220, top: '6%',  left: '-12%', dur: '8s', delay: '0s',   anim: 'blobFloat' },
      { color: '#8B4513', size: 150, top: '50%', right: '-8%', dur: '7s', delay: '2s',   anim: 'blobFloat2' },
      { color: '#c8a96e', size: 90,  top: '70%', left: '16%',  dur: '6s', delay: '0.8s', anim: 'blobFloat' },
    ],
    emoji: '🥐', emojiTop: '27%',
    particles: 'steam', particleColor: 'rgba(200,160,80,0.5)',
  },
];

const STEAM_POSITIONS = [
  { left: '30%', delay: '0s',   dur: '2.4s' },
  { left: '50%', delay: '0.8s', dur: '3s' },
  { left: '68%', delay: '1.6s', dur: '2.7s' },
];
const SPARKLE_POSITIONS = [
  { top: '18%', left: '22%', delay: '0s',   dur: '1.8s', size: 10 },
  { top: '35%', left: '75%', delay: '0.6s', dur: '2.2s', size: 8 },
  { top: '60%', left: '15%', delay: '1.2s', dur: '1.6s', size: 12 },
  { top: '25%', left: '58%', delay: '1.8s', dur: '2s',   size: 7 },
];

export default function VideoScene({ reviewId }) {
  const idx = ((reviewId - 1) % SCENES.length);
  const scene = SCENES[idx];

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
    }}>
      {/* Ken Burns 배경 */}
      <div style={{
        position: 'absolute', inset: '-5%',
        background: scene.bg,
        animation: 'kenBurns 12s ease-in-out infinite',
      }} />

      {/* 블롭 */}
      {scene.blobs.map((b, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: b.top, left: b.left, right: b.right,
          width: b.size, height: b.size,
          borderRadius: '50%',
          background: b.color,
          opacity: 0.28,
          filter: 'blur(48px)',
          animation: `${b.anim} ${b.dur} ease-in-out ${b.delay} infinite`,
        }} />
      ))}

    </div>
  );
}
