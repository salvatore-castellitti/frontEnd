import {CustomTableComponent} from "../../custom-component/custom-table/custom-table.component";

let pagination = {
  itemPerPage: 4,
  itemPerPageOptions: [4,8,12]
}

let order = {
  defaultColumn: "type",
  orderType:"asc"
}

let search = {
  columns: ["type", "houseProducer", "model"]
}

let bookButton = {
  customCssClass: 'btn btn-info btn-sm',
  text: 'Book',
  icon: 'lock',
}


let actions = [bookButton]

export var tableConfig_Vehicle_Customer = {
  headers: [
    {key: "type", label: "Type",},
    {key: "houseProducer", label: "House Producer",},
    {key: "model", label: "Model",},
    {key: "licensePlate", label: "License Plate",},
  ],
  order: order,
  search: search,
  pagination: pagination,
  actions: actions
}
