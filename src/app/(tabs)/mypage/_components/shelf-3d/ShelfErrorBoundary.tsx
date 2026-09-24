"use client";

import { Component } from "react";
import type { ReactNode } from "react";

type ShelfErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
};

type ShelfErrorBoundaryStateT = {
  hasError: boolean;
};

/**
 * 3D 렌더링은 기기·드라이버 사정으로 실패할 수 있고, 텍스처 하나만 못 불러와도 터진다.
 * 그때 화면이 비지 않도록 격자 목록으로 떨어뜨린다.
 */
class ShelfErrorBoundary extends Component<
  ShelfErrorBoundaryProps,
  ShelfErrorBoundaryStateT
> {
  state: ShelfErrorBoundaryStateT = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default ShelfErrorBoundary;
