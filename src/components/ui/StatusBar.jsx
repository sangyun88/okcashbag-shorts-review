import { T } from '../../tokens';

export default function StatusBar({ dark = true }) {
  const c = dark ? T.white : T.black;
  const bg = dark ? 'transparent' : T.white;
  return (
    <div style={{
      height: 24, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px', flexShrink: 0, position: 'relative', zIndex: 10,
    }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: c }}>9:41</span>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={c}>
          <rect x="0" y="4" width="3" height="8" rx="1" opacity="0.4"/>
          <rect x="4" y="2.5" width="3" height="9.5" rx="1" opacity="0.6"/>
          <rect x="8" y="1" width="3" height="11" rx="1" opacity="0.8"/>
          <rect x="12" y="0" width="3" height="12" rx="1"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x=".5" y=".5" width="22" height="11" rx="3.5" stroke={c} strokeOpacity=".35"/>
          <rect x="1.5" y="1.5" width="17" height="9" rx="2.5" fill={c}/>
          <path d="M23.5 4.5V7.5C24.3 7.2 24.3 4.8 23.5 4.5Z" fill={c} fillOpacity=".4"/>
        </svg>
      </div>
    </div>
  );
}
