import { T } from '../../tokens';
import { useShortsStore } from '../../store/shortsStore';

export default function TopAppBar({ title, dark = false, onBack, backOnly = false }) {
  const myPoints = useShortsStore((s) => s.myPoints);
  const c  = dark ? T.white : T.gray800;
  const bg = dark ? 'transparent' : T.white;

  if (backOnly) {
    return (
      <div style={{
        height: 48, background: T.white,
        display: 'flex', alignItems: 'center', padding: '0 8px', flexShrink: 0,
        borderBottom: `1px solid ${T.gray100}`, position: 'relative', zIndex: 10,
      }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke={T.gray800} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div style={{
      height: 48, background: bg,
      display: 'flex', alignItems: 'center', padding: '0 8px', flexShrink: 0,
      borderBottom: dark ? 'none' : `1px solid ${T.gray100}`,
      position: 'relative', zIndex: 10,
    }}>
      {onBack ? (
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: c }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      ) : <div style={{ width: 38 }} />}

      <div style={{ flex: 1, textAlign: 'center' }}>
        {title
          ? <span style={{ fontSize: 15, fontWeight: 700, color: c, letterSpacing: -0.2 }}>{title}</span>
          : <span style={{ fontSize: 19, fontWeight: 800, color: T.ocbRed, letterSpacing: -0.5 }}>OK캐쉬백</span>
        }
      </div>

      <div style={{ width: 38 }} />
    </div>
  );
}
