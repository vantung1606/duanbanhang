import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false }),
      openCart: () => set({ isOpen: true }),

      addItem: (product, variant, quantity = 1) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.variantId === variant.id
        );

        if (existingItemIndex > -1) {
          const newItems = [...currentItems];
          newItems[existingItemIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          set({
            items: [
              ...currentItems,
              {
                id: Date.now(), // Local ID
                variantId: variant.id,
                productId: product.id,
                productName: product.name,
                productSlug: product.slug,
                sku: variant.sku,
                imageUrl: product.imageUrls ? product.imageUrls[0] : product.thumbnailUrl,
                price: variant.price,
                quantity: quantity,
                attributes: variant.attributeValues
              },
            ],
          });
        }
        // Open cart automatically when item added
        set({ isOpen: true });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter((item) => item.variantId !== variantId),
        });
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        const newItems = get().items.map((item) =>
          item.variantId === variantId ? { ...item, quantity } : item
        );
        set({ items: newItems });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'techchain-cart',
    }
  )
);

export default useCartStore;
