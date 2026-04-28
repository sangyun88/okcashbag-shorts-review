import { T } from '../../tokens';
import { useShortsStore } from '../../store/shortsStore';
import { SORT_OPTIONS } from '../../data/mockData';

export default function SortBar() {
  const { sortKey, setSortKey } = useShortsStore();
  return (
    <div style={{
      display: 'flex', gap: 6, padding: '8px 14px', background: T.white,
      borderBottom: `1px solid ${T.gray100}`, overflowX: 'auto',
      msOverflowStyle: 'none', scrollbarWidth: 'none',
    }} className="scrollbar-hide">
      {SORT_OPTIONS.map(({ key, label }) => {
        const on = sortKey === key;
        return (
          <button key={key} onClick={() => setSortKey(key)} style={{
            flexShrink: 0, padding: '5px 14px', borderRadius: 9999,
            background: on ? T.ocbRed : T.gray50,
            border: on ? 'none' : `1px solid ${T.gray200}`,
            color: on ? T.white : T.gray700,
            fontSize: 12, fontWeight: on ? 700 : 400,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>{label}</button>
        );
      })}
    </div>
  );
}
