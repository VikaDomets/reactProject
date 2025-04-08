
// import React, { useState, useEffect, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "../styles/catalog.module.css";

// import catalog1 from "../assets/img/catalog1.jpg";
// import catalog2 from "../assets/img/catalog2.jpg";
// import catalog3 from "../assets/img/catalog3.jpg";
// import catalog4 from "../assets/img/catalog4.jpg";
// import catalog5 from "../assets/img/catalog5.jpg";
// import catalog6 from "../assets/img/catalog6.jpg";
// import catalog7 from "../assets/img/catalog7.jpg";
// import catalog8 from "../assets/img/catalog8.jpg";
// import catalog9 from "../assets/img/catalog9.jpg";

// const images = [
//   { src: catalog1, width: 689, height: 551 },
//   { src: catalog2, width: 694, height: 555 },
//   { src: catalog3, width: 987, height: 790 },
//   { src: catalog4, width: 605, height: 484 },
//   { src: catalog5, width: 1000, height: 800 },
//   { src: catalog6, width: 627, height: 502 },
//   { src: catalog7, width: 914, height: 731 },
//   { src: catalog8, width: 795, height: 636 },
//   { src: catalog9, width: 795, height: 636 },
// ];

// export default function Catalog() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const swiperModalRef = useRef(null);
//   const swiperWrapperRef = useRef(null);
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     // Ініціалізація слайдера після рендеру
//     if (swiperModalRef.current && swiperWrapperRef.current && !swiperRef.current) {
//       swiperRef.current = new Swiper('.swiper-container', {
//         loop: true,
//         centeredSlides: true,
//         navigation: {
//           nextEl: '.swiper-button-next',
//           prevEl: '.swiper-button-prev',
//         },
//         keyboard: {
//           enabled: true,
//         },
//         effect: 'slide',
//         speed: 300,
//         observer: true,
//         observeParents: true
//       });
//     }

//     // Закриття модалки по ESC
//     const handleEscClose = (e) => {
//       if (e.key === 'Escape' && swiperModalRef.current.classList.contains('active')) {
//         closeModal();
//       }
//     };
//     document.addEventListener('keydown', handleEscClose);

//     return () => {
//       document.removeEventListener('keydown', handleEscClose);
//     };
//   }, []);

//   const openModal = (index) => {
//     setActiveIndex(index);
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     document.body.style.overflow = '';
//   };

//   const handleCloseModalClick = (e) => {
//     if (e.target === swiperModalRef.current) {
//       closeModal();
//     }
//   };

//   return (
//     <section id="projects" className="content-section">
//       <div className="section-heading">
//         <h1>
//           Каталог<br />
//           <strong>Робіт</strong>
//         </h1>
//         <p>
//           Тут представлені роботи, доступні для покупки в галереї
//           <br /> За додатковою інформацією звертайтесь за нашими контактами
//         </p>
//       </div>

//       <div className="section-content">
//         <div className="content-photo">
//           <div className="first-left">
//             <img
//               src={catalog1}
//               alt="catalog1"
//               className="gallery-img"
//               loading="lazy"
//               onClick={() => openModal(0)}
//             />
//             <img
//               src={catalog2}
//               alt="catalog2"
//               className="gallery-img"
//               loading="lazy"
//               onClick={() => openModal(1)}
//             />
//           </div>
//           <div className="first-right">
//             <img
//               src={catalog3}
//               alt="catalog3"
//               className="gallery-img"
//               loading="lazy"
//               onClick={() => openModal(2)}
//             />
//           </div>
//         </div>

//         <div className="content-photo">
//           <div className="content-second">
//             <img
//               src={catalog4}
//               alt="catalog4"
//               className="gallery-img"
//               loading="lazy"
//               onClick={() => openModal(3)}
//             />
//             <img
//               src={catalog5}
//               alt="catalog5"
//               className="gallery-img"
//               loading="lazy"
//               onClick={() => openModal(4)}
//             />
//           </div>
//         </div>

//         <div className="content-photo">
//           <div className="third-left">
//             <img
//               src={catalog6}
//               alt="catalog6"
//               className="gallery-img"
//               loading="lazy"
//               onClick={() => openModal(5)}
//             />
//           </div>
//           <div className="third-right">
//             <img
//               src={catalog7}
//               alt="catalog7"
//               className="gallery-img"
//               loading="lazy"
//               onClick={() => openModal(6)}
//             />
//           </div>
//         </div>

