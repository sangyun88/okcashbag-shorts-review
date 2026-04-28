import { T } from '../../tokens';

const TABS = ['추천', '공동구매', '오늘특가', 'e쿠폰', '숏츠리뷰'];

export default function NavBar({ active, onTab }) {
  return (
    <div style={{
      display: 'flex', overflowX: 'auto', background: T.white,
      borderBottom: `1px solid ${T.gray100}`, flexShrink: 0,
      msOverflowStyle: 'none', scrollbarWidth: 'none',
    }} className="scrollbar-hide">
      {TABS.map((tab) => {
        const on = active === tab;
        const isShorts = tab === '숏츠리뷰';
        return (
          <button key={tab} onClick={() => onTab(tab)} style={{
            flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer',
            padding: '12px 16px', fontSize: 14, fontWeight: on ? 700 : 400,
            color: on ? (isShorts ? T.ocbRed : T.gray900) : T.gray400,
            borderBottom: on ? `2px solid ${isShorts ? T.ocbRed : T.gray900}` : '2px solid transparent',
            fontFamily: 'inherit', whiteSpace: 'nowrap',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            {isShorts && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <polygon points="5,3 19,12 5,21" fill={on ? T.ocbRed : T.gray400}/>
              </svg>
            )}
            {tab}
            {isShorts && <span style={{ background: T.ocbRed, color: T.white, fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 9999 }}>NEW</span>}
          </button>
        );
      })}
    </div>
  );
}
