import CategoryCard from '@/components/home/CategoryCard'
import categoriesData from '@/data/categoriesData'

const CategoriesGrid = () => {
  return (
    <div id="categories" className="pb-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100">
        Categories
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categoriesData.map((category) => (
          <CategoryCard key={category.title} category={category} />
        ))}
      </div>
    </div>
  )
}

export default CategoriesGrid
