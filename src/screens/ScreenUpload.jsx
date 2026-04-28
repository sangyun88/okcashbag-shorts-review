import { useState } from 'react';
import { T } from '../tokens';
import { useShortsStore } from '../store/shortsStore';
import { MY_ORDERS } from '../data/mockData';

export default function ScreenUpload() {
  const { uploadStep, setUploadStep, uploadCaption, setUploadCaption, submitReview, setScreen } = useShortsStore();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterText, setFilterText] = useState(false);

  const BANNED = ['욕설', '비속어'];
  function checkBanned(text) {
    return BANNED.some((b) => text.includes(b));
  }

  function handleCaption(val) {
    if (val.length > 20) return;
    setFilterText(checkBanned(val));
    setUploadCaption(val);
  }

  const STEPS = ['주문 선택', '영상 편집', '멘트 작성', '업로드 완료'];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.white, overflowY: 'auto' }}>
      {/* 스텝 인디케이터 */}
      <div style={{ padding: '16px 14px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              {i < STEPS.length - 1 && (
                <div style={{
                  position: 'absolute', top: 12, left: '50%', width: '100%', height: 2,
                  background: i < uploadStep ? T.ocbRed : T.gray100, zIndex: 0,
                }} />
              )}
              <div style={{
                width: 24, height: 24, borderRadius: '50%', zIndex: 1,
                background: i < uploadStep ? T.ocbRed : i === uploadStep ? T.ocbRed : T.gray200,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {i < uploadStep
                  ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L20 7" stroke={T.white} strokeWidth="2.5" strokeLinecap="round"/></svg>
                  : <span style={{ fontSize: 11, fontWeight: 700, color: i === uploadStep ? T.white : T.gray400 }}>{i + 1}</span>
                }
              </div>
              <span style={{ fontSize: 10, color: i === uploadStep ? T.ocbRed : T.gray400, marginTop: 4, fontWeight: i === uploadStep ? 700 : 400, textAlign: 'center' }}>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 0: 주문 선택 */}
      {uploadStep === 0 && (
        <div style={{ flex: 1, padding: '20px 14px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.gray900, marginBottom: 6 }}>리뷰를 작성할 상품을 선택하세요</h2>
          <p style={{ fontSize: 13, color: T.gray500, marginBottom: 20 }}>구매한 상품에 한해 숏츠리뷰를 작성할 수 있어요</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MY_ORDERS.map((o) => (
              <button key={o.id} onClick={() => !o.hasReview && setSelectedOrder(o.id)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px',
                background: selectedOrder === o.id ? '#fff0f3' : T.gray50,
                border: selectedOrder === o.id ? `1.5px solid ${T.ocbRed}` : `1px solid ${T.gray100}`,
                borderRadius: 12, cursor: o.hasReview ? 'default' : 'pointer',
                opacity: o.hasReview ? 0.5 : 1, fontFamily: 'inherit',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 10, flexShrink: 0,
                  background: 'linear-gradient(135deg,#1a1a2e,#0f3460)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <p style={{ fontSize: 11, color: T.gray400, margin: 0 }}>{o.brand} · {o.date}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: T.gray900, margin: '2px 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.product}</p>
                  {o.hasReview
                    ? <span style={{ fontSize: 11, color: T.gray400, background: T.gray100, borderRadius: 4, padding: '2px 6px' }}>리뷰 작성 완료</span>
                    : <span style={{ fontSize: 11, color: T.ocbRed, background: '#fff0f3', borderRadius: 4, padding: '2px 6px', fontWeight: 600 }}>+50P 지급 가능</span>
                  }
                </div>
                {selectedOrder === o.id && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill={T.ocbRed}/>
                    <path d="M7 12L10 15L17 8" stroke={T.white} strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
          <button onClick={() => selectedOrder && setUploadStep(1)} style={{
            width: '100%', padding: '14px', borderRadius: 12, border: 'none',
            background: selectedOrder ? T.ocbRed : T.gray200,
            color: selectedOrder ? T.white : T.gray400,
            fontSize: 15, fontWeight: 700, cursor: selectedOrder ? 'pointer' : 'default',
            fontFamily: 'inherit', marginTop: 24,
          }}>다음 단계</button>
        </div>
      )}

      {/* STEP 1: 영상 편집 */}
      {uploadStep === 1 && (
        <div style={{ flex: 1, padding: '20px 14px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.gray900, marginBottom: 6 }}>영상을 선택하고 편집하세요</h2>
          <p style={{ fontSize: 13, color: T.gray500, marginBottom: 20 }}>최대 5초, 20MB 이하의 영상만 업로드 가능해요</p>

          {/* 업로드 영역 */}
          <div style={{
            height: 260, borderRadius: 16, border: `2px dashed ${T.gray200}`,
            background: T.gray50, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20,
            cursor: 'pointer',
          }} onClick={() => setUploadStep(2)}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: T.gray100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M23 7L16 12L23 17V7Z" stroke={T.gray400} strokeWidth="2" strokeLinejoin="round"/>
                <rect x="1" y="5" width="15" height="14" rx="2" stroke={T.gray400} strokeWidth="2"/>
              </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: T.gray700, margin: 0 }}>갤러리에서 선택</p>
              <p style={{ fontSize: 12, color: T.gray400, marginTop: 4 }}>또는 카메라로 바로 촬영</p>
            </div>
          </div>

          {/* 편집 옵션 */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {[
              { icon: '✂️', label: '구간 편집' },
              { icon: '🔄', label: '회전' },
              { icon: '🎨', label: '필터' },
            ].map(({ icon, label }) => (
              <button key={label} style={{
                flex: 1, padding: '12px 0', borderRadius: 10,
                background: T.gray50, border: `1px solid ${T.gray100}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ fontSize: 12, color: T.gray600 }}>{label}</span>
              </button>
            ))}
          </div>

          <p style={{ fontSize: 12, color: T.gray400, textAlign: 'center', marginBottom: 16 }}>
            ※ 영상은 AI 필터링 후 피드에 노출됩니다 (보통 1~2분 소요)
          </p>

          <button onClick={() => setUploadStep(2)} style={{
            width: '100%', padding: '14px', borderRadius: 12, border: 'none',
            background: T.ocbRed, color: T.white, fontSize: 15, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>영상 선택 완료</button>
        </div>
      )}

      {/* STEP 2: 멘트 작성 */}
      {uploadStep === 2 && (
        <div style={{ flex: 1, padding: '20px 14px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.gray900, marginBottom: 6 }}>영상에 멘트를 추가하세요</h2>
          <p style={{ fontSize: 13, color: T.gray500, marginBottom: 20 }}>최대 20자, 영상 중앙에 표시됩니다</p>

          {/* 프리뷰 */}
          <div style={{
            height: 280, borderRadius: 16, overflow: 'hidden', marginBottom: 20,
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
            position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)',
              padding: '8px 20px', borderRadius: 8,
              minWidth: 120, textAlign: 'center',
            }}>
              <span style={{
                color: T.white, fontSize: 18, fontWeight: 700,
                letterSpacing: -0.3,
              }}>
                {uploadCaption || '멘트를 입력하세요'}
              </span>
            </div>
            {/* 프리뷰 라벨 */}
            <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.5)', borderRadius: 4, padding: '3px 8px' }}>
              <span style={{ fontSize: 11, color: T.white, fontWeight: 600 }}>미리보기</span>
            </div>
          </div>

          {/* 입력 */}
          <div style={{ marginBottom: 8 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: T.gray50, borderRadius: 10, padding: '12px 14px',
              border: filterText ? `1.5px solid ${T.ocbRed}` : `1px solid ${T.gray200}`,
            }}>
              <input
                value={uploadCaption}
                onChange={(e) => handleCaption(e.target.value)}
                placeholder="예: 너무 맛있어요!"
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  fontSize: 16, color: T.gray900, fontFamily: 'inherit',
                }}
              />
              <span style={{ fontSize: 12, color: uploadCaption.length >= 20 ? T.ocbRed : T.gray400, fontWeight: 600, flexShrink: 0 }}>
                {uploadCaption.length}/20
              </span>
            </div>
            {filterText && (
              <p style={{ fontSize: 12, color: T.ocbRed, marginTop: 5, marginLeft: 4 }}>⚠ 사용할 수 없는 표현이 포함되어 있어요</p>
            )}
          </div>

          <p style={{ fontSize: 12, color: T.gray400, marginBottom: 20 }}>
            ※ 금칙어가 포함된 경우 자동 차단됩니다
          </p>

          <button
            onClick={() => { if (!filterText && uploadCaption.trim()) submitReview(uploadCaption); }}
            style={{
              width: '100%', padding: '14px', borderRadius: 12, border: 'none',
              background: (!filterText && uploadCaption.trim()) ? 'linear-gradient(to right, #AA23E9, #FF427D)' : T.gray200,
              color: (!filterText && uploadCaption.trim()) ? T.white : T.gray400,
              fontSize: 15, fontWeight: 700,
              cursor: (!filterText && uploadCaption.trim()) ? 'pointer' : 'default',
              fontFamily: 'inherit',
            }}
          >
            업로드하고 50P 받기 🎉
          </button>
        </div>
      )}
    </div>
  );
}
