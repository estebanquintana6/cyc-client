const PhotoModal = ({ photoUrl, description, closeModal }) => {
  return (
    <div
      id="default-modal"
      className="overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full xs:w-screen md:w-[70vw]">
        <div className="relative bg-white rounded-lg shadow-2xl dark:bg-gray-700 h-[90vh] flex flex-col">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <img
            src={`${process.env.REACT_APP_SERVER_URL}/${photoUrl}`}
            alt={description}
            className="h-5/6 object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
