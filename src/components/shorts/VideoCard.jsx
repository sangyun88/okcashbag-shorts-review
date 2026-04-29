import { useState } from 'react';
import { T } from '../../tokens';
import { useShortsStore } from '../../store/shortsStore';
import VideoScene from './VideoScene';

function fmtNum(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + '만';
  if (n >= 1000)  return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

export default function VideoCard({ review, height }) {
  const { toggleLike, openReport, setScreen } = useShortsStore();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  const MOCK_COMMENTS = [
    { nick: '구매고민중***', text: '진짜 맛있어 보인다', time: '10분 전' },
    { nick: '리뷰왕***',    text: '나도 사야겠다', time: '32분 전' },
    { nick: '절약러***',    text: '할인될 때 질렀어요', time: '1시간 전' },
  ];

  return (
    <div
      className="shorts-slide"
      style={{ position: 'relative', height: height || '100%', width: '100%', flexShrink: 0, overflow: 'hidden', background: '#000' }}
      onClick={() => setIsPaused((v) => !v)}
    >
      {/* 애니메이션 영상 씬 */}
      <div style={{ position: 'absolute', inset: 0, opacity: isPaused ? 0.5 : 1, transition: 'opacity 0.2s' }}>
        <VideoScene reviewId={review.id} />
      </div>

      {/* 일시정지 아이콘 */}
      {isPaused && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.45)', borderRadius: '50%',
          width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={T.white}>
            <rect x="6" y="4" width="4" height="16" rx="1"/>
            <rect x="14" y="4" width="4" height="16" rx="1"/>
          </svg>
        </div>
      )}

      {/* 자막 — 중앙 */}
      <div style={{
        position: 'absolute', top: '52%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '78%', textAlign: 'center',
        pointerEvents: 'none',
      }}>
        <span style={{ color: T.white, fontSize: 18, fontWeight: 500, lineHeight: 1.45 }}>
          {review.caption}
        </span>
      </div>

      {/* 하단 그라디언트 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.88) 100%)',
        pointerEvents: 'none',
      }} />

      {/* 우측 액션 버튼 */}
      <div style={{
        position: 'absolute', right: 14, bottom: 112,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22,
      }} onClick={(e) => e.stopPropagation()}>
        <ActionBtn
          icon={
            <svg width="26" height="26" viewBox="0 0 24 24" fill={review.isLiked ? '#FF5A5F' : 'none'}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={review.isLiked ? '#FF5A5F' : T.white} strokeWidth="2"/>
            </svg>
          }
          label={fmtNum(review.likes)} active={review.isLiked} activeColor="#FF5A5F"
          onClick={() => toggleLike(review.id)}
        />
        <ActionBtn
          icon={
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M21 15C21 15.53 20.79 16.04 20.41 16.41C20.04 16.79 19.53 17 19 17H7L3 21V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H19C19.53 3 20.04 3.21 20.41 3.59C20.79 3.96 21 4.47 21 5V15Z" stroke={T.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          label={fmtNum(review.comments)} onClick={() => setShowComments(true)}
        />
        <ActionBtn
          icon={
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M4 12V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V12" stroke={T.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 6L12 2L8 6" stroke={T.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2V15" stroke={T.white} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          }
          label="공유"
        />
        <ActionBtn
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
              <path d="M12 8V12" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="1" fill="rgba(255,255,255,0.5)"/>
            </svg>
          }
          label="신고" labelColor="rgba(255,255,255,0.5)" onClick={() => openReport(review.id)}
        />
      </div>

      {/* 하단 정보 */}
      <div style={{ position: 'absolute', bottom: 20, left: 14, right: 80 }}
        onClick={(e) => e.stopPropagation()}>
        {/* 닉네임 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: review.accentColor, border: `2px solid rgba(255,255,255,0.8)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: T.white, flexShrink: 0,
          }}>
            {review.reviewer.nickname[0]}
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: T.white, margin: 0 }}>{review.reviewer.nickname}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{review.postedAt}</p>
          </div>
        </div>

        {/* 상품 칩 */}
        <button onClick={() => setScreen('product')} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)',
          borderRadius: 12, padding: '8px 12px',
          border: '1px solid rgba(255,255,255,0.1)',
          cursor: 'pointer', maxWidth: '100%',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6, flexShrink: 0,
            background: review.accentColor + '33',
            border: `1px solid ${review.accentColor}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke={review.accentColor} strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke={review.accentColor} strokeWidth="1.5"/>
            </svg>
          </div>
          <div style={{ textAlign: 'left', overflow: 'hidden' }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', margin: 0, fontWeight: 500 }}>{review.product.brand}</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: T.white, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{review.product.name}</p>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 'auto', flexShrink: 0 }}>
            <path d="M9 18L15 12L9 6" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* 포인트 뱃지 */}
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          <div style={{
            background: 'rgba(255,208,78,0.15)', border: '1px solid rgba(255,208,78,0.4)',
            borderRadius: 9999, padding: '3px 10px',
          }}>
            <span style={{ fontSize: 11, color: T.gold, fontWeight: 600 }}>★ {review.points}P 지급</span>
          </div>
          {review.bonusPoints > 0 && (
            <div style={{
              background: 'rgba(255,90,95,0.15)', border: '1px solid rgba(255,90,95,0.3)',
              borderRadius: 9999, padding: '3px 10px',
            }}>
              <span style={{ fontSize: 11, color: '#FF5A5F', fontWeight: 600 }}>+{review.bonusPoints}P 보너스</span>
            </div>
          )}
        </div>
      </div>

      {/* 조회수 */}
      <div style={{
        position: 'absolute', top: 12, left: 14,
        display: 'flex', alignItems: 'center', gap: 4,
        background: 'rgba(0,0,0,0.28)', borderRadius: 9999, padding: '3px 10px',
      }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={T.white} strokeWidth="2"/>
          <circle cx="12" cy="12" r="3" stroke={T.white} strokeWidth="2"/>
        </svg>
        <span style={{ fontSize: 11, color: T.white, fontWeight: 600 }}>{fmtNum(review.views)}</span>
      </div>

      {/* 댓글 드로어 */}
      {showComments && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: '#1a1a1a', borderRadius: '20px 20px 0 0',
          padding: '16px', maxHeight: '62%', display: 'flex', flexDirection: 'column',
        }} onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ color: T.white, fontWeight: 700, fontSize: 15 }}>댓글 {review.comments}</span>
            <button onClick={() => setShowComments(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke={T.gray400} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 12 }}>
            {MOCK_COMMENTS.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#333', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: T.gray400 }}>{c.nick[0]}</div>
                <div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: T.gray400 }}>{c.nick} <span style={{ fontWeight: 400, color: T.gray500 }}>{c.time}</span></p>
                  <p style={{ margin: '3px 0 0', fontSize: 13, color: T.white }}>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12 }}>
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value.slice(0, 50))}
              placeholder="댓글 남기기 (최대 50자)"
              style={{
                flex: 1, background: '#2a2a2a', border: 'none', borderRadius: 10,
                padding: '9px 12px', fontSize: 13, color: T.white, fontFamily: 'inherit', outline: 'none',
              }}
            />
            <button onClick={() => setCommentText('')} style={{
              background: commentText.trim() ? T.ocbRed : '#333', border: 'none',
              borderRadius: 10, padding: '8px 14px', color: T.white, fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}>전송</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionBtn({ icon, label, onClick, active, activeColor, labelColor }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
    }}>
      {icon}
      <span style={{ fontSize: 11, fontWeight: 600, color: active ? activeColor : (labelColor || T.white) }}>{label}</span>
    </button>
  );
}
