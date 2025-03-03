import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../shared/Button";

const Slider = ({ itemsPerPage, children }) => {
    const [index, setIndex] = useState(0);
    const items = Array.isArray(children) ? children : [children];

    const nextSlide = () => {
        if (index + itemsPerPage < items.length) {
            setIndex(index + itemsPerPage);
        }
    };
    const prevSlide = () => {
        if (index - itemsPerPage >= 0) {
            setIndex(index - itemsPerPage);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                {index > 0 && (
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
                    {items.slice(index, index + itemsPerPage)}
                </div>

                {index + itemsPerPage < items.length && (
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
