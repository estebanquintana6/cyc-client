import { Link } from "react-router-dom";
import { Card } from "flowbite-react";

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const GalleryItem = ({ _id, title, created_at, text, photo }) => {
  return (
    <Link to={`/blog/${_id}`}>
      <Card
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={photo}
      >
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h1>
        <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
          {new Date(created_at).toLocaleDateString('es-MX', dateOptions)}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-ellipsis line-clamp-3">
          {text}
        </p>
      </Card>
    </Link>
  );
}

export default GalleryItem;