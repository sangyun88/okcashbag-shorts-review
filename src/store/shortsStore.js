import { create } from 'zustand';
import { REVIEWS } from '../data/mockData';

export const useShortsStore = create((set, get) => ({
  reviews: REVIEWS,
  currentIndex: 0,
  sortKey: 'latest',
  activeScreen: 'shopping', // 'shopping' | 'feed' | 'product' | 'upload'
  uploadStep: 0, // 0=select, 1=edit, 2=caption, 3=done
  uploadCaption: '',
  showReport: false,
  reportTarget: null,
  myPoints: 3200,

  setScreen: (screen) => set({ activeScreen: screen }),
  setCurrentIndex: (i) => set({ currentIndex: i }),
  setSortKey: (key) => set({ sortKey: key }),
  setUploadStep: (step) => set({ uploadStep: step }),
  setUploadCaption: (text) => set({ uploadCaption: text }),
  openReport: (reviewId) => set({ showReport: true, reportTarget: reviewId }),
  closeReport: () => set({ showReport: false, reportTarget: null }),

  toggleLike: (id) => set((state) => ({
    reviews: state.reviews.map((r) =>
      r.id === id
        ? { ...r, isLiked: !r.isLiked, likes: r.isLiked ? r.likes - 1 : r.likes + 1 }
        : r
    ),
  })),

  submitReview: (caption) => {
    const newReview = {
      id: Date.now(),
      product: { name: '스타벅스 카페 아메리카노 T', brand: '스타벅스', price: '4,700원' },
      reviewer: { nickname: '나***', avatar: null },
      caption,
      likes: 0,
      comments: 0,
      views: 1,
      postedAt: '방금 전',
      points: 50,
      bonusPoints: 0,
      gradient: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
      accentColor: '#00b4d8',
      isLiked: false,
    };
    set((state) => ({
      reviews: [newReview, ...state.reviews],
      myPoints: state.myPoints + 50,
      activeScreen: 'feed',
      uploadStep: 0,
      uploadCaption: '',
    }));
  },
}));
