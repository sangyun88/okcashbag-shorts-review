import { T } from '../../tokens';
import { useShortsStore } from '../../store/shortsStore';
import { REVIEWS } from '../../data/mockData';

function fmtNum(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + '만';
  if (n >= 1000)  return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

export default function HighlightSection() {
  const { setScreen, setCurrentIndex } = useShortsStore();

  return (
    <div style={{ background: T.white, marginBottom: 8 }}>
      {/* 섹션 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 14px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            background: T.ocbRed, borderRadius: 6, padding: '2px 8px',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill={T.white}>
              <polygon points="5,3 19,12 5,21"/>
            </svg>
            <span style={{ color: T.white, fontSize: 11, fontWeight: 700 }}>LIVE</span>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: T.gray900 }}>인기 숏츠리뷰</span>
        </div>
        <button onClick={() => setScreen('feed')} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          fontSize: 13, color: T.gray500, display: 'flex', alignItems: 'center', gap: 2,
        }}>
          전체보기
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke={T.gray400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* 썸네일 카드 가로 스와이프 */}
      <div style={{
        display: 'flex', gap: 10, padding: '0 14px 14px',
        overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none',
        scrollSnapType: 'x mandatory', scrollPaddingLeft: 14,
      }} className="scrollbar-hide">
        {REVIEWS.map((r, i) => (
          <button key={r.id} onClick={() => { setCurrentIndex(i); setScreen('feed'); }} style={{
            flexShrink: 0, width: 130, borderRadius: 12, overflow: 'hidden',
            background: r.gradient, border: 'none', cursor: 'pointer', padding: 0,
            position: 'relative', aspectRatio: '9/16',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            scrollSnapAlign: 'start',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: r.gradient }} />

            {/* 자막 */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '4px 10px', width: '85%', textAlign: 'center',
            }}>
              <span style={{ color: T.white, fontSize: 12, fontWeight: 500 }}>{r.caption}</span>
            </div>

            {/* 하단 오버레이 */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              padding: '24px 8px 8px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
                </svg>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>{fmtNum(r.views)}</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="rgba(255,77,109,0.9)">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>{fmtNum(r.likes)}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