//         <div className="content-photo">
//           <div className="fourth-left">
//             <img
//               src={catalog8}
//               alt="catalog8"
//               className="gallery-img"
//               loading="lazy"
//               onClick={() => openModal(7)}
//             />
//           </div>
//           <div className="fourth-right">
//             <img
//               src={catalog9}
//               alt="catalog9"
//               className="gallery-img"
//               loading="lazy"
//               onClick={() => openModal(8)}
//             />
//           </div>
//         </div>
//       </div>

//       {isOpen && (
//         <div
//           className="swiper-modal active"
//           ref={swiperModalRef}
//           onClick={handleCloseModalClick}
//         >
//           <div className="swiper-container">
//             <Swiper
//               initialSlide={activeIndex}
//               navigation
//               modules={[Navigation]}
//               className="swiper-wrapper"
//             >
//               {images.map((src, i) => (
//                 <SwiperSlide key={i} className="swiper-slide">
//                   <img src={src.src} alt={`catalog-${i + 1}`} />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//             <div className="swiper-close" onClick={closeModal}>
//               ×
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

import React, { useState } from "react";
import styles from "../styles/catalog.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Catalog({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const openSwiper = (index) => {
    setActiveIndex(index);
  };

  const closeSwiper = () => {
    setActiveIndex(null);
  };

  return (
    <div className={styles.contentSection}>
      <div className={styles.sectionHeading}>
        <h2 className={styles.headingTitle}>
          Наші <strong>роботи</strong>
        </h2>
        <p className={styles.headingText}>Декілька зображень наших фотозон</p>
      </div>

      <div className={styles.contentPhoto}>
        <div className={styles.firstLeft}>
          {images.slice(0, 2).map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Gallery"
              className={styles.galleryImg}
              onClick={() => openSwiper(index)}
            />
          ))}
        </div>
        <div className={styles.firstRight}>
          <img
            src={images[2]}
            alt="Gallery"
            className={styles.galleryImg}
            onClick={() => openSwiper(2)}
          />
        </div>
      </div>

      <div className={`${styles.contentPhoto} ${styles.contentSecond}`}>
        {images.slice(3, 5).map((src, index) => (
          <img
            key={index + 3}
            src={src}
            alt="Gallery"
            className={styles.galleryImg}
            onClick={() => openSwiper(index + 3)}
          />
        ))}
      </div>

      <div className={styles.contentPhoto}>
        <div className={styles.thirdLeft}>
          {images.slice(5, 7).map((src, index) => (
            <img
              key={index + 5}
              src={src}
              alt="Gallery"
              className={styles.galleryImg}
              onClick={() => openSwiper(index + 5)}
            />
          ))}
        </div>
        <div className={styles.thirdRight}>
          <img
            src={images[7]}
            alt="Gallery"
            className={styles.galleryImg}
            onClick={() => openSwiper(7)}
          />
        </div>
      </div>

      <div className={styles.contentPhoto}>
        <div className={styles.fourthLeft}>
          {images.slice(8, 10).map((src, index) => (
            <img
              key={index + 8}
              src={src}
              alt="Gallery"
              className={styles.galleryImg}
              onClick={() => openSwiper(index + 8)}
            />
          ))}
        </div>
        <div className={styles.fourthRight}>
          <img
            src={images[10]}
            alt="Gallery"
            className={styles.galleryImg}
            onClick={() => openSwiper(10)}
          />
        </div>
      </div>

      {activeIndex !== null && (
        <div className={`${styles.swiperModal} ${activeIndex !== null ? styles.active : ""}`}>
          <div className={styles.swiperContainer}>
            <Swiper
              initialSlide={activeIndex}
              navigation={true}
              modules={[Navigation]}
              className={styles.swiperWrapper}
            >
              {images.map((src, index) => (
                <SwiperSlide key={index} className={styles.swiperSlide}>
                  <img src={src} alt={`Slide ${index}`} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={styles.swiperClose} onClick={closeSwiper}>
              ×
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
