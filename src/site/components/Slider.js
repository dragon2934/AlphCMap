import React, {useLayoutEffect} from 'react';
import {useController, ParallaxBanner} from 'react-scroll-parallax';

const Slider = ({id, className, image, children}) => {
    const {parallaxController} = useController();

    useLayoutEffect(() => {
        const handleResize = () => {
            parallaxController.update();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return (
        <section id={id} className={className}>
            <ParallaxBanner
                layers={[
                    {
                        image: image,
                        amount: 1,
                    },
                ]}
                className={className}>
                {children}
            </ParallaxBanner>
        </section>
    );
};

Slider.propTypes = {};

Slider.defaultProps = {};

export default Slider;
