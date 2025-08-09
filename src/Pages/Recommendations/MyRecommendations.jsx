import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const MyRecommendations = () => {
  const { user, loading: authLoading } = useAuth()
  const axiosSecure = useAxiosSecure()
  const userEmail = user?.email
  const [myRecommendations, setMyRecommendations] = useState([])
  const [postDetails, setPostDetails] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (!userEmail) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const recRes = await axiosSecure.get(`/recommendations-by-user/${userEmail}`)
        const data = recRes.data
        const sortedData = data.sort(
          (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
        )
        setMyRecommendations(sortedData)
        const postMap = {}
        sortedData.forEach(rec => {
          if (!postMap[rec.queryId]) postMap[rec.queryId] = []
          postMap[rec.queryId].push(rec)
        })
        const queryIds = Object.keys(postMap)
        const queries = await Promise.all(
          queryIds.map(id => axiosSecure.get(`/queries/${id}`).then(res => res.data))
        )
        const details = {}
        queryIds.forEach((id, index) => {
          details[id] = queries[index]
        })
        setPostDetails(details)
      } catch{
        toast.error('Failed to load recommendations')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [authLoading, userEmail, axiosSecure])

  const handleDelete = async (id, queryId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this recommendation?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    })
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/recommendations/${id}`)
        const data = res.data
        if (data.success) {
          toast.success('Recommendation deleted')
          setMyRecommendations(prev => prev.filter(r => r._id !== id))
          setPostDetails(prev => {
            const updated = { ...prev }
            if (updated[queryId]?.recommendationCount) {
              updated[queryId].recommendationCount -= 1
            }
            return updated
          })
        }
      } catch {
        toast.error('Failed to delete recommendation')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center  min-h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    )
  }

  return (
    <div className=" mt-5  md:w-11/12 mx-auto md:min-h-[720px] min-h-[700px] p-4">
      {myRecommendations.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-white mt-10 text-lg font-medium">
          You have not made any recommendations yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border-2 border-gray-400">
          <table className="min-w-full bg-white dark:bg-transparent text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-3 border Cursive">Query Image</th>
                <th className="p-3 border Cursive">Query Product Name</th>
                <th className="p-3 border Cursive">Recommended Product</th>
                <th className="p-3 border Cursive">Title</th>
                <th className="p-3 border Cursive">Action</th>
              </tr>
            </thead>
            <tbody>
              {myRecommendations.map(rec => {
                const post = postDetails[rec.queryId]
                return (
                  <tr key={rec._id} className="hover:bg-gray-50 dark:hover:bg-black">
                    <td className="p-3 border border-gray-300">
                      {post?.imageUrl && (
                        <img
                          src={post.imageUrl}
                          alt="Query"
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="p-3 border border-gray-300">{post?.productName}</td>
                    <td className="p-3 border border-gray-300">{rec.recommendedProductName}</td>
                    <td className="p-3 border border-gray-300">{rec.recommendationTitle}</td>
                    <td className="p-3 border border-gray-300">
                     <div className='w-full text-center'>
                       <button
                        onClick={() => handleDelete(rec._id, rec.queryId)}
                        className="bg-red-500  hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                      >
                        Delete
                      </button>
                     </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MyRecommendations
