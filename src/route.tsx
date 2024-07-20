import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/not-found-page";
import HomePage from "./pages/home-page";
import { AboutPage } from "./pages/about-page";
import BecomeSellerPage from "./pages/become-seller-page";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import AllProductsPage from "./pages/all-products-page";
import TrackOrderPage from "./pages/track-order";
import ProfilePage from "./pages/profile-page";
import SingleProduct from "./pages/single-product";
import ShowRoomPage from "./pages/show-room-page";
import PrivacyPolicyPage from "./pages/privacy-policy-page";
import VerifyEmailPage from "./pages/verify-email-page";
import WishListPage from "./pages/wish-list-page";
import ShoppingCartPage from "./pages/shopping-cart-page";
import CheckoutPage from "./pages/checkout-page";
import BlogPage from "./pages/blog-page";
import ContactPage from "./pages/contact-page";
import FaqPage from "./pages/faq-page";
import TermsConditionsPage from "./pages/terms-condition-page";
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
      <Route path="/signup" element={<SignupPage />} />
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
