import type React from "react";
import SlickSlider, { type Settings } from "react-slick";

interface SliderWrapperProps extends Settings {
  children: React.ReactNode;
}

export const SliderWrapper: React.FC<SliderWrapperProps> = ({
  children,
  ...settings
}) => <SlickSlider {...settings}>{children}</SlickSlider>;
