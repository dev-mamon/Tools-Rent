import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import Banner from "./Banner";
import Category from "./Category";
import PopularTools from "./PopularTools";
import ProcessSection from "./ProcessSection";
import FairFeePolicy from "./FairFeePolicy";
import Testimonial from "./Testimonial";

export default function Home({ tools }) {
    // <--- Added tools here
    return (
        <GuestLayout>
            <Head title="Home - Jardiloc Gardening Tools" />
            <Banner />
            <Category />

            {/* Pass the tools data down to the child component */}
            <PopularTools tools={tools} />

            <ProcessSection />
            <FairFeePolicy />
            <Testimonial />
        </GuestLayout>
    );
}
