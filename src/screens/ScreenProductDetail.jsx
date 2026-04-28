import { useState } from 'react';
import { T } from '../tokens';
import { useShortsStore } from '../store/shortsStore';
import { REVIEWS } from '../data/mockData';

function fmtNum(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + '만';
  if (n >= 1000)  return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

const PRODUCT = {
  brand: '스타벅스',
  name: '카페 아메리카노 T',
  price: '4,700원',
  origPrice: '4,900원',
  disc: '4%',
  rating: 4.5,
  reviewCount: 1289,
  gradient: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
  accentColor: '#00b4d8',
};

export default function ScreenProductDetail() {
  const { setScreen } = useShortsStore();
  const [detailTab, setDetailTab] = useState('숏츠리뷰');

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: T.white }} className="scrollbar-hide">
      {/* 상품 이미지 영역 */}
      <div style={{
        height: 260, background: PRODUCT.gradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{
          width: 100, height: 100, borderRadius: 20,
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M3 6H21" stroke="rgba(255,255,255,0.8)" strokeWidth="2"/>
          </svg>
        </div>
        <div style={{
          position: 'absolute', top: 8, right: 8,
          background: T.ocbRed, borderRadius: 4, padding: '3px 8px',
        }}>
          <span style={{ color: T.white, fontSize: 12, fontWeight: 700 }}>{PRODUCT.disc} 할인</span>
        </div>
      </div>

      {/* 상품 정보 */}
      <div style={{ padding: '16px 14px', borderBottom: `1px solid ${T.gray100}` }}>
        <p style={{ fontSize: 12, color: T.gray400, margin: 0 }}>{PRODUCT.brand}</p>
        <p style={{ fontSize: 18, fontWeight: 700, color: T.gray900, margin: '4px 0 10px', lineHeight: 1.3 }}>{PRODUCT.name}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: T.ocbRed }}>{PRODUCT.price}</span>
          <span style={{ fontSize: 14, color: T.gray400, textDecoration: 'line-through' }}>{PRODUCT.origPrice}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          <div style={{ display: 'flex', gap: 1 }}>
            {[1,2,3,4,5].map((s) => (
              <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= Math.floor(PRODUCT.rating) ? T.gold : T.gray200}>
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
            ))}
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.gray700 }}>{PRODUCT.rating}</span>
          <span style={{ fontSize: 12, color: T.gray400 }}>({PRODUCT.reviewCount.toLocaleString()}개 리뷰)</span>
        </div>
      </div>

      {/* 탭 바 */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${T.gray100}`, background: T.white, position: 'sticky', top: 0, zIndex: 10 }}>
        {['상품정보', '숏츠리뷰', '텍스트리뷰'].map((tab) => {
          const on = detailTab === tab;
          const isShorts = tab === '숏츠리뷰';
          return (
            <button key={tab} onClick={() => setDetailTab(tab)} style={{
              flex: 1, background: 'none', border: 'none', cursor: 'pointer',
              padding: '12px 0', fontSize: 14, fontWeight: on ? 700 : 400,
              color: on ? (isShorts ? T.ocbRed : T.gray900) : T.gray400,
              borderBottom: on ? `2px solid ${isShorts ? T.ocbRed : T.gray900}` : '2px solid transparent',
              fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            }}>
              {isShorts && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill={on ? T.ocbRed : T.gray400}>
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              )}
              {tab}
              {isShorts && <span style={{ background: T.ocbRed, color: T.white, fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 9999 }}>{REVIEWS.length}</span>}
            </button>
          );
        })}
      </div>

      {/* 탭 콘텐츠 */}
      {detailTab === '숏츠리뷰' && <ShortsReviewTab />}
      {detailTab === '텍스트리뷰' && <TextReviewTab />}
      {detailTab === '상품정보' && <ProductInfoTab />}

      {/* 하단 CTA */}
      <div style={{
        position: 'sticky', bottom: 0, background: T.white,
        padding: '12px 14px', borderTop: `1px solid ${T.gray100}`,
        display: 'flex', gap: 10,
      }}>
        <button onClick={() => setScreen('upload')} style={{
          flex: 1, padding: '14px', borderRadius: 12,
          background: 'linear-gradient(to right, #AA23E9, #FF427D)',
          border: 'none', color: T.white, fontSize: 14, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={T.white}>
            <polygon points="5,3 19,12 5,21"/>
          </svg>
          숏츠리뷰 작성 (+50P)
        </button>
        <button style={{
          flex: 2, padding: '14px', borderRadius: 12,
          background: T.ocbRed, border: 'none',
          color: T.white, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
        }}>구매하기</button>
      </div>
    </div>
  );
}

function ShortsReviewTab() {
  const { setScreen, setCurrentIndex } = useShortsStore();
  return (
    <div style={{ padding: '14px' }}>
      {/* 통계 요약 */}
      <div style={{
        display: 'flex', gap: 10, marginBottom: 14,
        background: T.gray50, borderRadius: 12, padding: '12px 14px',
      }}>
        {[
          { label: '전체 리뷰', value: REVIEWS.length, unit: '개' },
          { label: '총 조회수', value: '28.5만', unit: '' },
          { label: '좋아요', value: fmtNum(REVIEWS.reduce((a, r) => a + r.likes, 0)), unit: '' },
        ].map(({ label, value, unit }) => (
          <div key={label} style={{ flex: 1, textAlign: 'center' }}>
            <p style={{ fontSize: 18, fontWeight: 800, color: T.gray900, margin: 0 }}>{value}{unit}</p>
            <p style={{ fontSize: 11, color: T.gray400, margin: '2px 0 0' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* 리뷰 썸네일 그리드 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
        {REVIEWS.map((r, i) => (
          <button key={r.id} onClick={() => { setCurrentIndex(i); setScreen('feed'); }} style={{
            aspectRatio: '9/16', borderRadius: 8, overflow: 'hidden',
            background: r.gradient, border: 'none', cursor: 'pointer', padding: 0,
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: r.gradient }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)', padding: '12px 6px 6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"/>
                  <circle cx="12" cy="12" r="3" fill="rgba(0,0,0,0.3)"/>
                </svg>
                <span style={{ fontSize: 10, color: T.white }}>{fmtNum(r.views)}</span>
              </div>
            </div>
            <div style={{ position: 'absolute', top: 5, right: 5 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill={T.white}>
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TextReviewTab() {
  const TEXTS = [
    { nick: '커피사랑***', rating: 5, text: '매일 마셔도 질리지 않는 맛. 쿠폰으로 구매하니 더 좋아요!', time: '3일 전' },
    { nick: '절약왕***',   rating: 4, text: 'OK캐쉬백 할인 적용하면 거의 공짜 수준이에요 ㅋㅋ', time: '5일 전' },
    { nick: '바리스타***', rating: 5, text: '에스프레소 샷이 탄탄해서 아메리카노 특유의 쌉쌀함이 살아있어요', time: '1주 전' },
  ];
  return (
    <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {TEXTS.map((r, i) => (
        <div key={i} style={{ padding: '12px 14px', background: T.gray50, borderRadius: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.gray800 }}>{r.nick}</span>
            <span style={{ fontSize: 12, color: T.gray400 }}>{r.time}</span>
          </div>
          <div style={{ display: 'flex', gap: 1, marginBottom: 6 }}>
            {[1,2,3,4,5].map((s) => (
              <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= r.rating ? T.gold : T.gray200}>
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
            ))}
          </div>
          <p style={{ fontSize: 13, color: T.gray700, margin: 0, lineHeight: 1.5 }}>{r.text}</p>
        </div>
      ))}
    </div>
  );
}

function ProductInfoTab() {
  return (
    <div style={{ padding: '20px 14px', textAlign: 'center' }}>
      <div style={{ height: 160, background: T.gray50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <span style={{ color: T.gray300, fontSize: 14 }}>상품 상세 이미지</span>
      </div>
      <p style={{ fontSize: 14, color: T.gray600, lineHeight: 1.6 }}>
        스타벅스 카페 아메리카노는 에스프레소와 물을 혼합한 클래식한 커피 음료입니다.
        OK캐쉬백 쿠폰으로 구매 시 즉시 할인 적용됩니다.
      </p>
    </div>
  );
}
