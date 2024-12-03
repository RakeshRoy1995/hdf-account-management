export const col_value = (value:any) => {
    const status =  
        value === "A" ? (
        "Active"
      ) : value === "D" ? (
        "Delete"
      ) : value === "I" ? (
        "Inactive"
      ) : 
        value
    return status
}