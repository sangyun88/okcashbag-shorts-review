import { useRef, useEffect } from 'react';
import { T } from '../tokens';
import { useShortsStore } from '../store/shortsStore';
import VideoCard from '../components/shorts/VideoCard';
import SortBar from '../components/shorts/SortBar';

export default function ScreenShortsFeed({ shellHeight }) {
  const { reviews, currentIndex, setCurrentIndex } = useShortsStore();
  const feedRef = useRef(null);
  const cardHeight = (shellHeight || window.innerHeight) - 56 - 24 - 48 - 37;

  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;
    el.scrollTo({ top: currentIndex * cardHeight, behavior: 'instant' });
  }, [currentIndex, cardHeight]);

  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;
    function onScroll() {
      const idx = Math.round(el.scrollTop / cardHeight);
      setCurrentIndex(idx);
    }
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [cardHeight, setCurrentIndex]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#000' }}>
      {/* 정렬 바 */}
      <SortBar />

      {/* 피드 */}
      <div
        ref={feedRef}
        className="shorts-feed scrollbar-hide"
        style={{ flex: 1, overflowY: 'scroll' }}
      >
        {reviews.map((review) => (
          <VideoCard key={review.id} review={review} height={cardHeight} />
        ))}
      </div>

      {/* 스와이프 힌트 (첫 번째 카드에만) */}
      {currentIndex === 0 && (
        <div style={{
          position: 'absolute', bottom: 80,
          left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          pointerEvents: 'none', opacity: 0.7,
          animation: 'bounce 1.5s infinite',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke={T.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: 11, color: T.white }}>스와이프해서 다음 리뷰</span>
        </div>
      )}
    </div>
  );
}
