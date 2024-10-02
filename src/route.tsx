import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/staticpages/not-found-page";
import HomePage from "./pages/home-page";
import { AboutPage } from "./pages/about-us/about-page";
import LoginPage from "./pages/Authentication/login-page";
import TrackOrderPage from "./pages/cartandcheckout/track-order-page";
import ProfilePage from "./pages/user/profile-page";
import SingleProduct from "./pages/products/single-product-page";
import { PrivacyPolicyPage } from "./pages/privacy-policy/privacy-policy-page";
import VerifyEmailPage from "./pages/Authentication/verify-email-page";
import ForgotPasswordPage from "./pages/Authentication/forgot-password";
import WishListPage from "./pages/cartandcheckout/wish-list-page";
import ShoppingCartPage from "./pages/cartandcheckout/shopping-cart-page";
import CheckoutPage from "./pages/cartandcheckout/checkout-page";
import BlogPage from "./pages/Blogs/blog-page";
import ContactPage from "./pages/staticpages/contact-page";
import FaqPage from "./pages/staticpages/faq-page";
import ShowRoomPage from "./pages/products/show-room-page";
import IntegratedSignup from "./pages/Authentication/IntegratedSignup";
import CreateBusiness from "./pages/BusinessInformation/CreateBusiness";
import { TermsPage } from "./pages/privacy-policy/terms-page";
import { CookiesPolicyPage } from "./pages/privacy-policy/cookies-page";
import BlogDetails from "./pages/Blogs/components/blog-details";
import BusinessDetailPage from "./pages/user/pages/BusinessDetailPage";
import AddBusinessUserPage from "./pages/BusinessInformation/add-business-user";
import AddBusinessLocation from "./pages/BusinessInformation/add-business-location";
import DashboardLayout from "./pages/user/DashboardLayout";
import { Overview } from "./components/profile-dashboard/overview";

import BuyerDashboard from "./pages/user/buyer-profile/BuyerDashboard";
import StripeSuccessPage from "./pages/BusinessInformation/StripeSuccessPage";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="terms-condition" element={<TermsPage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="signup" element={<IntegratedSignup />} />
      <Route path="/create-business" element={<CreateBusiness />} />
      <Route path="/business/:businessId" element={<BusinessDetailPage />} />
      <Route
        path="/business/:businessId/add-user"
        element={<AddBusinessUserPage />}
      />
      <Route
        path="/business/:businessId/add-location"
        element={<AddBusinessLocation />}
      />

      {/* <Route path="/all-products" element={<AllProductsPage />} /> */}
      <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
      <Route path="/supplier-dashboard" element={<ProfilePage />} />
      <Route path="/track-order" element={<TrackOrderPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        {/* <Route path="supplier-dashboard" element={<ProfilePage />} /> */}

        {/* <Route path="buyer" element={<BuyerDashboard />} /> */}

        {/* <Route path="supplier" element={<ProfilePage />} /> */}
      </Route>
      <Route path="/subscription/success" element={<StripeSuccessPage />} />
      <Route path="/single-product" element={<SingleProduct />} />
      <Route path="/show-room" element={<ShowRoomPage />} />
      <Route path="cookie-policy" element={<CookiesPolicyPage />} />
      <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/wishlist" element={<WishListPage />} />
      <Route path="/cart" element={<ShoppingCartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
