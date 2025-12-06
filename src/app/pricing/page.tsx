'use client';

import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Force Navbar to show 'home' state or similar */}
            <Navbar
                currentPage="pricing"
                setCurrentPage={() => { }}
                isAuthenticated={false}
                onAuthClick={() => { }}
            />
            <div className="pt-20">
                <Pricing setCurrentPage={() => { }} />
            </div>
            <Footer />
        </div>
    );
}
