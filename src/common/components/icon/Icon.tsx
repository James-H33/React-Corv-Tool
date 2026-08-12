import { IconTypes } from '@common/types/icon';
import { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import './Icon.scss';

const iconLoaders = import.meta.glob('../../../assets/icons/*.svg', {
  query: 'raw',
});

interface IconProps {
  icon: IconTypes;
  size?: number;
}

function Icon({ icon, size }: IconProps) {
  const [svgContent, setSvgContent] = useState('');
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const loadSvg = async () => {
      const iconPath = `../../../assets/icons/${icon}.svg`;
      const iconLoader = iconLoaders[iconPath];

      if (!iconLoader) {
        console.error(`Icon not found: ${iconPath}`);
        setSvgContent('');
        return;
      }

      try {
        const svgText = await iconLoader() as { default: string };

        setSvgContent(DOMPurify.sanitize(svgText?.default));
      } catch (error) {
        console.error(error);
        setSvgContent('');
      }
    };

    loadSvg();
  }, [icon]);

  useEffect(() => {
    const svgElement = iconRef.current?.querySelector('svg');

    if (svgElement) {
      svgElement.setAttribute('width', '1em');
      svgElement.setAttribute('height', '1em');
      svgElement.setAttribute('fill', 'currentColor');
    }
  }, [svgContent]);

  return (
    <span
      className="ct-icon"
      ref={iconRef}
      style={{ fontSize: size }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    ></span>
  );
}

export default Icon;
