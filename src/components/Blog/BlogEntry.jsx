import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetch } from "../../utils/authFetch";

const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const BlogEntry = ({
  id
}) => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [blogEntry, setBlogEntry] = useState({});

  const fetchBlogEntry = async () => {
    try {
      const { status, data } = await fetch(`${process.env.REACT_APP_SERVER_URL}/blogs/get/${id}`, "GET");

      if (status === 200) setBlogEntry(data);

    } catch (err) {
        console.log(err);
      navigate("/");
    }
  }

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!id) return;
      try {
        const { status, data } = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/blogs/recommendations/${id}`,
          "GET",
        );

        if (status === 200) {
          console.log(data);
          setRecommendations(data);
        }
      } catch (error) {
        console.error("Error al recuperar recomendaciones");
      }
    };
    fetchBlogEntry();
    fetchRecommendations();
  }, [id]);

  const handleRecommendationClick = (id) => {
    window.scrollTo(0, 0);
    navigate(`/blog/${id}`);
  }

  return (
    <>
      <main className="pt-32 pb-16 lg:pt-32 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    className="mr-4 w-12 h-12 rounded-full"
                    src="/img/logo.png"
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {blogEntry?.author}
                    </a>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      <time pubdate title={blogEntry?.created_at}>
                        {new Date(blogEntry?.created_at).toLocaleDateString(
                          "es-MX",
                          dateOptions,
                        )}
                      </time>
                    </p>
                  </div>
                </div>
              </address>
            </header>
            <figure>
              <img
                src={`${process.env.REACT_APP_SERVER_URL}/${blogEntry?.photo}`}
                alt=""
              />
              <figcaption>{blogEntry?.photoDescription || ""}</figcaption>
            </figure>
            <h1>{blogEntry?.title}</h1>
            <blockquote>
              <p>{blogEntry?.subtitle}</p>
            </blockquote>
            <p className="whitespace-pre text-wrap">{blogEntry?.text}</p>
          </article>
        </div>
      </main>
      {recommendations.length > 0 && (
        <aside
          aria-label="Related articles"
          className="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800"
        >
          <div className="px-4 mx-auto max-w-screen-xl">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
              Artículos relacionados
            </h2>
            <div className="grid gap-12 justify-items-center sm:grid-cols-2 lg:grid-cols-4">
              {recommendations.map(({ _id: id, title, text, photo }) => (
                <article className="max-w-xs">
                  <a href="#" onClick={() => handleRecommendationClick(id)}>
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}/${photo}`}
                      className="mb-5 rounded-lg"
                      alt="Header"
                    />
                  </a>
                  <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    <a href="#" onClick={() => handleRecommendationClick(id)}>{title}</a>
                  </h2>
                  <p className="mb-4 text-gray-500 text-ellipsis line-clamp-3 dark:text-gray-400">
                    {text}
                  </p>
                  <a
                    href="#"
                    onClick={() => handleRecommendationClick(id)}
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                  >
                    Leer
                  </a>
                </article>
              ))}
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default BlogEntry;
