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
            padding: '12px 16px', fontSize: 14, fontWeight: on ? 700 : 400,
            color: on ? T.gray900 : T.gray400,
            borderBottom: on ? `2px solid ${T.gray900}` : '2px solid transparent',
            fontFamily: 'inherit', whiteSpace: 'nowrap',
          }}>
            {tab}
          </button>
        );
      })}
    </div>
  );
}
