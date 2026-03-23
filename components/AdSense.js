import { useEffect } from 'react';

/**
 * Ad Component for Ezoic + AdSense
 * 
 * Placement Strategy (3 ads per page for optimal UX + revenue):
 * - below-hero: After hero, before main content
 * - in-content: After calculator grid, natural break point
 * - below-content: After FAQ/info, before footer
 * 
 * Usage:
 * <AdSlot position="below-hero" />
 * <AdSlot position="in-content" />
 * <AdSlot position="below-content" />
 */

export default function AdSlot({ 
  position = 'below-content',
  className = ''
}) {
  
  useEffect(() => {
    // Push ad to queue after component mounts
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
      // Ezoic also uses adsbygoogle queue
      if (typeof window !== 'undefined' && window.ezstandalone) {
        window.ezstandalone.cmd.push(function() {
          window.ezstandalone.defineAd(position);
        });
      }
    } catch (err) {
      // Silent fail - ads are non-critical
    }
  }, [position]);

  // Slot configuration by position
  const slotConfig = {
    'below-hero': {
      minHeight: '90px',
      format: 'horizontal',
      label: 'Advertisement'
    },
    'in-content': {
      minHeight: '100px',
      format: 'horizontal',
      label: 'Advertisement'
    },
    'below-content': {
      minHeight: '90px',
      format: 'horizontal',
      label: 'Advertisement'
    }
  };

  const config = slotConfig[position] || slotConfig['below-content'];

  return (
    <div className={`ad-container ad-${position} ${className}`}>
      <div className="ad-label">{config.label}</div>
      <ins
        className="adsbygoogle ad-slot"
        style={{ 
          display: 'block', 
          textAlign: 'center',
          minHeight: config.minHeight
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX'}
        data-ad-slot={process.env[`NEXT_PUBLIC_ADSENSE_SLOT_${position.toUpperCase().replace('-', '_')}`] || ''}
        data-ad-format={config.format}
        data-full-width-responsive="true"
      />
      
      <style jsx>{`
        .ad-container {
          margin: 2rem auto;
          max-width: 800px;
          width: 100%;
        }

        .ad-label {
          font-size: 0.7rem;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .ad-slot {
          background: #f9fafb;
          border-radius: 4px;
        }

        /* Placeholder for development */
        .ad-container::after {
          content: '';
        }

        @media (max-width: 640px) {
          .ad-container {
            margin: 1.5rem auto;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * AdSense/Ezoic Script Loader
 * Add to _app.js or _document.js
 * 
 * For Ezoic: They provide their own script via their dashboard
 * For AdSense: Use this component
 */
export function AdScript() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  
  // Only load in production with real client ID
  if (!clientId || clientId === 'ca-pub-XXXXXXXXXXXXXXXX') {
    return null;
  }
  
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}

/**
 * Ezoic Placeholder Component
 * Use this for Ezoic's automated ad placement testing
 */
export function EzoicAd({ id }) {
  return (
    <div id={id} className="ezoic-ad">
      {/* Ezoic will inject ads here */}
      <style jsx>{`
        .ezoic-ad {
          min-height: 90px;
          margin: 1.5rem auto;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
