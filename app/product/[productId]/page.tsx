import { StarIcon } from "@heroicons/react/20/solid";
import fetchProduct from "@/actions/get-product";
import Image from "next/image";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {

  //Baraagaa duudah function
  const product = await fetchProduct(params.productId);


  //Dundaj rating oloh logic uildel
  const ratingValues = product.reviews.map(item => item.rating);
  const sumOfRatings = ratingValues.reduce((acc, curr) => acc + curr, 0);
  const averageRating = sumOfRatings / ratingValues.length;
  const roundedAverage = Math.round(averageRating);

  return (
    product && (
      <div className="bg-white">
        <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8 mt-20">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {product.title}
                </h1>
                <p className="text-xl font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
              {/* Reviews */}
              <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {roundedAverage.toFixed(1)}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          roundedAverage > rating
                            ? "text-yellow-400"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                      />
                    ))}
                  </div>
           
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0 flex justify-center">
                <Image
                  width={300}
                  height={100}
                  layout="contain"
                  key={product.id}
                  alt="Product photo"
                  src={product.images[0]}
                />
            </div>

            <div className="mt-5 lg:col-span-5">
              {/* Product details */}
              <div className="mt-2">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>

                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  className="prose prose-sm mt-4 text-gray-500"
                />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">
                  Tags
                </h2>

                <div className="prose prose-sm mt-4 text-gray-500">
                  <ul role="list">
                    {product.tags.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
            <h2
              id="reviews-heading"
              className="text-lg font-medium text-gray-900"
            >
              Recent reviews
            </h2>

            <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
              {product.reviews.map((review, index) => (
                <div
                  key={review.rating + index}
                  className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
                >
                  <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                    <div className="flex items-center xl:col-span-1">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            aria-hidden="true"
                            className={classNames(
                              review.rating > rating
                                ? "text-yellow-400"
                                : "text-gray-200",
                              "h-5 w-5 flex-shrink-0"
                            )}
                          />
                        ))}
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        {review.rating}
                        <span className="sr-only"> out of 5 stars</span>
                      </p>
                    </div>

                    <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        {review.comment}
                      </h3>

                    </div>
                  </div>

                  <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                    <p className="font-medium text-gray-900">
                      {review.reviewerName}
                    </p>
                    <time
                      dateTime={review.date}
                      className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                    >
                      {review.date.slice(0, 10)}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    )
  );
};

export default ProductPage;
