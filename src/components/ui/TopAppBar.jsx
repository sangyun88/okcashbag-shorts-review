import { T } from '../../tokens';
import { useShortsStore } from '../../store/shortsStore';

export default function TopAppBar({ title, dark = false, onBack, backOnly = false }) {
  const myPoints = useShortsStore((s) => s.myPoints);
  const c  = dark ? T.white : T.black;
  const bg = dark ? 'transparent' : T.white;

  if (backOnly) {
    return (
      <div style={{
        height: 48, background: T.white,
        display: 'flex', alignItems: 'center', padding: '0 8px', flexShrink: 0,
        borderBottom: `0.5px solid ${T.gray100}`, position: 'relative', zIndex: 10,
      }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke={T.black} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div style={{
      height: 48, background: bg,
      display: 'flex', alignItems: 'center', padding: '0 8px', flexShrink: 0,
      borderBottom: dark ? 'none' : `0.5px solid ${T.gray100}`,
      position: 'relative', zIndex: 10,
    }}>
      {onBack ? (
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: c }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      ) : <div style={{ width: 40 }} />}

      <div style={{ flex: 1, textAlign: 'center' }}>
        {title
          ? <span style={{ fontSize: 16, fontWeight: 700, color: c }}>{title}</span>
          : <span style={{ fontSize: 18, fontWeight: 900, color: c, letterSpacing: -0.5 }}>OK캐쉬백</span>
        }
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '0 8px' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill={T.gold}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
        <span style={{ fontSize: 12, fontWeight: 700, color: c }}>{myPoints.toLocaleString()}P</span>
      </div>
    </div>
  );
}
