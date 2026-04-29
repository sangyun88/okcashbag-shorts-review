import { T } from '../../tokens';

const TABS = ['추천', '공동구매', '오늘특가', 'e쿠폰', '영화예매'];

export default function NavBar({ active, onTab }) {
  return (
    <div style={{
      display: 'flex', overflowX: 'auto', background: T.white,
      borderBottom: `1px solid ${T.gray100}`, flexShrink: 0,
      msOverflowStyle: 'none', scrollbarWidth: 'none',
    }} className="scrollbar-hide">
      {TABS.map((tab) => {
        const on = active === tab;
        return (
          <button key={tab} onClick={() => onTab(tab)} style={{
            flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer',
            padding: '13px 16px', fontSize: 13, fontWeight: on ? 700 : 500,
            color: on ? T.gray800 : T.gray400,
            borderBottom: on ? `2px solid ${T.gray800}` : '2px solid transparent',
            fontFamily: 'inherit', whiteSpace: 'nowrap', letterSpacing: -0.1,
          }}>
            {tab}
          </button>
        );
      })}
    </div>
  );
}
