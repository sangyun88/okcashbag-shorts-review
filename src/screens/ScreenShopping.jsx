import { useState } from 'react';
import { T } from '../tokens';
import NavBar from '../components/ui/NavBar';
import HighlightSection from '../components/shorts/HighlightSection';
import { useShortsStore } from '../store/shortsStore';

const BANNERS = [
  { bg: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b69 50%, #11998e 100%)', title: '쇼핑 특가\n오늘만 이 가격', sub: '최대 30% 할인', cta: '지금 쇼핑하기' },
  { bg: 'linear-gradient(135deg, #E61E4D 0%, #D70466 100%)', title: '숏츠리뷰 이벤트\n지금 작성하면 +50P', sub: '구매 후 5초 영상으로 포인트 받기', cta: '리뷰 작성하기', action: 'upload' },
  { bg: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)', title: '공동구매\n함께 사면 더 싸게', sub: '기프티콘 최대 40% 할인', cta: '공동구매 참여하기' },
];

const PRODUCTS = [
  { brand: '스타벅스', name: '카페 아메리카노 T', price: '4,700원', disc: '4%', grad: 'linear-gradient(135deg,#1a1a2e,#0f3460)' },
  { brand: '올리브영', name: '닥터지 선크림 SPF50+', price: '15,900원', disc: '24%', grad: 'linear-gradient(135deg,#f8cdda,#1d2b64)' },
  { brand: '메가커피', name: '아이스 아메리카노 L', price: '2,200원', disc: '10%', grad: 'linear-gradient(135deg,#2c3e50,#3498db)' },
  { brand: '배스킨라빈스', name: '파인트 아이스크림', price: '9,500원', disc: '15%', grad: 'linear-gradient(135deg,#a8edea,#fed6e3)' },
];

export default function ScreenShopping() {
  const [navTab, setNavTab] = useState('추천');
  const { setScreen } = useShortsStore();
  const [bannerIdx, setBannerIdx] = useState(0);

  function handleNavTab(tab) {
    if (tab === '숏츠리뷰') { setScreen('feed'); return; }
    setNavTab(tab);
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.gray50 }} className="scrollbar-hide">
      <NavBar active={navTab} onTab={handleNavTab} />

      {/* 배너 */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          height: 196,
          background: BANNERS[bannerIdx].bg,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 24px', textAlign: 'center',
          transition: 'background 0.3s',
        }}>
          <p style={{ color: T.white, fontSize: 22, fontWeight: 800, lineHeight: 1.3, whiteSpace: 'pre-line', marginBottom: 6, letterSpacing: -0.5 }}>
            {BANNERS[bannerIdx].title}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 500, marginBottom: 16 }}>{BANNERS[bannerIdx].sub}</p>
          <button
            onClick={() => BANNERS[bannerIdx].action && setScreen(BANNERS[bannerIdx].action)}
            style={{
              background: T.white, color: T.gray800, border: 'none',
              borderRadius: 9999, padding: '9px 22px', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', letterSpacing: -0.1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}>{BANNERS[bannerIdx].cta}</button>
        </div>
        {/* 닷 인디케이터 */}
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
          {BANNERS.map((_, i) => (
            <button key={i} onClick={() => setBannerIdx(i)} style={{
              width: i === bannerIdx ? 18 : 6, height: 6, borderRadius: 3,
              background: i === bannerIdx ? T.white : 'rgba(255,255,255,0.4)',
              border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.2s',
            }} />
          ))}
        </div>
      </div>

      {/* 숏츠리뷰 하이라이트 */}
      <div style={{ marginTop: 8 }}>
        <HighlightSection />
      </div>

      {/* 상품 그리드 */}
      <div style={{ background: T.white, padding: '16px 14px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: T.gray800, letterSpacing: -0.3 }}>추천 상품</span>
          <span style={{ fontSize: 13, color: T.gray400, fontWeight: 500, textDecoration: 'underline', cursor: 'pointer' }}>전체보기</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {PRODUCTS.map((p, i) => (
            <button key={i} onClick={() => setScreen('product')} style={{
              background: T.white, border: `1px solid ${T.gray100}`, borderRadius: 14,
              cursor: 'pointer', overflow: 'hidden', padding: 0, textAlign: 'left',
              boxShadow: T.shadowCard,
            }}>
              <div style={{ height: 100, background: p.grad, position: 'relative' }}>
                <div style={{
                  position: 'absolute', top: 8, left: 8,
                  background: T.ocbRed, borderRadius: 9999, padding: '3px 8px',
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.white, letterSpacing: 0.2 }}>{p.disc} OFF</span>
                </div>
              </div>
              <div style={{ padding: '10px 10px 12px' }}>
                <p style={{ fontSize: 11, color: T.gray400, fontWeight: 500, margin: 0 }}>{p.brand}</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: T.gray800, margin: '3px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', letterSpacing: -0.2 }}>{p.name}</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: T.ocbRed, margin: 0, letterSpacing: -0.3 }}>{p.price}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 6 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <polygon points="5,3 19,12 5,21" fill={T.gray300}/>
                  </svg>
                  <span style={{ fontSize: 11, color: T.gray400, fontWeight: 500, textDecoration: 'underline' }}>숏츠리뷰 보기</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
