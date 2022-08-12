import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ServiceArea from "@containers/services/layout-01";
import SupportArea from "@containers/support";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const GettingStarted = () => (
    <Wrapper>
        <SEO pageTitle="Getting Started" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Getting Started"
                currentPage="Getting Started"
            />
            <ServiceArea />
            <SupportArea />
        </main>
        <Footer />
    </Wrapper>
);

export default GettingStarted;
