import { useEffect,useState } from "react";
import { ProductListAdm } from "./ProductListAdm";
import { ProductCreateAdmin } from "./ProductCreateAdmin";


export function ProductAreaAdmin(){

    return(
        <>
            <ProductCreateAdmin/>
            <ProductListAdm/>
        </>
        
    )
}