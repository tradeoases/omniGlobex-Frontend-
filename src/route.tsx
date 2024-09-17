import { Route, Routes } from "react-router-dom";

import NotFoundPage from "./pages/staticpages/not-found-page";
import HomePage from "./pages/home-page";
import { AboutPage } from "./pages/about-us/about-page";
import BecomeSellerPage from "./pages/Authentication/become-seller-page";
import LoginPage from "./pages/Authentication/login-page";
import SignupPage from "./pages/Authentication/signup-page";

import TrackOrderPage from "./pages/cartandcheckout/track-order-page";
import ProfilePage from "./pages/user/profile-page";
import SingleProduct from "./pages/products/single-product-page";
import PrivacyPolicyPage from "./pages/staticpages/privacy-policy-page";
import VerifyEmailPage from "./pages/Authentication/verify-email-page";
import WishListPage from "./pages/cartandcheckout/wish-list-page";
import ShoppingCartPage from "./pages/cartandcheckout/shopping-cart-page";
import CheckoutPage from "./pages/cartandcheckout/checkout-page";
import BlogPage from "./pages/Blogs/blog-page";
import ContactPage from "./pages/staticpages/contact-page";
import FaqPage from "./pages/staticpages/faq-page";
import TermsConditionsPage from "./pages/staticpages/terms-condition-page";
import ShowRoomPage from "./pages/products/show-room-page";
import AllProductsPage from "./pages/products/all-products-page";
import IntegratedSignup from "./pages/Authentication/IntegratedSignup";
import CreateBusiness from "./pages/BusinessInformation/CreateBusiness";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/terms-condition" element={<TermsConditionsPage />} />
      <Route path="/become-seller" element={<BecomeSellerPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/signup" element={<SignupPage />} /> */}
      <Route path="signup" element={<IntegratedSignup />} />
      <Route path="/createBusiness" element={<CreateBusiness />} />
      <Route path="/all-products" element={<AllProductsPage />} />
      <Route path="/track-order" element={<TrackOrderPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/single-product" element={<SingleProduct />} />
      <Route path="/show-room" element={<ShowRoomPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/wishlist" element={<WishListPage />} />
      <Route path="/cart" element={<ShoppingCartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
