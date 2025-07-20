import React from "react";
import { useLocation, Link } from "react-router-dom";

interface BreadcrumbNavProps {
  currentView?: string;
  selectedCategory?: string;
  selectedWine?: string;
}

export function BreadcrumbNav({ 
  currentView = "splash", 
  selectedCategory, 
  selectedWine 
}: BreadcrumbNavProps) {
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const items = [];

    if (location.pathname === "/") {
      return [{ label: "home", href: "/", isCurrent: true }];
    }

    items.push({ label: "home", href: "/", isCurrent: false });

    if (location.pathname === "/categories" && currentView === "category-selection") {
      items.push({ label: "categories", href: "/categories", isCurrent: true });
      return items;
    }

    items.push({ label: "categories", href: "/categories", isCurrent: false });

    if (currentView === "category-wine-list" && selectedCategory) {
      items.push({ label: selectedCategory.toLowerCase(), href: "#", isCurrent: true });
      return items;
    }

    if (currentView === "wine-scoring" && selectedCategory && selectedWine) {
      items.push({ label: selectedCategory.toLowerCase(), href: "#", isCurrent: false });
      items.push({ label: selectedWine.toLowerCase(), href: "#", isCurrent: true });
      return items;
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <div 
      style={{
        fontFamily: 'Fira Mono, Consolas, Menlo, monospace',
        fontSize: '12px',
        position: 'fixed',
        top: '0',
        left: '24px',
        zIndex: 50,
        color: 'white',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.isCurrent ? (
            <span style={{ color: 'white', fontWeight: 'bold' }}>
              {item.label}
            </span>
          ) : (
            <Link 
              to={item.href} 
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
              }}
            >
              {item.label}
            </Link>
          )}
          {index < breadcrumbItems.length - 1 && (
            <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
} 