import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartService } from '../services/cart-service';
import { useAuthStore } from './authStore';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false }),
      openCart: () => set({ isOpen: true }),

      addItem: async (product, variant, quantity = 1) => {
        const { isAuthenticated } = useAuthStore.getState();
        
        if (isAuthenticated) {
          try {
            // Call backend API
            const backendCart = await cartService.addToCart(variant.id.toString().replace('v-', ''), quantity);
            // Sync local state with backend response if needed, 
            // or just refresh cart from backend
            set({ 
              items: backendCart.items.map(item => ({
                id: item.id,
                variantId: item.variantId,
                productName: item.productName,
                productSlug: item.productSlug,
                sku: item.sku,
                imageUrl: item.imageUrl,
                price: item.price,
                quantity: item.quantity,
                attributes: item.attributes
              }))
            });
          } catch (error) {
            console.error('Failed to add to cart on backend', error);
          }
        } else {
          // Local logic for guests
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
                  id: Date.now(),
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
        }
        // Disabled automatic opening - user wants popup instead
        // set({ isOpen: true });
      },

      fetchCart: async () => {
        const { isAuthenticated } = useAuthStore.getState();
        if (isAuthenticated) {
          try {
            const backendCart = await cartService.getCart();
            set({ 
              items: backendCart.items.map(item => ({
                id: item.id,
                variantId: item.variantId,
                productName: item.productName,
                productSlug: item.productSlug,
                sku: item.sku,
                imageUrl: item.imageUrl,
                price: item.price,
                quantity: item.quantity,
                attributes: item.attributes
              }))
            });
          } catch (error) {
            console.error('Error fetching backend cart:', error);
          }
        }
      },

      removeItem: async (variantId) => {
        const { isAuthenticated } = useAuthStore.getState();
        const currentItems = get().items;
        const itemToRemove = currentItems.find(i => i.variantId === variantId);

        console.log('Attempting to remove item:', { variantId, itemToRemove });

        if (isAuthenticated && itemToRemove && itemToRemove.id) {
          try {
            // Ensure we use the backend item ID, not the variant ID
            await cartService.removeItem(itemToRemove.id);
            await get().fetchCart(); // Refresh to ensure sync
          } catch (error) {
            console.error('Error removing item from backend cart:', error);
          }
        } else {
          set({
            items: currentItems.filter((item) => item.variantId !== variantId),
          });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        const { isAuthenticated } = useAuthStore.getState();
        const currentItems = get().items;
        const itemToUpdate = currentItems.find(i => i.variantId === variantId);

        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        if (isAuthenticated && itemToUpdate) {
          try {
            await cartService.updateQuantity(itemToUpdate.id, quantity);
            await get().fetchCart(); // Refresh from backend
          } catch (error) {
            console.error('Error updating quantity on backend:', error);
          }
        } else {
          const newItems = currentItems.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item
          );
          set({ items: newItems });
        }
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
