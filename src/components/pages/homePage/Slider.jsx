import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../shared/Button";

const Slider = ({ itemsPerPage, children }) => {
    const [index, setIndex] = useState(0);
    const items = Array.isArray(children) ? children : [children];
    const totalItems = items.length;
    const shouldScroll = totalItems > itemsPerPage;

    const nextSlide = () => {
        if (shouldScroll) {
            setIndex((prevIndex) => (prevIndex + 1) % totalItems);
        }
    };

    const prevSlide = () => {
        if (shouldScroll) {
            setIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
        }
    };

    const getVisibleItems = () => {
        if (!shouldScroll) {
            return items; 
        }
        return Array.from({ length: itemsPerPage }).map((_, i) =>
            items[(index + i) % totalItems] 
        );
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                {shouldScroll && (
                    <Button
                        buttonTitle={
                            <span className="material-symbols-outlined">
                                chevron_left
                            </span>
                        }
                        setAction={prevSlide}
                        className="bg-fe-orange"
                    />
                )}

                <div className="d-flex justify-content-center w-100">
                    {getVisibleItems()}
                </div>

                {shouldScroll && (
                    <Button
                        buttonTitle={
                            <span className="material-symbols-outlined">
                                chevron_right
                            </span>
                        }
                        setAction={nextSlide}
                        className="bg-fe-orange"
                    />
                )}
            </div>
        </div>
    );
};

export default Slider;
