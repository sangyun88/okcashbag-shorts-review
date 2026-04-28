import { useRef } from 'react';
import './index.css';
import { useShortsStore } from './store/shortsStore';
import StatusBar from './components/ui/StatusBar';
import TopAppBar from './components/ui/TopAppBar';
import BottomNav from './components/ui/BottomNav';
import ScreenShopping from './screens/ScreenShopping';
import ScreenShortsFeed from './screens/ScreenShortsFeed';
import ScreenProductDetail from './screens/ScreenProductDetail';
import ScreenUpload from './screens/ScreenUpload';
import ReportModal from './components/shorts/ReportModal';
import { T } from './tokens';

export default function App() {
  const { activeScreen, setScreen } = useShortsStore();
  const shellRef = useRef(null);

  const isFeed = activeScreen === 'feed';
  const isUpload = activeScreen === 'upload';

  function getTitle() {
    if (activeScreen === 'product') return '상품 상세';
    if (activeScreen === 'upload') return '숏츠리뷰 작성';
    return null;
  }

  function getBackTarget() {
    if (activeScreen === 'product') return 'shopping';
    if (activeScreen === 'upload') return 'product';
    return null;
  }

  return (
    <div
      ref={shellRef}
      style={{
        display: 'flex', flexDirection: 'column',
        height: '100dvh',
        background: isFeed ? '#000' : T.white,
        position: 'relative', overflow: 'hidden',
        maxWidth: 480, margin: '0 auto',
      }}
    >
      {/* 상태바 */}
      <StatusBar dark={isFeed} />

      {/* 탑바 */}
      <TopAppBar
        dark={isFeed}
        title={getTitle()}
        onBack={getBackTarget() ? () => setScreen(getBackTarget()) : undefined}
      />

      {/* 메인 콘텐츠 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {activeScreen === 'shopping' && <ScreenShopping />}
        {activeScreen === 'feed'     && <ScreenShortsFeed shellHeight={shellRef.current?.clientHeight} />}
        {activeScreen === 'product'  && <ScreenProductDetail />}
        {activeScreen === 'upload'   && <ScreenUpload />}
      </div>

      {/* 하단 내비게이션 (업로드 화면 제외) */}
      {!isUpload && <BottomNav />}

      {/* 신고 모달 */}
      <ReportModal />
    </div>
  );
}
