import './Skeleton.scss';

interface SkeletonLoaderProps {
  width?: number;
  height?: number;
  borderRadius?: number;
}

function SkeletonLoader({
  width,
  height,
  borderRadius
}: SkeletonLoaderProps) {
  const styles = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
    borderRadius: borderRadius ? `${borderRadius}px` : undefined,
  };

  return <div className="ct-skeleton-loader" style={styles}></div>;
}

export default SkeletonLoader;
