// import dynamic from "next/dynamic";
// import type React from "react";
// import SlickSlider, { type Settings } from "react-slick";

// interface SliderWrapperProps extends Omit<Settings, "children"> {
//   children: React.ReactNode;
// }

// export const SliderWrapper: React.FC<SliderWrapperProps> = ({
//   children,
//   ...settings
// }) => {
//   const Slider = dynamic(() => import("react-slick"), { ssr: false, loadableGenerated: { webpack: [ [require.resolve("react-slick")], [require.resolve("slick-carousel")], ], }, });
//   return <Slider {...settings}>{children}</Slider>;
// };
