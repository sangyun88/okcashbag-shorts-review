import { useState } from 'react';
import { T } from '../../tokens';
import { useShortsStore } from '../../store/shortsStore';

function fmtNum(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + '만';
  if (n >= 1000)  return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

export default function VideoCard({ review, height }) {
  const { toggleLike, openReport, setScreen } = useShortsStore();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);

  const MOCK_COMMENTS = [
    { nick: '구매고민중***', text: '진짜 맛있어 보인다', time: '10분 전' },
    { nick: '리뷰왕***',    text: '나도 사야겠다', time: '32분 전' },
    { nick: '절약러***',    text: '할인될 때 질렀어요', time: '1시간 전' },
  ];

  return (
    <div
      className="shorts-slide"
      style={{
        position: 'relative',
        height: height || '100%',
        width: '100%',
        flexShrink: 0,
        background: review.gradient,
        overflow: 'hidden',
      }}
      onClick={() => setIsPlaying((v) => !v)}
    >
      {/* 배경 그라디언트 (영상 대체) */}
      <div style={{ position: 'absolute', inset: 0, background: review.gradient }} />

      {/* 영상 중앙 텍스트 자막 */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '8px 20px',
        pointerEvents: 'none',
        width: '80%', textAlign: 'center',
      }}>
        <span style={{ color: T.white, fontSize: 18, fontWeight: 700, letterSpacing: -0.3, lineHeight: 1.4, textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
          {review.caption}
        </span>
      </div>

      {/* 재생/일시정지 표시 */}
      {!isPlaying && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.5)', borderRadius: '50%',
          width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', marginTop: 60,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={T.white}>
            <rect x="6" y="4" width="4" height="16" rx="1"/>
            <rect x="14" y="4" width="4" height="16" rx="1"/>
          </svg>
        </div>
      )}

      {/* 하단 그라디언트 오버레이 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: T.gradShorts,
        pointerEvents: 'none',
      }} />

      {/* 우측 액션 버튼 */}
      <div style={{
        position: 'absolute', right: 12, bottom: 120,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
      }} onClick={(e) => e.stopPropagation()}>

        {/* 좋아요 */}
        <ActionBtn
          icon={
            <svg width="26" height="26" viewBox="0 0 24 24" fill={review.isLiked ? '#ff4d6d' : 'none'}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={review.isLiked ? '#ff4d6d' : T.white} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          }
          label={fmtNum(review.likes)}
          active={review.isLiked}
          activeColor="#ff4d6d"
          onClick={() => toggleLike(review.id)}
        />

        {/* 댓글 */}
        <ActionBtn
          icon={
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke={T.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          label={fmtNum(review.comments)}
          onClick={() => setShowComments(true)}
        />

        {/* 공유 */}
        <ActionBtn
          icon={
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke={T.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 6L12 2L8 6" stroke={T.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2V15" stroke={T.white} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          }
          label="공유"
        />

        {/* 신고 */}
        <ActionBtn
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke={T.gray300} strokeWidth="1.5"/>
              <path d="M12 8V12" stroke={T.gray300} strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="1" fill={T.gray300}/>
            </svg>
          }
          label="신고"
          labelColor={T.gray400}
          onClick={() => openReport(review.id)}
        />
      </div>

      {/* 하단 정보 영역 */}
      <div style={{
        position: 'absolute', bottom: 20, left: 14, right: 80,
      }} onClick={(e) => e.stopPropagation()}>
        {/* 닉네임 + 팔로우 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: review.accentColor, border: `2px solid ${T.white}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: T.white, flexShrink: 0,
          }}>
            {review.reviewer.nickname[0]}
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: T.white, margin: 0 }}>{review.reviewer.nickname}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{review.postedAt}</p>
          </div>
          <button style={{
            marginLeft: 4, padding: '4px 12px', borderRadius: 9999,
            border: `1px solid ${T.white}`, background: 'transparent',
            color: T.white, fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>팔로우</button>
        </div>

        {/* 상품 정보 칩 */}
        <button
          onClick={() => setScreen('product')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            borderRadius: 10, padding: '8px 12px', border: 'none', cursor: 'pointer',
            maxWidth: '100%',
          }}>
          <div style={{
            width: 32, height: 32, borderRadius: 6, flexShrink: 0,
            background: review.accentColor + '33',
            border: `1px solid ${review.accentColor}55`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z" stroke={review.accentColor} strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke={review.accentColor} strokeWidth="1.5"/>
            </svg>
          </div>
          <div style={{ textAlign: 'left', overflow: 'hidden' }}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{review.product.brand}</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: T.white, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{review.product.name}</p>
          </div>
          <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        {/* 포인트 보상 뱃지 */}
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'rgba(255,208,78,0.2)', border: '1px solid rgba(255,208,78,0.5)',
            borderRadius: 9999, padding: '3px 10px',
          }}>
            <span style={{ fontSize: 11, color: T.gold }}>★ {review.points}P 지급</span>
          </div>
          {review.bonusPoints > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'rgba(232,0,61,0.2)', border: '1px solid rgba(232,0,61,0.4)',
              borderRadius: 9999, padding: '3px 10px',
            }}>
              <span style={{ fontSize: 11, color: '#ff6b8a' }}>+{review.bonusPoints}P 보너스</span>
            </div>
          )}
        </div>
      </div>

      {/* 조회수 */}
      <div style={{
        position: 'absolute', top: 12, left: 14,
        display: 'flex', alignItems: 'center', gap: 4,
        background: 'rgba(0,0,0,0.35)', borderRadius: 9999, padding: '3px 10px',
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={T.white} strokeWidth="2"/>
          <circle cx="12" cy="12" r="3" stroke={T.white} strokeWidth="2"/>
        </svg>
        <span style={{ fontSize: 11, color: T.white, fontWeight: 600 }}>{fmtNum(review.views)}</span>
      </div>

      {/* 댓글 드로어 */}
      {showComments && (
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: T.gray900, borderRadius: '16px 16px 0 0',
            padding: '16px', maxHeight: '60%', display: 'flex', flexDirection: 'column',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ color: T.white, fontWeight: 700, fontSize: 15 }}>댓글 {review.comments}</span>
            <button onClick={() => setShowComments(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke={T.gray400} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
            {MOCK_COMMENTS.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: T.gray700, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: T.gray300 }}>{c.nick[0]}</div>
                <div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: T.gray300 }}>{c.nick} <span style={{ fontWeight: 400, color: T.gray500 }}>{c.time}</span></p>
                  <p style={{ margin: '3px 0 0', fontSize: 13, color: T.white }}>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, borderTop: `1px solid ${T.gray800}`, paddingTop: 12 }}>
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value.slice(0, 50))}
              placeholder={`댓글 남기기 (최대 50자)`}
              style={{
                flex: 1, background: T.gray800, border: 'none', borderRadius: 8,
                padding: '8px 12px', fontSize: 13, color: T.white, fontFamily: 'inherit', outline: 'none',
              }}
            />
            <button style={{
              background: commentText.trim() ? T.ocbRed : T.gray700, border: 'none',
              borderRadius: 8, padding: '8px 14px', color: T.white, fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }} onClick={() => setCommentText('')}>전송</button>
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
