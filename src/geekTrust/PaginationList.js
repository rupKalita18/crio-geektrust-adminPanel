import React, { Component } from "react";
import "./PaginationList.css";
import Table from "./components/Table";
import Pagination from "./components/Pagination";

export default class PaginationList extends Component {
  constructor() {
    super();
    this.state = {
      search: {
        input: "",
      },
      fullList: null,
      pagination: {
        currentPage: 0,
        totalPages: 0,
        perPageRange: 10,
      },
      paginatedData: null,
      checkbox: [],
      edit: {
        id: null,
        inputValueRole: "",
        inputValueName: "",
        inputValueEmail: "",
      },
    };
    this.timeoutId = null;
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setDataForPagination = this.setDataForPagination.bind(this);
    this.navigationButtons = this.navigationButtons.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClickTableButtons = this.handleClickTableButtons.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
    this.handleChangeInputEdit = this.handleChangeInputEdit.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
  }

  handleClickSave(e, identity) {
    e.stopPropagation();
    let index = [...this.state.fullList].findIndex(
      (obj) => obj.id === identity
    );
    if (index === -1) {
      return;
    }
    if (this.state.edit.inputValueEmail.trim().length <= 0) {
      window.alert("Please enter a valid Email");
      return;
    }
    if (this.state.edit.inputValueName.trim().length <= 0) {
      window.alert("Please enter a valid Name");
      return;
    }
    if (this.state.edit.inputValueRole.trim().length <= 0) {
      window.alert("Please enter a valid Role");
      return;
    }
    let newobj = {
      id: identity,
      name: this.state.edit.inputValueName,
      email: this.state.edit.inputValueEmail,
      role: this.state.edit.inputValueRole,
    };
    const newArray = [
      ...this.state.fullList.slice(0, index),
      newobj,
      ...this.state.fullList.slice(index + 1),
    ];
    if(this.state.search.input.trim().length>0){
        this.handleSearch(newArray,this.state.search.input);
    }
    else{
    this.setDataForPagination(newArray);
    }
    this.setState({
      fullList: newArray,
    });
  }

  handleChangeInputEdit(e) {

    //handler function to change the state.
    const changeState=(value,key)=>{
        this.setState((state)=>({
            ...state,edit:{...state.edit,[key]:value}
        }));
    }
    let value = e.target.value;
    let id = e.target.id;
    if (id === "name") {
     changeState(value,"inputValueName");
      return;
    }
    if (id === "role") {
      changeState(value,"inputValueRole");
      return;
    }
    if (id === "email") {
      changeState(value,"inputValueEmail");
      return;
    }
  }

  handleDeleteAll() {
    let list = [...this.state.fullList].filter(
      (item) => !this.state.checkbox.includes(item.id)
    );
    if(this.state.search.input.trim().length>0){
        this.handleSearch(list,this.state.search.input);
    }
    else{
    this.setDataForPagination([...list]);
    }
    this.setState({
      fullList: [...list],
    });
  }

  handleChecked(e, id) {
    if (this.state.checkbox.includes(id)) {
      let list = [...this.state.checkbox];
      let filteredList = list.filter((item) => item !== id);
      this.setState({
        checkbox: filteredList,
      });
      return;
    }
    let list = [...this.state.checkbox];
    list.push(id);
    this.setState({
      checkbox: list,
    });
  }

  handleClickTableButtons(e, identity) {
    let id = e.target.id;
    if (id === "edit") {
      let item = [...this.state.fullList].filter(
        (item) => item.id === identity
      );
      this.setState((state) => ({
        ...state,
        edit: {
          id: identity,
          inputValueRole: item[0].role,
          inputValueName: item[0].name,
          inputValueEmail: item[0].email,
        },
      }));
      return;
    }

    //for delete individually

    if (id === "delete") {
      let list = [...this.state.fullList];
      let filteredList = list.filter((item) => item.id !== identity);
     if(this.state.search.input.trim().length>0){
        this.handleSearch([...filteredList],this.state.search.input);
     }
    else{
    this.setDataForPagination([...filteredList]);
    }
    this.setState((state)=>({
        ...state,
        fullList:[...filteredList]
    }));
      return;
    }
  }

  handleSearch(data, value) {
    const term = value.toLowerCase();
    const list = [...data];
    const filteredList = list.filter((item) => {
      return (
        item.role.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term)
      );
    });
    this.setDataForPagination(filteredList);
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({
      search: {
        input: value,
      },
    });
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.handleSearch(this.state.fullList, value);
    }, 500);
  }

  navigationButtons(e,item) {
    //state handler function
    const changeState=(value)=>{
        this.setState((state, props) => ({
            pagination: {
              ...state.pagination,
              currentPage: value,
            },
          }));
    }

    if (e.target.id === "next") {
      changeState(this.state.pagination.currentPage+1);
      return;
    }
    if (e.target.id === "prev") {
      changeState(this.state.pagination.currentPage-1);
      return;
    }
    if (e.target.id === "first") {
      changeState(1);
      return;
    }
    if (e.target.id === "last") {
      changeState(this.state.pagination.totalPages);
      return;
    }
    if (e.target.id === "ball") {
      changeState(item);
      return;
    }
  }

  setDataForPagination(data) {
    let range = this.state.pagination.perPageRange;
    let result = [];
    for (let i = 0; i < data.length; i += range) {
      result.push(data.slice(i, i + range));
    }
    let totallength = data.length;
    let totalNumberOfPages = Math.ceil(totallength / 10);
    this.setState((state, props) => ({
      paginatedData: result,
      pagination: {
        ...state.pagination,
        totalPages: totalNumberOfPages,
        currentPage: 1,
      },
      edit: {
        id: null,
        inputValueName: "",
        inputValueEmail: "",
        inputValueRole: "",
      },
    }));
  }

  async getData() {
    try{
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await response.json();
      this.setState((state, props) => ({
        fullList: data,
      }));
      this.setDataForPagination(data);
    }
    catch(err){
      console.log("error");
    }
    
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="parent">
        <header className="table-header">
          <input
            value={this.state.search.input}
            onChange={this.handleChange}
            placeholder="Search by name, email or role"
          />
        </header>
        <section className="table-section">
          <Table
            data={this.state.paginatedData}
            pagination={this.state.pagination}
            handleClick={this.handleClickTableButtons}
            handleChecked={this.handleChecked}
            checkboxArray={this.state.checkbox}
            edit={this.state.edit}
            handleChangeInput={this.handleChangeInputEdit}
            handleClickSave={this.handleClickSave}
          />
        </section>
        <section className="bottom-section">
          <div className="delete-button">
            <button
              disabled={this.state.checkbox.length === 0 ? true : false}
              onClick={this.handleDeleteAll}
            >
              Delete All
            </button>
          </div>
          {this.state.pagination.currentPage > 0 && (
            <Pagination
              totalPageCount={this.state.pagination.totalPages}
              range={this.state.pagination.perPageRange}
              siblingCount={2}
              buttonConst={3}
              currentPage={this.state.pagination.currentPage}
              navigationButtons={this.navigationButtons}
            />
          )}
        </section>
      </div>
    );
  }
}
