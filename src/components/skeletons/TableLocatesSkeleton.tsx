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
        <rect x='0' y='0' rx='8' ry='8' width='200' height='20' />

        {/* Botão Adicionar */}
        <rect x='1080' y='0' rx='8' ry='8' width='120' height='20' />

        {/* Cabeçalho da tabela */}
        <rect x='0' y='60' rx='8' ry='8' width='1200' height='20' />

        {/* Linhas da tabela */}
        <rect x='0' y='120' rx='8' ry='8' width='1200' height='20' />
        <rect x='0' y='190' rx='8' ry='8' width='1200' height='20' />
      </ContentLoader>
    </div>
  )
}
