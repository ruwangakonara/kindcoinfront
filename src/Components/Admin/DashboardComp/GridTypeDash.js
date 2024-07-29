import classes from "./GridTypeDash.module.css"
import React from "react";
import { GridRow, GridColumn, Grid, Image } from 'semantic-ui-react'

const GridTypeDash = ({children}) => {
    return ( 
        <div className={classes.dashboard}>
            <Grid columns={3}>
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