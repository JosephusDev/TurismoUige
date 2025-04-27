import ContentLoader from 'react-content-loader'

export function CardSkeleton() {
  return (
    <div className='container p-8'>
      <div className='relative'>
        <div className='flex justify-center gap-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className='relative min-w-0 flex-[0_0_100%] md:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(25%-12px)]'
            >
              <ContentLoader
                speed={2}
                width='100%'
                height={300}
                viewBox='0 0 100% 300'
                backgroundColor='#f3f3f3'
                foregroundColor='#ecebeb'
                className='rounded-xl border bg-card'
                uniqueKey={`card-skeleton-${index}`}
              >
                <rect x='0' y='0' width='100%' height='200' />
                <rect x='16' y='216' rx='4' ry='4' width='128' height='20' />
                <rect x='16' y='244' rx='4' ry='4' width='100%' height='16' />
                <rect x='16' y='268' rx='4' ry='4' width='75%' height='16' />
              </ContentLoader>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
