import { useEffect } from 'react';

/**
 * SEO Component for dynamic title and meta management
 * Since we don't have react-helmet, we manage DOM directly
 */
export default function SEO({ title, description, keywords }) {
  useEffect(() => {
    // Update Title
    const baseTitle = "TechChain | Premium Future Tech";
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description || "TechChain - The leading e-commerce platform for cutting-edge technology and hardware.");

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords || "tech, gadgets, electronics, premium hardware, TechChain");

    return () => {
      // Clean up/Reset if needed on unmount
    };
  }, [title, description, keywords]);

  return null; // This component doesn't render anything
}
