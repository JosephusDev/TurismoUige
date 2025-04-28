import ContentLoader from 'react-content-loader'

export function LocateDetailsSkeleton() {
  return (
    <div className='min-h-screen w-full bg-background py-8'>
      {/* Skeleton do Banner/Carousel */}
      <ContentLoader
        speed={2}
        width='100%'
        height={200}
        viewBox='0 0 1000 600'
        backgroundColor='#f3f3f3'
        foregroundColor='#dddddd'
      >
        <rect x='0' y='0' rx='12' ry='12' width='100%' height='500' />
      </ContentLoader>

      {/* Skeleton do Conteúdo */}
      <div className='flex flex-col gap-4 justify-center items-center px-4 py-8'>
        <ContentLoader
          speed={2}
          width={600}
          height={250}
          viewBox='0 0 600 250'
          backgroundColor='#f3f3f3'
          foregroundColor='#dddddd'
        >
          {/* Título */}
          <rect x='150' y='0' rx='8' ry='8' width='300' height='32' />

          {/* Localização e Avaliação */}
          <rect x='180' y='50' rx='8' ry='8' width='240' height='24' />
          <rect x='240' y='90' rx='8' ry='8' width='120' height='24' />
        </ContentLoader>
      </div>
    </div>
  )
}
