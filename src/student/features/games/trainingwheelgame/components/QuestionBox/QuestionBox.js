import './QuestionBox.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { memo, useEffect, useState } from 'react';

// Import Swiper styles
import 'swiper/css';
import { Mousewheel, Zoom } from 'swiper/modules';
import { shuffleArrayPostion } from '../../../../../../shared/utils/helperFunction';

const QuestionBox = ({ words, handleSelection }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleSlideChange = () => {
    if (swiperInstance) {
      const index = (swiperInstance.activeIndex + 1) % swiperInstance.slides.length;
      const slide = swiperInstance.slides[index].innerText;
      handleSelection(slide);
    }
  };

  const setInitialSlide = () => {
    if (swiperInstance) {
      const initialSlide = swiperInstance.slides[1]?.innerText;
      if (initialSlide) handleSelection(initialSlide);
    }
  }

  useEffect(() => {
    setInitialSlide();
  }, [swiperInstance, handleSelection, words, setInitialSlide]);


  return (
    <>
      {words && words.length > 0 && (
        <div className='question-box h-[200px] w-[200px]'>
          <Swiper
            direction={'vertical'}
            slidesPerView={3}
            loop={true}
            mousewheel={true}
            modules={[Mousewheel, Zoom]}
            className="mySwiper"
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            onSlideChange={handleSlideChange}
          >
            {swiperInstance && shuffleArrayPostion(words).map((w, k) => (
              <SwiperSlide key={k}>
                <div className='p-hello clg:text-[0.7vw]'>
                  <div className='c-hello'>{w}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default memo(QuestionBox);