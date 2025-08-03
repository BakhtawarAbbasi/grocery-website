import FAQSection from "@/components/FAQSection"
import FeaturedProducts from "@/components/featureProduct"
import HeroSection from "@/components/heroSection"
import ProductBanner from "@/components/ProductBanner"
import QueryForm from "@/components/queryForm"
import TrendingSection from "@/components/TrendingSection"

function MainPage(){
    return(
        <div>
           <HeroSection/>
           <FeaturedProducts/>
           <ProductBanner/>
           <TrendingSection/>
           <FAQSection/>
           <QueryForm/>
        </div>
    )
}

export default MainPage