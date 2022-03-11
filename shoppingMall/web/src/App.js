import CartPage from './pages/cartPage.js'
import ProductDetailPage from './pages/productDetailPage.js'
import ProductListPage from './pages/productListPage.js'
import {initRoute} from './route.js'

export default function App({$app}) {
    const route = () => {
        const {pathname} = location
        $app.innerHTML = ''
        console.log(pathname)
        if (pathname === '/web/') new ProductListPage({$app}).render()
        else if (new RegExp('/web/products/[0-9]+').test(pathname)) new ProductDetailPage({$app, id: pathname.match(/\d+/)}).render()
        else if (pathname === '/web/cart') new CartPage({$app}).render()
    }

    initRoute(route)
    route()
    window.onpopstate = () => route()
}
