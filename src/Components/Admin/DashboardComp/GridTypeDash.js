import classes from "./GridTypeDash.module.css"
import React from "react";
import { GridRow, GridColumn, Grid, Image } from 'semantic-ui-react'
import "./GridTypeDash.module.css"

const GridTypeDash = ({children}) => {
    return ( 
        <div className={classes.dashboard}>
            <Grid columns={3} padded celled>
                <GridRow>
                    {React.Children.map(children, (child, index) => (
                        <GridColumn key={index}>
                            {child}
                        </GridColumn>
                    ))}
                </GridRow>
            </Grid>
        </div>
     );
}
 
export default GridTypeDash;