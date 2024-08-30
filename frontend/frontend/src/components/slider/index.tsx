// // Slider.jsx

// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// type Props = {
//   images: string[];
// };

// const Slider: React.FC<Props> = ({ images }) => {
//   return (
//     <Carousel
//       showArrows={true}
//       autoPlay={true}
//       autoFocus={false}
//       showIndicators={true}
//       showThumbs={true}
//       showStatus={false}
//       infiniteLoop={true}
//       swipeable={true}
//       swipeScrollTolerance={15}
//     >
//       {images.map((imageUrl, index) => (
//         <div className="flex items-center flex-col" key={index}>
//           <img
//             src={imageUrl}
//             alt={`Image ${index + 1}`}
//             onClick={(e: any) => {
//               e.target.blur(); // Remove focus immediately on click
//               // You can add additional logic here if needed
//             }}
//           />
//         </div>
//       ))}
//     </Carousel>
//   );
// };

// export default Slider;
