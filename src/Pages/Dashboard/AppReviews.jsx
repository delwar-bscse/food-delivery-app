import React from 'react'
import { useDeleteReviewMutation, useReviewsQuery } from '../../redux/apiSlices/notificationSlice';
import { ConfigProvider, Pagination, Rate } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RiDeleteBin2Line } from "react-icons/ri";
import toast from 'react-hot-toast';

const AppReviews = () => {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();

  const pageNumber = +searchParams.get('page') || 1;

  const [deleteReview] = useDeleteReviewMutation();
  const { data: reviewsData, isLoading, refetch } = useReviewsQuery({
    page: pageNumber,
    limit: 20
  });
  // console.log("Backend Data", reviewsData?.data);


  const theme = {
    components: {
      Rate: {
        starSize: 16
      },
    },
  }

  const handleDeleteReview = async (id) => {
    console.log("Delete User ID:", id);
    const res = await deleteReview(id).unwrap();
    console.log(res);
    toast.success("Review deleted successfully!");
    refetch();
  };

  const handlePagination = (page) => {
    navigation(`?page=${page}`);
  };


  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">App Reviews</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : reviewsData?.data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsData.data.map((review, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className='flex'>
                  <div className="flex-1 flex items-center mb-4">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                      {review.userId.fullName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-800">{review.userId.fullName}</h3>
                      <p className="text-gray-500 text-sm">{review.userId.email}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteReview(review._id)} className='bg-gray-200 w-9 h-9 flex items-center justify-center'>
                    <RiDeleteBin2Line className='text-red-500 cursor-pointer hover:text-red-700' size={24}  />
                  </button>
                </div>

                <div className="mb-4 flex items-center">
                  <ConfigProvider theme={theme}>
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={review.rating}
                      className="text-yellow-400"
                    />
                  </ConfigProvider>
                  <span className="ml-2 text-gray-600 font-medium">
                    {review.rating.toFixed(1)}
                  </span>
                </div>

                <p className="text-gray-700 italic">
                  "{review.reviewText}"
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No reviews yet</h3>
          <p className="mt-1 text-gray-500">Be the first to share your experience!</p>
        </div>
      )}

      <div className="flex justify-center py-6">
        <Pagination current={reviewsData?.pagination?.currentPage} onChange={handlePagination} total={reviewsData?.pagination?.totalReviews} showSizeChanger={false} />
      </div>
    </div>
  )
}

export default AppReviews