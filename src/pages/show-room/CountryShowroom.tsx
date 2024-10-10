import Advertisements from "./Advertisement";
import ProductCategories from "./ProductCategories";
import Trends from "./Trends";
import SupplierList from "./SupplierList";
import LocalPromotions from "./LocalPromotions";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import CountryNews from "./CountryNews";
import AIRecommendations from "./AIRecommendations";
import CountryHeader from "./CountryHeader";

const CountryShowroom = ({country_id}) => {
  return (
    <div className="country-showroom px-4 lg:px-12 py-8 bg-gray-50">
      {/* Country-specific Header */}
      <CountryHeader country_id={country_id} />

      {/* Advertisement Section */}
      <div className="my-8">
        <Advertisements />
      </div>

      {/* Filters and Search Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <div className="lg:col-span-1">
          <FilterBar />
        </div>
        <div className="lg:col-span-2">
          <SearchBar />
        </div>
        <div className="lg:col-span-1">
          <LocalPromotions />
        </div>
      </div>

      {/* Product Categories Section */}
      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product Categories
        </h2>
        <ProductCategories />
      </div>

      {/* Trends Section */}
      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Trending Products
        </h2>
        <Trends />
      </div>

      {/* Supplier List Section */}
      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Suppliers</h2>
        <SupplierList />
      </div>

      {/* Country News Section */}
      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Country News & Updates
        </h2>
        <CountryNews />
      </div>

      {/* AI Recommendations Section */}
      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recommended for You
        </h2>
        <AIRecommendations />
      </div>
    </div>
  );
};

export default CountryShowroom;
