import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";
import TopBarArea from "@containers/top-bar";
import HeroArea from "@containers/hero/layout-07";
import LiveExploreArea from "@containers/live-explore/layout-03";
import CollectionArea from "@containers/collection/layout-03";
import ExploreProductArea from "@containers/explore-product/layout-09";
import ServiceArea from "@containers/services/layout-02";
import NotificationArea from "@containers/notification";
import CreatorArea from "@containers/creator/layout-02";
import { normalizedData } from "@utils/methods";

// Demo data
import homepageData from "../data/homepages/home-07.json";
import sellerData from "../data/sellers.json";
import productData from "../data/explore.json";
import collectionsData from "../data/collections.json";
import notificationData from "../data/notifications.json";

export async function getStaticProps() {
    return {
        props: {
            className: "home-sticky-pin sidebar-header position-relative",
        },
    };
}

const Home = () => {
    const content = normalizedData(homepageData?.content || []);
    const liveAuctionData = productData
        .filter(
            (prod) =>
                prod?.auction_date && new Date() <= new Date(prod?.auction_date)
        )
        .sort(
            (a, b) =>
                Number(new Date(b.published_at)) -
                Number(new Date(a.published_at))
        )
        .slice(0, 4);
    return (
        <Wrapper>
            <SEO pageTitle="Home Seven" />
            <Header />
            <main id="main-content" className="rn-nft-mid-wrapper">
                <div className="list-item-1">
                    <TopBarArea />
                    <HeroArea data={content["hero-section"]} />
                </div>
                <LiveExploreArea
                    id="list-item-2"
                    data={{
                        ...content["live-explore-section"],
                        products: liveAuctionData,
                    }}
                />
                <CollectionArea
                    space={2}
                    data={{
                        ...content["collection-section"],
                        collections: collectionsData.slice(0, 4),
                    }}
                />
                <ExploreProductArea
                    id="list-item-3"
                    space={2}
                    data={{
                        ...content["explore-product-section"],
                        products: productData,
                    }}
                />
                <ServiceArea
                    data={content["service-section"]}
                    space={2}
                    id="list-item-4"
                />
            </main>
            <div className="header-right-fixed">
                <NotificationArea data={{ notifications: notificationData }} />
                <CreatorArea
                    data={{
                        creators: sellerData,
                    }}
                />
            </div>
            <Footer />
        </Wrapper>
    );
};

export default Home;
