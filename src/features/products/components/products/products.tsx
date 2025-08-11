import ListProducts from './list-products/list-products'
import SearchProduct from './search-products/search-product'



export default function Products() {
 
    return (
        <div>
          <div className="justify-between items-center">
            <ListProducts />
          </div>
        </div>
    )
}