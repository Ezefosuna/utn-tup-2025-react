import { useState } from "react";
import { Button } from "@mui/material";

function MiBoton(props) {
    const [count, setCount] = useState(props.count || 0);
    
    function onClick() {
        setCount(count + 1);
    }
    
    return (
        <Button 
            variant="contained" 
            color="primary" 
            onClick={onClick}
            sx={{ m: 1 }}
        >
            Soy el botón {count}
        </Button>
    );
}

export default MiBoton;