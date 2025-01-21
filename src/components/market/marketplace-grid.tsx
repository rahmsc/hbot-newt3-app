import { WellnessProductCard } from "~/components/wellness/wellness-product-card";
import type { MarketplaceProduct } from "~/data/marketplaceData";

interface MarketplaceGridProps {
  products: MarketplaceProduct[];
}

export function MarketplaceGrid({ products }: MarketplaceGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <WellnessProductCard
          key={product.id}
          title={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          publisher={product.publisher}
          productUrl={product.productUrl}
        />
      ))}
    </div>
  );
}
