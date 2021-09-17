import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';

const TABLET_MIN_WIDTH = 720;
const DESKTOP_MIN_WIDTH = 1024;

const useDisplay = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDektop] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    window.addEventListener('resize', windowResizeHandler);
    return () => {
      window.removeEventListener('resize', windowResizeHandler);
    };
  }, []);

  useEffect(() => {
    if (
      width > DESKTOP_MIN_WIDTH
      && isNotMatch(false, false, true)
    ) {
      change(false, false, true); // desktop
    } else if (
      width < DESKTOP_MIN_WIDTH
      && width > TABLET_MIN_WIDTH
      && isNotMatch(false, true, false)
    ) {
      change(false, true, false); // tablet
    } else if (
      width < TABLET_MIN_WIDTH
      && isNotMatch(true, false, false)
    ) {
      change(true, false, false); // mobile
    }
  }, [width]);

  const isNotMatch = useCallback((mobile, tablet, desktop) => {
    return !(isMobile === mobile && isTablet === tablet && isDesktop === desktop);
  }, [isMobile, isTablet, isDesktop])

  // debounce와 throttling의 차이점 알아보기
  // debounce  : 함수 호출이 연속적으로 될 때, 제일 처음 또는 마지막 함수만 호출하도록 하는 것
  // throttling: 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것
  const windowResizeHandler = _.debounce(() => {
    setWidth(window.innerWidth);
  }, 300);

  const change = (mobile, tablet, desktop) => {
    setIsMobile(mobile);
    setIsTablet(tablet);
    setIsDektop(desktop);
  }

  return { isMobile, isTablet, isDesktop };
}

export default useDisplay;