// import { ArrowUpIcon } from "lucide-react";

"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetProductsQuery, Product } from "@/state/api";
import Box from "@mui/material/Box";
import Header from "../(components)/Header/index";

export const page = () => {
  const { data: productsData, isLoading, isError } = useGetProductsQuery();

  const rows: Product[] = productsData ?? [];
  const columns: GridColDef[] = [
    { field: "productId", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Product Name",
      width: 200,
      editable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      editable: false,
      type: "number",
      valueGetter: (value, row) => `$${row.price}`,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      width: 110,
      valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
    },
    {
      field: "stockQuantity",
      headerName: "Stock Quantity",
      width: 160,
      type: "number",
    },
  ];
  if (isError || !rows) {
    return (
      <div className="flex items-center justify-around m-4 p-4 text-2xl font-semibold text-red-500">
        Failed to fetch products...
      </div>
    );
  }
  return (
    <>
      {/* HEADER */}
      {isLoading ? (
        <div className="flex items-center justify-around m-4 p-4 text-2xl font-semibold">
          Loading...
        </div>
      ) : (
        <div>
          <Header title="Inventory" />
          <Box sx={{ height: 750, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.productId}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 12,
                  },
                },
              }}
              checkboxSelection
              disableRowSelectionOnClick
              className="bg-white shadow rounded-lg border border-gray-200 mt-5 text-gray-700"
            />
          </Box>
        </div>
      )}
    </>
  );
};

export default page;
