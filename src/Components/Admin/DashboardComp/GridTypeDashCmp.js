import classes from "./GridTypeDashCmp.module.css";
import React from "react";
import { GridRow, GridColumn, Grid } from "semantic-ui-react";

const GridTypeDashCmp = ({ children }) => {
  return (
    <div className={classes.admin_dashboard}>
      <div>{children.heading}</div>
      <Grid columns={3} padded celled>
        <GridRow>
          {React.Children.map(children, (child, index) => (
            <GridColumn key={index}>{child}</GridColumn>
          ))}
        </GridRow>
      </Grid>
    </div>
  );
};

export default GridTypeDashCmp;
