import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles
import "./index.css"; // Import CSS for styling

const CarouselPage = () => {
  return (
    <div className="carousel-container">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        showStatus={false}
        stopOnHover
        transitionTime={500}
      >
        <div>
          <img
            src="https://res.cloudinary.com/daehuqvdc/image/upload/v1741260841/DALL_E_2025-03-06_16.59.32_-_A_warm_and_rich_bowl_of_Ulava_Charu_a_traditional_Andhra-style_horse_gram_soup_served_with_steaming_hot_white_rice._The_dish_has_a_deep_brown_color_dtnr8t.webp"
            alt="Restaurant 1"
            className="carousel-image"
          />
          {/* <p className="legend">Delicious Meals Await</p> */}
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/daehuqvdc/image/upload/v1741260845/DALL_E_2025-03-06_16.59.29_-_A_delicious_plate_of_Andhra-style_Pulihora_Tamarind_Rice_featuring_yellow-hued_rice_mixed_with_tangy_tamarind_paste_tempered_with_mustard_seeds_c_avxl1h.webp"
            alt="Restaurant 2"
            className="carousel-image"
          />
          {/* <p className="legend">Experience Fine Dining</p> */}
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/daehuqvdc/image/upload/v1741260841/DALL_E_2025-03-06_16.59.30_-_A_traditional_Andhra-style_meal_featuring_Ragi_Sangati_finger_millet_ball_served_with_Natu_Kodi_Pulusu_spicy_country_chicken_curry_._The_Ragi_Sanga_gb2opa.webp"
            alt="Restaurant 3"
            className="carousel-image"
          />
          {/* <p className="legend">Tasty Dishes & Great Ambiance</p> */}
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselPage;
