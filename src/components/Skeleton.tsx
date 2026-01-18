interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string;
    height?: string;
    animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({
    className = '',
    variant = 'rectangular',
    width,
    height,
    animation = 'pulse',
}: SkeletonProps) {
    const variantClasses = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };

    const animationClasses = {
        pulse: 'animate-pulse',
        wave: 'animate-shimmer',
        none: '',
    };

    const style = {
        width: width || '100%',
        height: height || (variant === 'text' ? '1em' : undefined),
    };

    return (
        <div
            className={`bg-dark-700 ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
            style={style}
            aria-hidden="true"
        />
    );
}

// Preset Skeleton Components
export function SkeletonCard() {
    return (
        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6 space-y-4">
            <Skeleton variant="rectangular" height="200px" />
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="60%" />
        </div>
    );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                    <Skeleton variant="circular" width="40px" height="40px" />
                    <div className="flex-1 space-y-2">
                        <Skeleton variant="text" width="30%" />
                        <Skeleton variant="text" width="50%" />
                    </div>
                    <Skeleton variant="rectangular" width="100px" height="32px" />
                </div>
            ))}
        </div>
    );
}

export function SkeletonDashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <Skeleton variant="text" width="200px" height="32px" />
                <Skeleton variant="text" width="300px" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
                        <Skeleton variant="text" width="60%" className="mb-4" />
                        <Skeleton variant="text" width="120px" height="40px" />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
    );
}
