import pool from "../config/db.js";

export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  const result = await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1,$2) RETURNING *",
    [name, description]
  );

  res.status(201).json(result.rows[0]);
};

export const getCategories = async (req, res) => {
  const result = await pool.query("SELECT * FROM categories");
  res.json(result.rows);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM categories WHERE id=$1", [id]);
  res.json({ message: "Category deleted" });
};