import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, CardActions, Dialog, DialogContent, DialogTitle } from '@mui/material';
import axiosinstance from '../../../axiosconfig';
import Editcategory from './editcategory';

const Categorycard = (props) => {
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    // Fetch category data when the component mounts
    if (props.category) {
      axiosinstance.get(`/Products/category/${props.category.categoryId}`)
        .then((response) => {
          setCategoryData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching category data:', error);
        });
    }
  }, [props.category]);

  const handleOpenAddCategoryDialog = () => {
    setOpenAddCategoryDialog(true);
  };

  const handleCloseAddCategoryDialog = () => {
    setOpenAddCategoryDialog(false);
  };

  const handleCloseShowProductsDialog = () => {
    setShowProducts(false);
  };
  const deleteCategory = async()=>{
    axiosinstance.delete(`/Products/delete_category/`,{"category_id":props.category.id},{
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer '+localStorage.getItem('dentibask-access-token'),
      },
      withCredentials: true,
    }
    
    ).then(() => {})
    .catch((err)=>{console.log(err)});
  }

  const showproducts =()=>{
    axiosinstance.get(`Products/get_category_products/?category_id=${props.category.id}`)
    .then((res)=>{setCategoryProducts(res.data);})
    .catch((err)=>{console.log(err);});
    setShowProducts(!showProducts);
  }

  const deleteproduct = (id) =>{
    axiosinstance
      .delete(`/Products/products/${id}/`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then(() => {
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const handleOpenAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
      <CardMedia
  component="img"
  height="400"
  style={{ width: '100%', objectFit: 'cover' }}
  image={props.category.image}
  alt="Category Thumbnail"
/>

        <CardContent className={theme && "darkcard"}>
          <Typography gutterBottom variant="h5" component="div">
            {props.category.name}
          </Typography>
          <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
            <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
              {props.category.desc}
            </p>
          </span>
        </CardContent>
      </CardActionArea>
      <CardActions className={theme && "darkcard"}>
        <Button size="large" color="success" onClick={handleOpenAddCategoryDialog}>
          Edit
        </Button>
        <Button size="large" color="primary" onClick={() => {showproducts();}}>
          See Products
        </Button>
        <Button size="large" color="error" onClick={()=>{deleteCategory();
        }} >
          Delete
        </Button>
      </CardActions>
      <Dialog open={openAddCategoryDialog} onClose={handleCloseAddCategoryDialog}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <Editcategory category={categoryData} />
        </DialogContent>
      </Dialog>

      <Dialog open={showProducts} onClose={handleCloseShowProductsDialog} fullWidth
  maxWidth="lg">
    <DialogTitle>Products of {props.category.name}</DialogTitle>
    <DialogContent>
  {categoryproducts.length > 0 && (
    <div className='productsgrid' style={{padding:"20px"}}>
      {categoryproducts.map((product, index) => (
        <Card key={index} >
          <CardActionArea>
            <CardMedia
              component="img"
              height="400"
              style={{ width: '100%', objectFit: 'contain' }}
              image={product.image}
              alt={product.name}
            />
            <CardContent className={theme && "darkcard"}>
              <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                {product.desc}
              </p>
              <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                {product.stock}
              </p>
              <Typography gutterBottom variant="h5" component="div">
                {product.price} $
              </Typography>
              <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                per {product.unit}
              </p>
            </CardContent>
            <CardActions  className={theme && "darkcard"}>
      <Button size="large" color="error" onClick={()=>{deleteproduct(product.id)}}>
        Delete
      </Button>
    </CardActions>
          </CardActionArea>
        </Card>
      ))}
    </div>
  )}
  </DialogContent>
</Dialog>

    </Card>
  );
};

export default Categorycard;
