import { CreateClient } from "./CreateClient";
import { TableClients } from "./TableClients";

export function ClientArea(){
    return(
        <>
            <CreateClient/>
            <TableClients/>
        </>
        
    )
}