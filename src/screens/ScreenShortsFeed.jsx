import { useRef, useEffect, useState } from 'react';
import { useShortsStore } from '../store/shortsStore';
import VideoCard from '../components/shorts/VideoCard';
import SortBar from '../components/shorts/SortBar';

export default function ScreenShortsFeed() {
  const { reviews, currentIndex, setCurrentIndex } = useShortsStore();
  const feedRef = useRef(null);
  const containerRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(0);

  // 실제 컨테이너 높이를 측정 — 주소바 토글 등 뷰포트 변화에도 안정적
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      setCardHeight(entries[0].contentRect.height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 외부에서 currentIndex 변경 시 스크롤
  useEffect(() => {
    const el = feedRef.current;
    if (!el || !cardHeight) return;
    el.scrollTo({ top: currentIndex * cardHeight, behavior: 'instant' });
  }, [currentIndex, cardHeight]);

  // 스크롤 위치로 현재 인덱스 동기화
  useEffect(() => {
    const el = feedRef.current;
    if (!el || !cardHeight) return;
    function onScroll() {
      setCurrentIndex(Math.round(el.scrollTop / cardHeight));
    }
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [cardHeight, setCurrentIndex]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <SortBar />
      <div ref={containerRef} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <div
          ref={feedRef}
          className="shorts-feed scrollbar-hide"
          style={{ position: 'absolute', inset: 0, overflowY: 'scroll' }}
        >
          {cardHeight > 0 && reviews.map((review) => (
            <VideoCard key={review.id} review={review} height={cardHeight} />
          ))}
        </div>
      </div>
    </div>
  );
}
