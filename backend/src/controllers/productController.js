import { safeQuery as query } from "../config/db.js";


/**
 * CREATE PRODUCT (Admin)
 */

export const createProduct = async (req, res) => {
  try {

    const {
      name,
      description,
      price,
      image_url,
      category_id,
      is_featured
    } = req.body;


    /* validation */

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Product name required"
      });
    }


    /* default quantity */

    let quantity = 10;


    /* paintings have single quantity */

    if (Number(category_id) === 2) {
      quantity = 1;
    }


    const result = await query(

      `INSERT INTO products
      (
        name,
        description,
        price,
        image_url,
        category_id,
        is_featured,
        quantity,
        created_at
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,NOW())
      RETURNING *`,

      [
        name,
        description || "",
        Number(price) || 0,
        image_url || "",
        Number(category_id) || null,
        is_featured ?? false,
        quantity
      ]

    );


    res.status(201).json({

      success: true,
      message: "Product created",
      product: result.rows[0]

    });

  }

  catch (error) {

    console.error("Create Product Error:", error);

    res.status(500).json({

      success: false,
      message: "Server error"

    });

  }

};




/**
 * GET ALL PRODUCTS
 * pagination + filtering
 */

export const getProducts = async (req, res) => {

  try {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 12;


    const {
      category,
      minPrice,
      maxPrice,
      sort = "created_at"
    } = req.query;


    const offset = (page - 1) * limit;


    let queryString =
      "SELECT * FROM products WHERE 1=1";


    let countQuery =
      "SELECT COUNT(*) FROM products WHERE 1=1";


    let values = [];

    let countValues = [];

    let index = 1;



    /* category filter */

    if (category) {

      queryString += ` AND category_id=$${index}`;

      countQuery += ` AND category_id=$${index}`;

      values.push(Number(category));

      countValues.push(Number(category));

      index++;

    }



    /* price filters */

    if (minPrice) {

      queryString += ` AND price >= $${index}`;

      countQuery += ` AND price >= $${index}`;

      values.push(Number(minPrice));

      countValues.push(Number(minPrice));

      index++;

    }



    if (maxPrice) {

      queryString += ` AND price <= $${index}`;

      countQuery += ` AND price <= $${index}`;

      values.push(Number(maxPrice));

      countValues.push(Number(maxPrice));

      index++;

    }



    /* safe sorting */

    const allowedSort =
      ["id", "price", "name", "created_at"];


    const sortField =
      allowedSort.includes(sort)
        ? sort
        : "created_at";


    queryString +=
      ` ORDER BY ${sortField} DESC`;



    /* pagination */

    queryString +=
      ` LIMIT $${index} OFFSET $${index + 1}`;


    values.push(limit, offset);



    const result =
      await query(queryString, values);


    const countResult =
      await query(countQuery, countValues);



    const totalProducts =
      Number(countResult.rows[0].count);


    const totalPages =
      Math.ceil(totalProducts / limit);



    res.status(200).json({

      success: true,

      products: result.rows,

      totalProducts,

      totalPages,

      page,

      limit

    });

  }

  catch (error) {

    console.error("Get Products Error:", error);

    res.status(500).json({

      success: false,
      message: "Server error"

    });

  }

};




/**
 * GET FEATURED PRODUCTS
 */

export const getFeaturedProducts = async (req, res) => {

  try {

    const result =
      await query(

        `SELECT *
        FROM products
        WHERE is_featured = true
        ORDER BY created_at DESC`

      );


    res.status(200).json({

      success: true,

      products: result.rows

    });

  }

  catch (error) {

    console.error("Featured Product Error:", error);

    res.status(500).json({

      success: false,
      message: "Server error"

    });

  }

};




/**
 * GET SINGLE PRODUCT
 */

export const getSingleProduct = async (req, res) => {

  try {

    const { id } = req.params;


    if (!id) {

      return res.status(400).json({

        success: false,
        message: "Product id required"

      });

    }



    const result =
      await query(

        `SELECT *
        FROM products
        WHERE id = $1`,

        [Number(id)]

      );



    if (result.rows.length === 0) {

      return res.status(404).json({

        success: false,
        message: "Product not found"

      });

    }



    res.status(200).json({

      success: true,

      product: result.rows[0]

    });

  }

  catch (error) {

    console.error("Get Single Product Error:", error);

    res.status(500).json({

      success: false,
      message: "Server error"

    });

  }

};




/**
 * UPDATE PRODUCT
 */

export const updateProduct = async (req, res) => {

  try {

    const { id } = req.params;


    const {
      name,
      description,
      price,
      image_url,
      category_id,
      is_featured,
      quantity
    } = req.body;



    let finalQty =
      Number(quantity) || 0;



    /* paintings limited to 1 */

    if (Number(category_id) === 2) {

      finalQty =
        finalQty > 1
          ? 1
          : finalQty;

    }



    const result =
      await query(

        `UPDATE products
        SET
          name=$1,
          description=$2,
          price=$3,
          image_url=$4,
          category_id=$5,
          is_featured=$6,
          quantity=$7
        WHERE id=$8
        RETURNING *`,

        [
          name,
          description,
          Number(price),
          image_url,
          Number(category_id),
          is_featured ?? false,
          finalQty,
          Number(id)
        ]

      );



    res.status(200).json({

      success: true,

      product: result.rows[0]

    });

  }

  catch (error) {

    console.error("Update Product Error:", error);

    res.status(500).json({

      success: false,
      message: "Server error"

    });

  }

};




/**
 * DELETE PRODUCT
 */

export const deleteProduct = async (req, res) => {

  try {

    const { id } = req.params;



    await query(

      `DELETE FROM products
      WHERE id=$1`,

      [Number(id)]

    );



    res.status(200).json({

      success: true,
      message: "Product deleted"

    });

  }

  catch (error) {

    console.error("Delete Product Error:", error);

    res.status(500).json({

      success: false,
      message: "Server error"

    });

  }

};