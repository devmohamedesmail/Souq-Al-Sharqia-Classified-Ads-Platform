import BottomNavbar from '@/components/front/BottomNavbar'
import Footer from '@/components/front/Footer'
import MiddleHeader from '@/components/front/MiddleHeader'
import TopHeader from '@/components/front/TopHeader'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFavourite } from '@/redux/FavouriteSlice'
import { Link } from '@inertiajs/react'
import { FaHeartBroken } from 'react-icons/fa'

function Favourites() {
  const favourites = useSelector((state: any) => state.favourites.items);
  const dispatch = useDispatch()

  return (
    <div className="min-h-screen bg-gradient-to-br from-main/5 to-sky-50">
      <TopHeader />
      <MiddleHeader />

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-main mb-8 text-center drop-shadow">المفضلة ❤️</h1>
        {favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-md border border-main/10">
            <FaHeartBroken className="text-6xl text-main mb-4" />
            <h3 className="text-main text-2xl font-bold mb-2">لا توجد إعلانات مفضلة</h3>
            <p className="text-gray-500 text-base">يمكنك إضافة الإعلانات إلى المفضلة من خلال الضغط على زر القلب في أي إعلان.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favourites.map((item:any) => (
              <div
                key={item.id}
                className="relative flex flex-col bg-white rounded-2xl shadow-lg p-5 border-b-4 border-main/10 hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Remove from favourites button */}
                <button
                  onClick={() => dispatch(removeFavourite(item.id))}
                  className="absolute top-3 left-3 bg-red-100 text-red-500 rounded-full p-2 shadow hover:bg-red-200 transition"
                  title="إزالة من المفضلة"
                >
                  <FaHeartBroken className="w-5 h-5" />
                </button>
                {/* Image */}
                <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden mb-3">
                  {item.images && (Array.isArray(item.images) ? item.images[0] : JSON.parse(item.images)[0]) ? (
                    <img
                      src={Array.isArray(item.images) ? item.images[0] : JSON.parse(item.images)[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">لا صورة</span>
                  )}
                </div>
                {/* Info */}
                <Link
                  href={`/show/ad/details/${item.slug}/${item.id}`}
                  className="text-lg font-bold text-main hover:underline block mb-1 text-right"
                >
                  {item.title
                    ? item.title.split(' ').slice(0, 5).join(' ') + (item.title.split(' ').length > 5 ? '...' : '')
                    : ''}
                </Link>
                <div className="flex flex-wrap justify-end gap-2 text-sm text-gray-500 mb-2">
                  <span className="bg-main/10 text-main px-2 py-1 rounded-full font-semibold">
                    {item.price} درهم
                  </span>
                  <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full">{item.email}</span>
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{item.phone}</span>
                </div>
                <Link
                  href={`/show/ad/details/${item.slug}/${item.id}`}
                  className="inline-block mt-2 px-6 py-2 bg-gradient-to-r from-main to-sky-400 text-white rounded-full text-sm font-bold shadow hover:from-sky-400 hover:to-main hover:scale-105 transition-all"
                >
                  تفاصيل الإعلان
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
      <BottomNavbar />
    </div>
  )
}

export default Favourites