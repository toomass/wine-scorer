import React from "react";
import { useLocation, Link, useParams } from "react-router-dom";

export function BreadcrumbNav() {
  const location = useLocation();
  const { categoryId, wineId } = useParams<{ categoryId?: string; wineId?: string }>();

  const getBreadcrumbItems = () => {
    const items = [];

    if (location.pathname === "/") {
      return [{ label: "home", href: "/", isCurrent: true }];
    }

    items.push({ label: "home", href: "/", isCurrent: false });

    if (location.pathname === "/categories") {
      items.push({ label: "categories", href: "/categories", isCurrent: true });
      return items;
    }

    items.push({ label: "categories", href: "/categories", isCurrent: false });

    if (categoryId && !wineId) {
      // Category wine list page
      const categoryName = categoryId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
      items.push({ label: categoryName, href: `/categories/${categoryId}`, isCurrent: true });
      return items;
    }

    if (categoryId && wineId) {
      // Wine scoring page
      const categoryName = categoryId.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
      items.push({ label: categoryName, href: `/categories/${categoryId}`, isCurrent: false });
      items.push({ label: wineId, href: `/categories/${categoryId}/wines/${wineId}`, isCurrent: true });
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