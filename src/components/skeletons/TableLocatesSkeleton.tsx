import ContentLoader from 'react-content-loader'

export function TableSkeleton() {
  return (
    <div className='w-full'>
      <ContentLoader
        speed={2}
        viewBox='0 0 1200 400'
        backgroundColor='#f3f3f3'
        foregroundColor='#dddddd'
      >
        {/* Input de pesquisa */}
        <rect x='0' y='0' rx='4' ry='4' width='200' height='40' />

        {/* Botão Adicionar */}
        <rect x='1080' y='0' rx='4' ry='4' width='120' height='40' />

        {/* Cabeçalho da tabela */}
        <rect x='0' y='60' rx='4' ry='4' width='1200' height='40' />

        {/* Linhas da tabela */}
        <rect x='0' y='120' rx='4' ry='4' width='1200' height='40' />
        <rect x='0' y='190' rx='4' ry='4' width='1200' height='40' />
      </ContentLoader>
    </div>
  )
}
