import { Link } from "react-router-dom";

const GalleryItem = ({ id, title, imgUrl }) => {
    return (
        <div className="relative cursor-pointer max-h-64">
            <Link to={`/proyectos/${id}`} className="w-full">
            <img
                className="h-full w-full rounded-lg object-contain"
                src={imgUrl}
                alt=""
            />
            <div className="absolute rounded-lg top-0 flex w-full h-full bg-slate-600 bg-opacity-50">
                <span className="m-auto inline-block text-2xl text-white sm:text-3xl text-center">
                    {title}
                </span>
            </div>
            </Link>
        </div>
    )
}

export default GalleryItem;