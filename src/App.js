import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products,setProducts] = useState([]);
  const[pages,setPages] = useState(1);

  const fetchProducts = async () => {
    let res = await fetch(`https://dummyjson.com/products`)
    const data = await res.json();
    console.log(data)
    if(data && data.products){
    setProducts(data.products)
    }
  }
  console.log(products)

  useEffect(() => {
    fetchProducts()

  },[])

  const handleSelectPage = (selectedpage) => {
    if(selectedpage >= 1 && 
      selectedpage <= products.length/10 &&
    selectedpage !== pages
  )
    setPages(selectedpage)

  }
  return (
    <div>
        {
          products.length > 0 && (
            <div className='products'>
              {products.slice(pages*10-10,pages*10).map((prod) => {
                return <span className='products__single' key={prod.id}><img src={prod.thumbnail} alt={prod.title}/>
                <span>{prod.title}</span>
                </span>
              })}
            </div>
          )
        }

        {
          products.length > 0 && (
            <div className='pagination'>
              <span  className={pages > 1 ? "" : "pagination__disable" }
              onClick={()=>handleSelectPage(pages-1)}>◀</span>
             {
               [...Array(products.length/10)].map((_,i) => {
                return <span 
                className={pages === i+1 ? "pagination__selected" :""}
                key={i} 
                onClick={()=>handleSelectPage(i+1)}>{i+1}
                </span>

               } )
             }
              <span 
               className={pages < products.length / 10 ? "" : "pagination__disable" }
              onClick={()=>handleSelectPage(pages+1)}>▶</span>
              
            </div>
          )
        }
    </div>
  );
}

export default App;
