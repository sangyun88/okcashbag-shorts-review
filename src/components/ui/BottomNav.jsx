import { T } from '../../tokens';
import { useShortsStore } from '../../store/shortsStore';

const TABS = [
  { key: 'home',     label: '홈',
    icon: (on) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z" stroke={on ? T.ocbRed : T.gray400} strokeWidth="2" strokeLinejoin="round" fill={on ? T.ocbRed : 'none'}/></svg> },
  { key: 'shopping', label: '쇼핑',
    icon: (on) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke={on ? T.ocbRed : T.gray400} strokeWidth="2" strokeLinejoin="round" fill={on ? T.ocbRed + '22' : 'none'}/><path d="M3 6H21" stroke={on ? T.ocbRed : T.gray400} strokeWidth="2"/><path d="M16 10C16 12.21 14.21 14 12 14C9.79 14 8 12.21 8 10" stroke={on ? T.ocbRed : T.gray400} strokeWidth="2" strokeLinecap="round"/></svg> },
  { key: 'feed',     label: '숏츠',
    icon: (on) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke={on ? T.ocbRed : T.gray400} strokeWidth="2" fill={on ? T.ocbRed + '22' : 'none'}/><polygon points="10,8 10,16 17,12" fill={on ? T.ocbRed : T.gray400}/></svg> },
  { key: 'earn',     label: '적립',
    icon: (on) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={on ? T.ocbRed : T.gray400} strokeWidth="2" fill={on ? T.ocbRed + '22' : 'none'}/><text x="8" y="17" fontSize="10" fontWeight="700" fill={on ? T.ocbRed : T.gray400}>P</text></svg> },
  { key: 'my',       label: 'MY',
    icon: (on) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={on ? T.ocbRed : T.gray400} strokeWidth="2" fill={on ? T.ocbRed + '22' : 'none'}/><path d="M4 20C4 16.686 7.582 14 12 14C16.418 14 20 16.686 20 20" stroke={on ? T.ocbRed : T.gray400} strokeWidth="2" strokeLinecap="round"/></svg> },
];

export default function BottomNav() {
  const { activeScreen, setScreen } = useShortsStore();

  const active = activeScreen === 'feed' ? 'feed'
    : activeScreen === 'shopping' || activeScreen === 'product' ? 'shopping'
    : 'home';

  return (
    <div style={{
      height: 56, background: T.white, borderTop: `0.5px solid ${T.gray100}`,
      display: 'flex', alignItems: 'center', flexShrink: 0,
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {TABS.map(({ key, label, icon }) => {
        const on = active === key;
        return (
          <button key={key} onClick={() => setScreen(key === 'shopping' ? 'shopping' : key === 'feed' ? 'feed' : 'shopping')}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0' }}>
            {icon(on)}
            <span style={{ fontSize: 10, fontWeight: on ? 700 : 400, color: on ? T.ocbRed : T.gray400 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
