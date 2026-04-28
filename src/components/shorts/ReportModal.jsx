import { T } from '../../tokens';
import { useShortsStore } from '../../store/shortsStore';
import { REPORT_REASONS } from '../../data/mockData';
import { useState } from 'react';

export default function ReportModal() {
  const { showReport, closeReport } = useShortsStore();
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);

  if (!showReport) return null;

  function handleSubmit() {
    if (!selected) return;
    setDone(true);
    setTimeout(() => { setDone(false); setSelected(null); closeReport(); }, 1500);
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} onClick={closeReport} />
      <div style={{
        position: 'relative', background: T.white, borderRadius: '20px 20px 0 0',
        padding: '20px 20px 32px', zIndex: 1,
      }}>
        {done ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
            <p style={{ fontSize: 15, fontWeight: 700, color: T.gray900 }}>신고가 접수되었습니다</p>
            <p style={{ fontSize: 13, color: T.gray500, marginTop: 4 }}>검수팀이 확인 후 조치하겠습니다</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: T.gray900 }}>신고 사유 선택</span>
              <button onClick={closeReport} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke={T.gray500} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {REPORT_REASONS.map((r) => (
                <button key={r} onClick={() => setSelected(r)} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: selected === r ? '#fff0f3' : T.gray50,
                  border: selected === r ? `1.5px solid ${T.ocbRed}` : `1px solid ${T.gray100}`,
                  borderRadius: 10, padding: '12px 14px', cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%',
                    border: selected === r ? `5px solid ${T.ocbRed}` : `2px solid ${T.gray300}`,
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 14, color: T.gray800 }}>{r}</span>
                </button>
              ))}
            </div>
            <button onClick={handleSubmit} style={{
              width: '100%', padding: '14px', borderRadius: 12, border: 'none',
              background: selected ? T.ocbRed : T.gray200,
              color: selected ? T.white : T.gray400,
              fontSize: 15, fontWeight: 700, cursor: selected ? 'pointer' : 'default', fontFamily: 'inherit',
            }}>신고하기</button>
          </>
        )}
      </div>
    </div>
  );
}
