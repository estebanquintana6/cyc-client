import { Card } from "flowbite-react";

const GalleryItem = ({ title, date, text, photo }) => {
  return (
    <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={photo}
    >
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h1>
      <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
        {date}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 text-ellipsis line-clamp-3">
        {text}
      </p>
    </Card>
  );
}

export default GalleryItem;