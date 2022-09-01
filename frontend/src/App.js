
import {Navbar } from "./components/Navbar"
import {Products} from "./components/Products"
import {Home} from "./pages/Home"
import{Login} from "./pages/Login"
import {Register} from "./pages/Register"
import {Product} from "./pages/Product"
import {Cart} from "./pages/Cart"
import {Routes,Route,Navigate} from "react-router-dom"
import { Profile } from "./pages/Profile"
import {Shipping} from"./pages/Shipping"
import {UserListScreen} from "./pages/UserListScreen"
import {AdminProduct} from "./pages/AdminProduct"
import { EditScreen } from "./pages/EditScreen"
function App() {
  return (
    <div>

<Routes>

      <Route path = "/" element = {<Home></Home>}>
      </Route>
      <Route path = "/login" element = {<Login></Login>}>
      </Route>
      <Route path = "/register" element = {<Register></Register>}>
      </Route>
      <Route path = "/product/:id" element = {<Product></Product>}>
      </Route>
      <Route path = "/cart" element = {<Cart></Cart>}>
        <Route path = "/cart/:id" element = {<Cart></Cart>} />
      </Route>
      <Route path = "/profile" element = {<Profile></Profile>}></Route>
      <Route path = "/shipping" element = {<Shipping></Shipping>}></Route>
      <Route path = "/admin/userlist" element = {<UserListScreen></UserListScreen>}></Route>

      <Route path = "/admin/productlist" element = {<AdminProduct></AdminProduct>}></Route>
      <Route path = "/admin/product/:id/edit" element = {<EditScreen></EditScreen>}></Route>


</Routes>


    </div>
  );
}

export default App;
