"use client";
import Image from "next/image";
import logoImage from "../../../public/logo/logo_bg_trans.png";

import { motion } from "framer-motion";

export default function ImageSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex h-[500px] items-center justify-center pt-32"
    >
      <div className="aspect-[16/9] px-10 sm:aspect-[21/9] md:aspect-[3/1] lg:aspect-[3.5/1] xl:aspect-[4/1]">
        <Image
          src={logoImage}
          alt="Logo Image"
          fill
          className="flex items-center justify-center object-cover"
          sizes="100vw"
          priority
        />
      </div>
    </motion.section>
  );
}
