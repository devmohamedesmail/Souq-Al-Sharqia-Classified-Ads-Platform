import Banner from '@/components/front/Banner'
import BottomHeader from '@/components/front/BottomHeader'
import BottomNavbar from '@/components/front/BottomNavbar'
import Categories_section from '@/components/front/Categories_section'
import MiddleHeader from '@/components/front/MiddleHeader'
import Places_section from '@/components/front/Places_section'
import Sidebar from '@/components/front/Sidebar'
import TopHeader from '@/components/front/TopHeader'
import LastAdItem from '@/components/items/LastAdItem'
import { useTranslation } from 'react-i18next'
import { Head } from '@inertiajs/react'
import Footer from '@/components/front/Footer'


function Home({ places, categories, lastAds }: any) {
  const { t } = useTranslation();

  return (
    <div>
      <Head title={t('home')} />
      <TopHeader />
      <MiddleHeader />
      <BottomHeader />
      <Banner />
      <Places_section places={places} />
      <div className="container m-auto grid grid-cols-1 md:grid-cols-12">
        {/* Sidebar */}
        <Sidebar lastAds={lastAds} />
        {/* Main Content */}
        <div className="col-span-9 text-center">
          <Categories_section categories={categories} />
          <div className="last-added px-3">
            <h5 className="bg-primary p-2 text-white"> {t('last-added')} </h5>
            <div className="items">

              {lastAds && lastAds.map((item: any) => (
                <LastAdItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <BottomNavbar />
    </div>
  )
}

export default Home